//Dependencies and setup 
const Ajv = require("ajv");
const ajv = new Ajv();

//Data Accsess Objects 
const passportDao = require("../../dao/passport-dao.js");
const medicalEntriesDao = require("../../dao/medicalEntries-dao.js");

//Scheme of how the input data should look like
const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength:15, maxLength:15 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

//Schema validation. Comapring the input from user to the schema we created
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

//Removing all data connected to the specific passport
    medicalEntriesDao.removeByPassportId(reqParams.id)
    passportDao.remove(reqParams.id);

//Returning properly filled out output
    res.json({});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = DeleteAbl;
