const express=require("express");
const { v4: uuidv4 } = require('uuid'); 
const Manager = require('../models/Managermodel');
const { uuid } = require("uuidv4");

exports.createManager = async(req , res) =>{
    try {
        const manager_id=uuidv4()

        //creating Manager 
        const newManager=new Manager({manager_id, is_active: true})
        await newManager.save()
        res.status(201).json({message: "manager created successfully", ManagerId: manager_id})

    } catch (error) {
        res.status(500).json({message: "server Error", error})
        console.log(error)
    }
}