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
    id: { type: "string", minLength:15,maxLength:15 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
//Request query
    const reqParams = req.query;

// Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

//Reading Passport by given id
    const passport = passportDao.get(reqParams.id);
    if (!passport) {
      res.status(404).json({
        code: "passportNotFound",
        category: `Passport with id ${reqParams.id} not found`,
      });
      return;
    }

//showing all medical entries connected to specific passport 
    const medicalEntries = medicalEntriesDao.listByPassportId(reqParams.id);
//Object to connect the passport and the medical medical entries
    const result = {
      ...passport,
      medicalEntries:medicalEntries || []
    }

//Returning properly filled out output    
  res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = GetAbl;
