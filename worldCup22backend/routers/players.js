var express = require("express");
const router = express.Router()
const db = require("../models/db")
router.get("/players", (req,res)=>{
    const q= "SELECT * FROM players"
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})
router.get("/playerbyteam/", (req,res)=>{
    const q= "SELECT t.abbrev ,p.name AS plyName , p.squadNumber AS plySqNum, t.name FROM teams t INNER JOIN players p ON t.ID= p.teamID"// t LEFTJOIN players p ON t.ID = p.teamID WHERE p.teamID = ? "
    let tid =req.params.id
    db.query(q,tid,(err,data)=>{
        if(err) return res.send(err);
        return res.status(200).json(data)
    })
})
router.get("/playerbycountry/:id", (req,res)=>{
    let tid =req.params.id
    let q;
    if(tid == 0){
        q= `SELECT t.abbrev , t.ID ,p.name AS plyName , p.squadNumber AS plySqNum, t.name FROM teams t INNER JOIN players p ON t.ID= p.teamID `
        db.query(q,(err,data)=>{
            if(err) return res.send(err);
            return res.status(200).json(data)
        });
    }else if(tid > 0){
        q= `SELECT t.abbrev , t.ID ,p.name AS plyName , p.squadNumber AS plySqNum, t.name FROM teams t INNER JOIN players p ON t.ID= p.teamID WHERE p.teamID=${tid}`// t LEFTJOIN players p ON t.ID = p.teamID WHERE p.teamID = ? "
        db.query(q,tid,(err,data)=>{
            if(err) return res.send(err);
            return res.status(200).json(data)
        });
    }

})
module.exports =  router