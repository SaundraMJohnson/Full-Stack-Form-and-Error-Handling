var express = require("express");
var Form = require("../../models/Form");
var authToken = require("../../modules/verifyToken");
var router = express.Router();

// Fill form by user: POST /api/form
router.post("/", (req, res, next) => {
  var { firstName, lastName, email, occupation, city, bio } = req.body;
  if (!firstName || !lastName || !email || !occupation || !city || !bio)
    return res.json({ msg: "Please fill in all fields" });
  Form.create(req.body, (err, newdata) => {
    if (err) return res.json({ err });
    return res.json({
      success: true,
      newdata,
      msg: "Thanks for getting in touch, We'll get back soon"
    });
  });
});

router.use(authToken.verifyToken);

// get form data filled by the user: GET /api/form
router.get("/", (req, res, next) => {
  Form.find({}, (err, formdata) => {
    if (err) return res.json({ err });
    return res.json({ success: true, formdata });
  });
});

module.exports = router;