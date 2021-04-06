const DataProfile = require('../Model/ModelProfile')
const fs = require('fs')
const path = require('path')

exports.insertProfile = (req,res)=>{
    let {name,profession,categoryId,Phone,Address} = req.body
    let photo = []
    req.files.forEach((data)=>{
        photo.push(data.path)
    })    
    let dataSave = new DataProfile({
        name        :name,
        profession  :profession,
        categoryId  :categoryId,
        Phone       :Phone,
        Address     :Address,
        photo       :photo
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

exports.getProfile = (req,res)=>{
    DataProfile.find().exec((err,doc)=>{
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

exports.getProfileByID = (req,res)=>{
    let idUser = req.params.id
    DataProfile.findById(idUser).exec((err,doc)=>{
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

exports.updateProfile = (req,res)=>{
    let idUser=req.params.id
    DataProfile.findByIdAndUpdate(idUser,req,(err,doc)=>{
        if(!err){
            req.files.forEach((data,i)=>{
                let oldPath = doc.photo[i]
                let newPath = data.path
                fs.rename(newPath,oldPath,(err)=>{
                    if(err){
                        throw err;
                    }
                })
            })
            res.status(200).json({
                message:"Update Berhasil!",
                data: doc
            })
        } else{
            res.status(400).send("Gagal Insert Data ERR : "+err)
        }
    })

}

exports.deleteProfile = (req,res)=>{
    let idUser = req.params.id
    DataProfile.findByIdAndDelete(idUser,(err,doc)=>{
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

const removeImages = (filepath)=>{
    filepath = path.join(__dirname, '../', filepath);
    fs.unlink(filepath, err => {
        console.log(err)
    })
}