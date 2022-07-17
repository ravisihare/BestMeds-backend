var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');

/* GET home page. */
router.post('/saveproduct',upload.single('picture'), function(req, res, next) {
    console.log(req.body)
    console.log(req.file)
  pool.query("insert into products (categoryid,subcategoryid,brandid,productname,description,price,offerprice,offertype,stock,status,salestatus,rating,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.offertype,req.body.stock,req.body.status,req.body.salestatus,req.body.rating,req.myfilename],function(error,result){
      if(error)
      {
          console.log(error)
          res.status(500).json({result:false})
      }
      else{
          console.log(result)
          res.status(200).json({result:true})
      }
  })
});

router.get('/displayproduct',function(req,res,next){
    pool.query("select P.*, (select categoryname from categories C where C.categoryid=P.categoryid )as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid )as subcategoryname,(select brandname from brands B where B.brandid=P.brandid ) as brandname  from products P", function(error,result){
        if(error){
            res.status(500).json({result:false})

        }
        else{
            res.status(200).json({result:result})
        }
    })
})


router.post('/displayproductbycategoryid',function(req,res,next){
    console.log(req.body.categoryid);
    pool.query("select * from products  where categoryid=?",[req.body.categoryid],function(error,result){
        if(error){
            res.status(500).json({result:[]})
        }
        else{
            res.status(200).json({result:result})
        }
    })
})

router.get('/displayproduct',function(req,res,next){
    pool.query("select P.*, (select categoryname from categories C where C.categoryid=P.categoryid )as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid )as subcategoryname,(select brandname from brands B where B.brandid=P.brandid ) as brandname  from products P", function(error,result){
        if(error){
            res.status(500).json({result:false})

        }
        else{
            res.status(200).json({result:result})
        }
    })
})

router.post('/productbysalestatus',function(req,res,next){
    pool.query("select * from products where salestatus=?",[req.body.salestatus],function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:result})
        }
    })
})


router.post('/displayproductbyid',function(req,res,next){
    pool.query("select * from products where brandid=? ",[req.body.brandid],function(error,result){
        if(error){
            
            res.status(500).json({result:false})
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})


router.post('/deletedata',function(req,res,next){
    console.log(req.body)
    pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
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

router.post('/editdata',function(req,res,next){
    console.log(req.body)
    pool.query("update products set categoryid=?, subcategoryid=?, brandid=?, productname=?,description=?, price=?, offerprice=?, offertype=?, stock=?, status=?, salestatus=?, rating=?  where productid=?",[req.body.categoryid,req.body.subcategoryid, req.body.brandid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.offertype,req.body.stock,req.body.status,req.body.salestatus,req.body.rating,req.body.productid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

router.post('/editicon',upload.single('picture'),function(req,res,next){
    pool.query("update products set picture=? where productid=?",[req.myfilename,req.body.productid],function(error,result){
        if(error){
            console.log(error)
            res.status(500).json({result:false})
        }
        else{
            console.log(result)
            res.status(200).json({result:result})
        }
    })
})

module.exports = router;
