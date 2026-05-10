//Data Accsess Objects 
const passportDao = require("../../dao/passport-dao.js");

async function ListAbl(req, res) {
  try {

//getting data from database
    const passportList = passportDao.list();

//creating menu with just names, microChip and species
    const menu = passportList.map(passport => {
      return { 
        name: passport.name,
        microChip:passport.microChip,
        species:passport.species 
      };
    });
    
//Returning properly filled out output 
    res.json({itemList:menu});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = ListAbl;
