//dependencies
const fs = require("fs");
const path = require("path");

//Declaring a place inside the database 
const passportFolderPath = path.join(__dirname, "storage", "passportList");

// Method to read a passport by microChip number
function get(passportId) {
  try {
//Creating the path and reading the file on the end of it 
    const filePath = path.join(passportFolderPath, `${passportId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadPassport", passport: error.passport };
  }
}

// Method to create a passport file
function create(passport) {
  try {
// putting the microChip number as an id, is probably useless 
// but i didnt wnated to rewrite all the stuff, bcs i  just realised while doing comments, thank you for understanding, have a nice day
    passport.id = passport.microChip;
    
    if (get(passport.id)) {
      throw {
        code: "passportAlreadyExists",
        message: `Passport with microchip number: ${passport.microChip} already exists`,
      }};
//creating the path
    const filePath = path.join(passportFolderPath, `${passport.id}.json`);
    const fileData = JSON.stringify(passport);
//saving the path and files we provided 
    fs.writeFileSync(filePath, fileData, "utf8");
    return passport;
  } catch (error) {
    throw { code: "failedToCreatePassport", passport: error.passport };
  }
}


// Method to remove a passport file
function remove(passportId) {
  try {
//creating path and ulinking it(deleting)
    const filePath = path.join(passportFolderPath, `${passportId}.json`);
    fs.unlinkSync(filePath);
  } 
  catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemovePassport", passport: error.passport };
  }
}

// Method to list all the passports in a folder
function list() {
  try {
    const files = fs.readdirSync(passportFolderPath);
    const passportList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(passportFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return passportList;
  } catch (error) {
    throw { code: "failedToListPassports", passport: error.passport };
  }
}

//exported modules
module.exports = {
  get,
  create,
  remove,
  list,
};
