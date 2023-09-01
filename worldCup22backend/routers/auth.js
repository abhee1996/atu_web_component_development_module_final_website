var express = require("express");
const router = express.Router();
const db = require("../models/db");

router.post("/login/", (req, res) => {
  const {email,password} = req.body;
  if (email && password) {
    const q = `SELECT * FROM users WHERE email=? AND password=?`;
    db.query(q, [email, password], (err, result) => {
      if (result.length > 0) {
        return res.status(200).json(result);

       
      } else {
        return res.send(err);
      }
    });
  }
});
// async function login(req, res) {
//     const reqbody = req.body;
//     let secret = process.env.secret || "my-app-secrets";
//     console.log("secret :", secret);
//     try {
//       const user = await Users.findOne({
//         where: { email: reqbody?.email },
//       });
//       console.log(" login findOne user", user);
//       if (!user) {
//         res.json({ error: "User does not exist" });
//       } else {
//         bcrypt.compare(reqbody?.password, user?.password).then(async (match) => {
//           console.log("bcrypt match", match);
//           if (!match) {
//             res.status(500).json({
//               success: false,
//               isLoggedIn: match,
//               error: "Wrong username and password ",
//             });
//           } else {
//             const token = jwt.sign(
//               { userId: user.id, isUser: true, user_uid: user.user_uid },
//               //secret,
//               {
//                 expiresIn: "1d",
//               }
//             );
//             res.status(200).json({
//               success: true,
//               isloggedIn: match,
//               message: "Authentication successfull",
//               token: token,
//             });
//           }
//         });
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   }
module.exports = router;
