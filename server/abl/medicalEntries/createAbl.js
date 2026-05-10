//Dependencies and setup 
const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

//Data Accsess Objects 
const medicalEntriesDao = require("../../dao/medicalEntries-dao.js");
const passportDao = require("../../dao/passport-dao.js");

//Scheme of how the input data should look like
const schema = {
  type: "object",
  properties: {

    procedure: { 
      type: "string", 
      enum: ["Vaccine", "Examination", "Treatment"] 
    },
    name: { enum: ["Rabies", "Parvo Virus"] },
    date: { type: "string", format: "date" },
    dateEnd: { type: "string", format: "date" },
    desc: { type: "string", maxLength: 250 },
    passportId: { type: "string" },
  },
   additionalProperties: false,
   required: ["passportId", "procedure", "desc", "date"],

//Condition depending on the type of procedure
  if: { properties: { procedure: { const: "Vaccine" } } },
    then: { required: ["name","dateEnd"],
       },
};

//
async function CreateAbl(req, res) {
  try {
    let medicalEntries = req.body;

//Schema validation. Comapring the input from user to the schema we created
    const valid = ajv.validate(schema, medicalEntries);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input is not valid",
        validationError: ajv.errors,
      });
      return;
    }

//We have to check if the date is correct depending on Bussines Logic 
//and error mesage bsaed on wrong input 
    if (new Date(medicalEntries.date) >= new Date()) {
      res.status(400).json({
        code: "invalidDate",
        message: `Date must be current day or a day in the past.`,
      });
      return;
    }
    if (new Date(medicalEntries.dateEnd) < new Date()) {
    res.status(400).json({
      code: "invalidDateEnd",
      message: `Date must be a day in the future`,
    });
    return;
  };

//Check if passportId exists
    const passport = passportDao.get(medicalEntries.passportId);

//if it doesn't exist it sends error
    if (!passport) {
      res.status(400).json({
        code: "passportDoesNotExist",
        message: `Passport with id ${medicalEntries.passportId} does not exist`,
      });
      return;
    }

//Store medical entrie to persistent storage
    medicalEntries = medicalEntriesDao.create(medicalEntries);
    medicalEntries.passport = passport;

//Returning properly filled out output
    res.json(medicalEntries);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
module.exports = CreateAbl;
