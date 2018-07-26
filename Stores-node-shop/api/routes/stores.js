const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Store = require('../models/store');

router.get('/',(req, res, next)=>{
    const limit= Number(req.query.limit);
    console.log(req.query.limit);
    sorting = req.query.sortBy;
    console.log(sorting);
    sortdir = req.query.sortDir;
    var startFrom = Number(req.query.startFrom);
    console.log(req.query.startFrom);
    console.log('helllo');
    Store.find()
    .exec()
    .then(docs=>{
        if(sortdir=='asc'){
        console.log(docs.length);
        docs.sort(function(a, b){
            if (a[sorting].toLowerCase()<b[sorting].toLowerCase())
            return -1;
            if (a[sorting].toLowerCase()>b[sorting].toLowerCase())
            return 1;
            return 0;
        });
    }else if(sortdir=='desc'){
        if (a[sorting].toLowerCase()<b[sorting].toLowerCase())
            return 1;
            if (a[sorting].toLowerCase()>b[sorting].toLowerCase())
            return -1;
            return 0;
    }
        if((limit+startFrom)<=docs.length){
        docx = docs.slice(startFrom,limit+startFrom);
        console.log(docx.length);
        res.status(200).json(docx);
        }else{
            docx=docs.slice(startFrom,docs.length);
            res.status(200).json(docx);
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
   
    
});

router.post('/',(req,res,next)=>{
   
    const store = new Store({
        _id: new mongoose.Types.ObjectId(),
        StoreName: req.body.StoreName,
        ContractID: req.body.ContractID,
        Country: req.body.Country,
        DCOTAConnection: req.body.DCOTAConnection,
        SFOStoreID: req.body.SFOStoreID,
        LocalizedStoreName: req.body.LocalizedStoreName,
        StoreAddressLine1: req.body.StoreAddressLine1,
        StoreAddressLine2: req.body.StoreAddressLine2,
        StoreAddressLine3: req.body.StoreAddressLine3,
        AppleID: req.body.AppleID,
        City: req.body.City,
        District: req.body.District
    });
    store.save().then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Post request',
        createdStore: store
    })
})

module.exports = router;