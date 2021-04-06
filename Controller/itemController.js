const DataItem = require('../Model/ModelItem')
const fs = require('fs')
const path = require('path')

exports.insertItem = (req,res)=>{
    let {itemId,profileId,categoryId,Description,price} = req.body 
    let dataSave = new DataItem({
        itemId          :itemId,
        profileId       :profileId,
        categoryId      :categoryId,
        Description     :Description,
        price           :price
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

exports.getItem = (req,res)=>{
    DataItem.find().exec((err,doc)=>{
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

exports.getItemByID = (req,res)=>{
    let idItem = req.params.id
    DataItem.findById(idItem).exec((err,doc)=>{
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

exports.updateItem = (req,res)=>{
    let idItem=req.params.id
    DataItem.findByIdAndUpdate(idItem,req,(err,doc)=>{
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

exports.deleteItem = (req,res)=>{
    let idItem = req.params.id
    DataItem.findByIdAndDelete(idItem,(err,doc)=>{
        if(!err){
            doc.photo.forEach((data)=>{
                removeImages(data)
            })

            res.status(200).json({
                message:"Delete Berhasil!",
                data: doc
            })
        }else{
            res.status(400).send("Gagal Insert Data ERR : "+err)
        }
    })
}