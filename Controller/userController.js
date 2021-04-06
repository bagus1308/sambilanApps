const DataUser = require('../Model/ModelUser')
const fs = require('fs')
const path = require('path')

exports.insertHewan = (req,res)=>{
    let {name,email,password,address,location} = req.body
    let dataSave = new DataUser({
        name        :name,
        email       :email,
        password    :password,
        address     :address,
        location    :location
    })
    dataSave.save().then((doc)=>{
        res.status(200).json({
            message:"Insert Berhasil!",
            data: doc
        })
    }).catch(err=>{
        res.status(400).send("Gagal Insert Data ERR : "+err)
    })
}

exports.getUser = (req,res)=>{
    DataUser.find().exec((err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Berhasil mendapatkan semua data!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal mendapatkan Data ERR : "+err)
        }
    })
    
}

exports.getUserByID = (req,res)=>{
    let idUser = req.params.id
    DataUser.findById(idUser).exec((err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Berhasil mendapatkan semua data!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal mendapatkan Data ERR : "+err)
        }
    })
}

exports.updateUser = (req,res)=>{
    let idUser=req.params.id
    DataUser.findByIdAndUpdate(idUser,req,(err,doc)=>{
        if(!err){
            res.status(200).json({
                message:"Update Berhasil!",
                data: doc
            })
        } else{
            res.status(400).send("Gagal Insert Data ERR : "+err)
        }
    })

}

exports.deleteUser = (req,res)=>{
    let idUser = req.params.id
    DataUser.findByIdAndDelete(idUser,(err,doc)=>{
        if(!err){

            res.status(200).json({
                message:"Delete Berhasil!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal Insert Data ERR : "+err)
        }
    })
}