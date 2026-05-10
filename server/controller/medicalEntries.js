const express = require("express");
//grouping related routes together before getting to the main server
const router = express.Router();

//dependencies
const GetAbl = require("../abl/medicalEntries/getAbl");
const ListAbl = require("../abl/medicalEntries/listAbl");
const CreateAbl = require("../abl/medicalEntries/createAbl");
const DeleteAbl = require("../abl/medicalEntries/deleteAbl");

//Conencting teh URL endpoints to the functions
router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
