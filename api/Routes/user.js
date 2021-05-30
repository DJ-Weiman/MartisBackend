const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbService = require("../controller/userDbService");
const { route } = require("../../app");
const db = dbService.getDbServiceInstance();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/getUsers", (req, res) => {
  const result = db.getAllData();

  result
    .then((data) => {
      console.log(data);

      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.get("/getEmps", (req, res) => {
  const result = db.getEmps();

  result
    .then((data) => {
      console.log(data);

      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/signup", (req, res) => {
  const checkUser = db.checkExistingUser(req.body.email);

  checkUser
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const userID = req.body.userID;
            const name = req.body.name;
            const email = req.body.email;
            const password = hash;
            const designation = req.body.designation;
            const roleID = req.body.roleID;
            const result = db.createNewUser(
              userID,
              name,
              email,
              password,
              designation,
              roleID
            );

            result
              .then((reply) => res.json(reply))
              .catch((err) => res.json(err));
          }
        });
      } else {
        console.log("This user already exists");
        res.status(409).json({
          message: "This user already exits",
        });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const checkUser = db.checkExistingUser(req.body.email);

  checkUser
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed, User doesn't exist",
        });
      } else {
        userPassword = user.Password;
        console.log(userPassword);
        console.log(req.body.password);
        bcrypt.compare(req.body.password, userPassword, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed, there was an error verifying the password",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.Email,
                userId: user.userID,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Auth Successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth failed, Password is incorrect",
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

router.delete("/:userId", (req, res) => {
  const result = db.deleteUser(req.params.userId);

  console.log(req.params.userId);

  result
    .then((data) => {
      console.log(data);

      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.post("/getUserNameAndRole", (req, res) => {
  const result = db.getUserNameAndRole(req.body.EmpId);

  result
    .then((data) => {
      console.log(data);

      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.get("/getInspectors", (req, res) => {
  const result = db.getInspectors();

  result
    .then((data) => {
      console.log(data);

      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

router.get("/getManagers", (req, res) => {
  const result = db.getManagers();

  result
    .then((data) => {
      console.log(data);

      res.json({ data: data });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
