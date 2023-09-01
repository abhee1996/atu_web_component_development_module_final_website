var express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/admin/fixture/", (req, res) => {
  const q = `SELECT fr.* FROM fixturesresults fr`;
  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
router.get("/admin/fixture/:id", (req, res) => {
  const { id } = req.params;
  const q = `SELECT fr.* FROM fixturesresults fr WHERE matchNumber=?`;
  db.query(q, id, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
router.get("/admin/playerbycountry/:id", (req, res) => {
  let tid = req.params.id;
  let q;
  if (tid > 0) {

    q = `SELECT t.abbrev , t.ID ,p.name AS plyName , p.squadNumber AS plySqNum, t.name FROM teams t INNER JOIN players p ON t.ID= p.teamID WHERE p.teamID=${tid}`; // t LEFTJOIN players p ON t.ID = p.teamID WHERE p.teamID = ? "
    db.query(q, tid, (err, data) => {
      if (err) return res.send(err);
      return res.status(200).json(data);
    });
  }
});
//Admin
router.put("/admin/fixture/update/scores/:id", (req, res) => {
  const { id } = req.params;
  const {  hTeamScore, aTeamScore, status } =req.body;
  const q = `UPDATE fixturesresults fr SET fr.hTeamScore=?, fr.aTeamScore=?, fr.status=? WHERE fr.matchNumber=? `;
  const ts = [ hTeamScore, aTeamScore,status, id];
   db.query(q, ts, (err, data) => {
     if (err) {
       return res.send(err);
     }
     return res.json(data);
   });
}); 
router.put("/admin/fixture/update/:id", (req, res) => {
  const { id } = req.params;
  const { stadium, hTeamID, hTeam, hTeamScore, aTeamID, aTeam, aTeamScore } =req.body;
  // const q = `UPDATE fixturesresults fr SET fr.round=?, fr.datetime=?, fr.stadium=?, fr.hTeamID=?, fr.hTeam=? , fr.hTeamScore=?, fr.aTeamID=?, fr.aTeam=?,fr.aTeamScore=?,fr.group=?, fr.status=?, fr.date=?,fr.time=? WHERE fr.matchNumber=? `;
  const q = `UPDATE fixturesresults fr SET  fr.stadium=?, fr.hTeamID=?, fr.hTeam=? , fr.hTeamScore=?, fr.aTeamID=?, fr.aTeam=?,fr.aTeamScore=? WHERE fr.matchNumber=? `;
  const ts = [stadium, hTeamID, hTeam, hTeamScore, aTeamID, aTeam, aTeamScore, id];
   db.query(q, ts, (err, data) => {
     if (err) {
       return res.send(err);
     }
     return res.json(data);
   });
});
router.post("/admin/fixture/post", (req, res) => {
  const { aTeamScore, hTeamScore } = req.body;
  const ts = [aTeamScore, hTeamScore];
  const q = `INSERT INTO fixturesresults (aTeamScore, hTeamScore) VALUES (?, ?); `;
  db.query(q, ts, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
router.post("/admin/scorer/post", (req, res) => {
  const { matchNumber, teamID, playerID, playerName } = req.body;
  const ts = [matchNumber, teamID, playerID, playerName];
   const q = `INSERT INTO scorers  (matchNumber, teamID,playerID,playerName) VALUES (?, ?,?,?); `;
   db.query(q, ts, (err, data) => {
    console.log('scorers data', data)
     if (err) return res.send(err);
     return res.json(data);
   });
});

module.exports = router;
