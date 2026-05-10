//Dependencies and setup 
const Ajv = require("ajv");
const ajv = new Ajv();

//Data Accsess Objects
const medicalEntriesDao = require("../../dao/medicalEntries-dao.js");

//Scheme of how the input data should look like
const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
//Rrequest query.
    const reqParams = req.body;

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

//Remove medical entries from persistant storage
    medicalEntriesDao.remove(reqParams.id);

//Returning properly filled out output
    res.json({});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = DeleteAbl;
