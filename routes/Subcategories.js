var express= require('express');
var router=express.Router();
var pool=require('./pool');
const upload = require('./multer');

router.post('/subsavecategories',upload.single('icon'),function(req,res,next){
    pool.query("insert into subcategories(categoryid,subcategoryname,description,icon) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.myfilename],function(error,result){
        if(error){
            console.log(req.body)
            res.status(500).json({result:false})
        }
        else{
            console.log(req.body)
            res.status(200).json({result:true})
        }
    })
})

router.post('/displaysubcategorybyid',function(req,res,next){
    pool.query("select * from subcategories where categoryid=?",[req.body.categoryid],function(error,result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

router.get('/displayallsubcategory',function(req,res,next){
    pool.query("select S.*, (select categoryname from categories C where C.categoryid=S.categoryid ) as categoryname from subcategories S"  ,function(error,result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

router.post('/editicon', upload.single('icon'), function(req, res, next) {
    pool.query("update subcategories set icon=? where subcategoryid=?",[req.myfilename,req.body.subcategoryid],function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
 
});

router.post("/editdata", function (req, res, next) {
    console.log(req.body);
    pool.query(
      "update subcategories set categoryid=?,subcategoryname=?,description=? where subcategoryid=?",
      [req.body.categoryid, req.body.subcategoryname, req.body.description, req.body.subcategoryid],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  });
  


router.post('/deletedata',function(req, res, next) {
    console.log(req.query)
    pool.query("delete from subcategories where subcategoryid=?",[req.body.subcategoryId],function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
           
            res.status(200).json({result:true})
        }
    })
 
});

module.exports= router;