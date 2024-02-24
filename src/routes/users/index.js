// this is api rout for users authentication
const usersFind = require('../../api/users/usersFind');
const usersFindAll = require('../../api/users/usersFindAll');
const usersFindById = require('../../api/users/usersFindById');
const userInsert = require('../../api/users/usersInsert');
const usersMakeOwner = require('../../api/users/usersMakeOwner');
const router = require('express').Router();

router.post("/users", userInsert)
router.get("/users", usersFindAll)
router.get("/users/:email", usersFind)
router.get("/users/find/:id", usersFindById)
router.patch("/roleChange", usersMakeOwner)

module.exports = router;