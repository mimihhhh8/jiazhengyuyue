//引入依赖
var express=require('express');
//调用express中的Router函数
var router=express.Router();
const dateController=require("../controller/date");
router.post("/date",dateController.dateInfo);
module.exports=router;