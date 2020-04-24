const dateModel = require("../model/date");

const dateInfo = async (req, res) => {
    //前端传的参数
    let { page, limit,startDate,endDate,typeDate} = req.body;
    //数据列表
    let dataList = await dateModel.dateFind(page, limit,startDate,endDate,typeDate);
    //数据总条数
    let dataTotal = await dateModel.dataTotal();
    //日期查询总条数
    let searchDate=await dateModel.searchDate(startDate, endDate);
    //日期及数据类型查询出的总条数
    let typeDateTotal=await dateModel.typeDate_searchDate(startDate, endDate,typeDate);
    //类型查询
    let dateType=await dateModel.dateType();
    //返给前端的数据
    if (dataList) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                status: "success",
                dataList: dataList,
                dataTotal: dataTotal,
                searchDate:searchDate,
                dateType:dateType,
                typeDateTotal:typeDateTotal
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: '',
        })
    }
}

module.exports = {
    dateInfo,
}