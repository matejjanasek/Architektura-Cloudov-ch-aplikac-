const express = require("express");
//grouping related routes together before getting to the main server
const router = express.Router();

//dependencies
const GetAbl = require("../abl/passport/getAbl");
const ListAbl = require("../abl/passport/listAbl");
const CreateAbl = require("../abl/passport/createAbl");
const DeleteAbl = require("../abl/passport/deleteAbl");

//Conencting the URL endpoints to the functions
router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
