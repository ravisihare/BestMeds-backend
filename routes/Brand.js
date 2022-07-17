var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

router.post('/savebrand', upload.single('brandicon'), function (req, res) {
    console.log(req.body);
    pool.query("insert into brands (categoryid,subcategoryid,brandname,brandicon,status) values(?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryid, req.body.brandname, req.myfilename, req.body.status], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ result: "false" })
        } else {
            res.status(200).json({ result: "true" })
        }

    })


});

router.get('/displayallbrands',function(req,res,next){
    pool.query("select B.*, (select categoryname from categories C where C.categoryid= B.categoryid ) as categoryname ,(select subcategoryname from subcategories S where S.subcategoryid=B.subcategoryid) as subcategoryname from brands B ",function(error,result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

router.post('/displaybrandbyid',function(req,res,next){
    pool.query("select * from brands where subcategoryid=? ",[req.body.subcategoryid],function(error,result){
        if(error){
            
            res.status(500).json({result:false})
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

router.post('/displayallbrandsbystatus',function(req,res,next){
    pool.query("select * from brands where status=? group by brandname",[req.body.status],function(error,result){
        if(error){
            
            res.status(500).json([])
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

router.post('/deletedata',function(req,res,next){
    pool.query("delete from brands where brandid=?",[req.body.brandid],function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
})

router.post('/editdata',function(req,res,next){
    console.log(req.body)
    pool.query("update brands set categoryid=?,subcategoryid=?,brandname=?,status=? where brandid=?",[req.body.categoryId,req.body.subcategoryId,req.body.brandname,req.body.status,req.body.brandid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            console.log(result)
            res.status(200).json({result:true})
        }
    })
})

router.post('/editicon', upload.single('brandicon'), function(req, res, next) {
    pool.query("update brands set brandicon=? where brandid=?",[req.myfilename,req.body.brandid],function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }
    })
 
});

  module.exports = router;