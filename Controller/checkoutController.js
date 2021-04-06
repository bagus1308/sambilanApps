const DataCheckout = require('../Model/ModelCheckout')
const fs = require('fs')
const path = require('path')

exports.insertCheckout = (req,res)=>{
    let {itemId,profileId,categoryId,paymentId,idUser} = req.body 
    let dataSave = new DataCheckout({
        itemId          :itemId,
        profileId       :profileId,
        categoryId      :categoryId,
        paymentId       :paymentId,
        idUser          :idUser
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

exports.getCheckout = (req,res)=>{
    DataCheckout.find().exec((err,doc)=>{
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

exports.getCheckoutByID = (req,res)=>{
    let idCheckout = req.params.id
    DataCheckout.findById(idCheckout).exec((err,doc)=>{
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

exports.updateCheckout = (req,res)=>{
    let idCheckout=req.params.id
    DataCheckout.findByIdAndUpdate(idCheckout,req,(err,doc)=>{
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

exports.deleteCheckout = (req,res)=>{
    let idCheckout = req.params.id
    DataCheckout.findByIdAndDelete(idCheckout,(err,doc)=>{
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