const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// "/" route means the route that is described in the app.use()
// just showing how to chain HTTP methods for now
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
