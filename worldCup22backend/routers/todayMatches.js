var express = require("express");
const router = express.Router()
const db = require("../models/db")

router.get("/today-matches/", (req,res)=>{
     const q= `SELECT * FROM fixturesresults fr WHERE DATE(fr.date) = curdate()`
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})
router.get("/matches/:id", (req,res)=>{
    let id = req.params.id
    const q= `SELECT * FROM fixturesresults fr WHERE matchNumber =${id}`
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})

module.exports =  router