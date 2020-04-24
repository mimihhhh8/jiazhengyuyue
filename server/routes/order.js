// 引入依赖
var express = require('express');
// 调用express中的router函数
var router = express.Router();
const orderController=require("../controller/order")
// 注册接口
router.post("/orderSave",orderController.orderSave);

module.exports = router;