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
    date: { type: "string", format:"date" },
    passportId:{type: "string", minLength:15, maxLength:15}
  },
  required: [],
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
//Request query
    const filter = req.query;

//Validate input
    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const medicalEntriesList = medicalEntriesDao.list(filter);

//Returning properly filled out output
    res.json({ itemList: medicalEntriesList});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = ListAbl;
