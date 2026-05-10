//dependencies
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

//Declaring a place inside he database 
const medicalEntriesFolderPath = path.join(__dirname,"storage","medicalEntriesList");

// Method to read a medical record from a file
function get(medicalEntriesId) {
  try {
//creates the path 
    const filePath = path.join(medicalEntriesFolderPath, `${medicalEntriesId}.json`);
//reads the raw file
    const fileData = fs.readFileSync(filePath, "utf8");
//converting back to JS object and sending it
    return JSON.parse(fileData);
  } catch (error) {
//if it doesnt exist it shows nothing instead of crashing
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadMedicalEntries", message: error.message };
  }
}

// Method to create a medical entries and save them as a file
function create(medicalEntries) {
  try {
// generates random 32-character ID
    medicalEntries.id = crypto.randomBytes(16).toString("hex");
//creates the path
    const filePath = path.join(medicalEntriesFolderPath, `${medicalEntries.id}.json`);
//changes the JS object into text string to be saved and saves it
    const fileData = JSON.stringify(medicalEntries);
    fs.writeFileSync(filePath, fileData, "utf8");
    return medicalEntries;
  } catch (error) {
    throw { code: "failedToCreateMedicalEntries", message: error.message };
  }
}

// Method to remove the medical record from a file
function remove(medicalEntriesId) {
  try {
//Creating the path and unlinking it 
    const filePath = path.join(medicalEntriesFolderPath, `${medicalEntriesId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveMedicalEntries", message: error.message };
  }
}

// Method to list medical record in a folder
function list(filter = {}) {
  try {
//Creating the path
    const files = fs.readdirSync(medicalEntriesFolderPath);
//Converts all if the files into an array of objetcts
    let medicalEntriesList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(medicalEntriesFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
//Filter the files by the ID of a pet
    if (filter.passportId) {
      medicalEntriesList = medicalEntriesList.filter(item => item.passportId === filter.passportId);
    }
//Filter by a date of expiration
    if (filter.date) {
      const userDate = new Date(filter.date);
      medicalEntriesList = medicalEntriesList.filter(item => {
        if (!item.dateEnd) return false;
        const expirationDate = new Date(item.dateEnd);
        return expirationDate >= userDate;
      });
    }
//it sorts it selfes by the date 
    medicalEntriesList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return medicalEntriesList;
  } catch (error) {
    throw { code: "failedToListMedicalEntries", message: error.message };
  }
}

// Method to list medical entries by passport id, it is used to create the main menu 
function listByPassportId(passportId) {
  const medicalEntriesList = list();
  return medicalEntriesList.filter((item) => item.passportId === passportId);
}

//Method to remove all medical records connected to speific passport
function removeByPassportId(passportId) {
  try {
//Loads all the medical records
     const allEntries = list();
//filters them by passport ID
     const entriesToDelete = allEntries.filter(item => item.passportId === passportId);
//goes loops through all the filtered files
      entriesToDelete.forEach(entry =>{
      const filePath = path.join(medicalEntriesFolderPath, `${entry.id}.json`);
      if (fs.unlinkSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    })
    return { deletedCount: entriesToDelete.length };
  } catch (error) {
    throw { code: "failedToRemoveByPassportId", message: error.message };
  }
  };
//exported modules
module.exports = {
  get,
  create,
  remove,
  list,
  listByPassportId,
  removeByPassportId
};
