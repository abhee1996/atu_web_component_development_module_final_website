var express = require("express");
const router = express.Router()
const db = require("../models/db")

router.get("/win-results/", (req,res)=>{
    const q= "SELECT * FROM fixturesresults WHERE status='result'"
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})
router.get("/win-results/detail/:id", (req,res)=>{
    const {id} = req.params
    const q= `SELECT * FROM fixturesresults WHERE matchNumber=${id}`
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})

module.exports =  router