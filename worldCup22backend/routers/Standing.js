var express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/standing/", (req, res) => {
  const q = "SELECT t.* FROM teams t ORDER BY t.group";
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
router.get("/standingbyid/:id", (req, res) => {
  const id = req.params.id;
  const q1 = `SELECT * FROM fixturesresults fr WHERE fr.hTeamID=${id} OR fr.aTeamID=${id}`;
  db.query(q1, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

module.exports = router;
