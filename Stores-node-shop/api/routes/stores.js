const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Store = require('../models/store');

function sortData(data,sortdir,sorting){
    if(sortdir=='asc'){
        data.sort(function(a, b){
              if (a[sorting].toLowerCase()<b[sorting].toLowerCase())
              return -1;
              if (a[sorting].toLowerCase()>b[sorting].toLowerCase())
              return 1;
              return 0;
          });
      }else if(sortdir=='des'){
      data.sort(function(a, b){
          if (a[sorting].toLowerCase()<b[sorting].toLowerCase())
              return 1;
              if (a[sorting].toLowerCase()>b[sorting].toLowerCase())
              return -1;
              return 0;
      });
    }
    return data;
}

function filterData(data,filter){
    let allFilters = Object.keys(filter);
    if(allFilters.length==0){
      return data;  
    }
    let filteredData=[];
    let finalData=[];
    let tempData=[];
    for(let i=0;i<allFilters.length;i++){
       for( let j=0; j<filter[allFilters[i]].length;j++){
         tempData=data.filter(function(el){
             return el[allFilters[i]].toLowerCase().indexOf(filter[allFilters[i]][j].toLowerCase())>-1;              
         });
         filteredData=filteredData.concat(tempData);
         tempData=[];
      }
      data=filteredData;
      finalData=filteredData;
      filteredData=[]
    }
    return finalData;
}


router.get('/',(req, res, next)=>{
    var limit= Number(req.query.limit);
    var sorting = req.query.sortBy;
    var sortdir = req.query.sortDir;
    var startFrom = Number(req.query.startFrom);
    var docx;
    Store.find()
    .exec()
    .then(docs=>{
       docs=sortData(docs,sortdir,sorting);
       if((limit+startFrom)<=docs.length){
            docx = docs.slice(startFrom,limit+startFrom);
       }else{
            docx=docs.slice(startFrom,docs.length);
       }
       res.status(200).json(docx);
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    });
});

router.post('/',(req,res,next)=>{
    var filter =req.body;
    var limit= Number(req.query.limit);
    var sorting = req.query.sortBy;
    var sortdir = req.query.sortDir;
    var startFrom = Number(req.query.startFrom);
    var filteredData=[];
    var docx;
    Store.find()
    .exec()
    .then(docs=>{
        filteredData = filterData(docs,filter);
        docs=sortData(filteredData,sortdir,sorting);
        if((limit+startFrom)<=docs.length){
            docx = docs.slice(startFrom,limit+startFrom);
        }else{
            docx=docs.slice(startFrom,docs.length);
        } 
      res.status(201).json(docx);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;