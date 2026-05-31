//Dependencies and setup 
const Ajv = require("ajv");
const ajv = new Ajv();

//Data Accsess Objects 
const passportDao = require("../../dao/passport-dao.js");

//Scheme of how the input data should look like
const schema = {
  type: "object",
  properties: {
    microChip: { type: "string", minLength:15, maxLength:15 },
    name: { type: "string" },

//for future dropDown  selection
    species: { 
      type: "string", 
      enum: ["Canine", "Feline", "Small Mammmals"] 
    },
    breed:{type:"string"},
//for future RadioButtons selection
    gender: { 
      type: "string",
      enum:["Male","Female"] 
    },
    nameOwner: { type: "string" },
    desc: {type:"string"},
  
  },

// logic of how the choice in first dropDown afects the selection in the next one 
allOf: [
    {
      if: { properties: { species: { const: "Canine" } } },
      then: { properties: { breed: { enum: ["Golden Retriever", "Labrador", "Border Collie"] } } }
    },
    {
      if: { properties: { species: { const: "Feline" } } },
      then: { properties: { breed: { enum: ["Persian", "Maine Coon", "European Shorthair"] } } }
    },
    {
      if: { properties: { species: { const: "Small Mammals" } } },
      then: { properties: { breed: { enum: ["Hamster", "Rabbit", "Mice"] } } }
    }
  ],
  
  required: ["name","microChip","species","breed","gender","nameOwner"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let passport = req.body;

//Schema validation. Comapring the input from user to the schema we created
    const valid = ajv.validate(schema, passport);
    if (!valid) {
      res.status(400).json({
        code: "inputIsNotValid",
        message: "Input is not valid",
        validationError: ajv.errors,
      });
      return;
    }

//Storing created passport to a persistant storage
    try {
      passport = passportDao.create(passport);
    } catch (e) {
      res.status(400).json({
        error: e.message,
        code: e.code
      });
      return;
    }

//Returning properly filled out output
    res.json(passport);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = CreateAbl;
