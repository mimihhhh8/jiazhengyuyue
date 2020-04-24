//引入上传文件的模块
const multer=require("multer");
//模块的配置项  设置文件的名称以及文件的地址
// DiskStorage - 硬盘存储 MemoryStorage - 内存存储
var storage=multer.diskStorage({
    destination:function(req,file,cb){//destination - 文件的保存目录(DiskStorage)
        cb(null,'./public/images')
    },
    //设置文件名称
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)// filename - 文件在destination中的名称(DiskStorage)
    }
})
//使用配置项
var upload = multer({ storage: storage })

//配置文件最大能上传几个
var cpUpload=upload.fields([{name:'file',maxCount:1}])//fields是一个包含对象的数组，对象中会包含name和maxCount两个属性：

module.exports = cpUpload;

