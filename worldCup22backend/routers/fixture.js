var express = require("express");
const router = express.Router()
const db = require("../models/db")

router.get("/fixture/", (req,res)=>{
    const q= `SELECT fr.* FROM fixturesresults fr WHERE fr.status ='fixture'`
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})


module.exports =  router