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
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
//Request query
    const reqParams = req.query

//Validation of input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

//Reading medical record by given id
    const medicalEntries = medicalEntriesDao.get(reqParams.id);
    if (!medicalEntries) {
      res.status(404).json({
        code: "medicalEntriesNotFound",
        message: `Medical entries of id: ${reqParams.id} not found`,
      });
      return;
    }

//Get related passport
    const passport = passportDao.get(medicalEntries.passportId);
    medicalEntries.passport = passport;

//Returning properly filled out output
    res.json(medicalEntries);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = GetAbl;
