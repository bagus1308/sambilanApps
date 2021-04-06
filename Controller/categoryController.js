const DataCategory = require('../Model/ModelCate')
const fs = require('fs')
const path = require('path')

exports.insertCategory = (req,res)=>{
    let {type} = req.body
    let photo = []
    req.files.forEach((data)=>{
        photo.push(data.path)
    })    
    let dataSave = new DataCategory({
        type        :type,
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

exports.getCategory = (req,res)=>{
    DataCategory.find().exec((err,doc)=>{
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

exports.getCategoryByID = (req,res)=>{
    let idCategory = req.params.id
    DataCategory.findById(idCategory).exec((err,doc)=>{
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

exports.updateCategory = (req,res)=>{
    let idCategory=req.params.id
    DataCategory.findByIdAndUpdate(idCategory,req,(err,doc)=>{
        if(!err){
            req.files.forEach((data,i)=>{
                let oldPath = doc.photo[i]
                let newPath = data.path
                fs.retype(newPath,oldPath,(err)=>{
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

exports.deleteCategory = (req,res)=>{
    let idCategory = req.params.id
    DataCategory.findByIdAndDelete(idCategory,(err,doc)=>{
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
    filepath = path.join(__dirtype, '../', filepath);
    fs.unlink(filepath, err => {
        console.log(err)
    })
}