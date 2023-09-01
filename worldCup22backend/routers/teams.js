var express = require("express");
const router = express.Router()
const db = require("../models/db")

router.get("/teams", (req,res)=>{
    const q= "SELECT * FROM teams"
    db.query(q,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})
router.get("/teams/:id", (req,res)=>{
    const {id} =req.params;
    const q= "SELECT * FROM teams WHERE ID=?"
    db.query(q,id,(err,data)=>{
        if(err) return res.send(err);
        return res.json(data)
    })
})

module.exports =  router