const express = require("express");
const Rule = require("../Models/rules");
const User = require("../Models/users.model");
const router = express.Router();
const { isAdmin, isUser } = require('../middleware/authorize');

const {
    getRules,
    getRule,
    createRule,
    updateRule,
    deleteRule,
  } = require("../controllers/rule.controller");


router.get("/getRules",isAdmin,getRules);
router.get("/getRule/:ruleId",isAdmin,getRule);
router.post("/createRule",isAdmin,createRule);
router.put("/updateRule/:ruleId",isAdmin,updateRule);
router.delete("/deleteRule/:ruleId",isAdmin,deleteRule);



module.exports = router;