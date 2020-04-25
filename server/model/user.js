// model模块 MVC中的M数据的增删改查
const mongoose = require('../utils/database');
// 设置数据库字段
const User = mongoose.model('yuser', {
  username: String,
  password: String,
  status: Boolean,
  Jurisdiction: Boolean,
  registerTime: Number,
  name: String,
  urlPic: String,
  userstatus: String,
  loginid: String,
  phone: Number,
  sex: String,
  age: Number,
  detailaddress: String,
  yytime: String,
  yyid: String,
  fwid: String,
  // 用户预约成功，将订单信息存入用户基本信息中
  orderinfo: Array,
  serviceInfo: Array,
  pingjia: Array,
});
//................................
// 查找单个用户的信息
const userFind = (username, value) => {
  //
  return User.find({ $and: [{ username: username }, { userstatus: value }] });
};
// 保存用户信息,用户注册
const userSave = (userInfo, cb) => {
  let user = new User(userInfo);
  return user.save();
};
//查询用户总信息，前端渲染
const userInfo = searchValue => {
  if (searchValue === '') {
    return User.find();
  } else if (searchValue !== '') {
    return User.find({ username: { $regex: searchValue } });
  }
};
const searchValue = (searchValue) => {
  let contition = { username: new RegExp(`^.*${searchValue}.*$`) }
    return User.find(contition);
};
const userPass = id => {
  return User.findOne({ _id: id });
};

const updatePass = (id, newpassword) => {
  return User.update({ _id: id }, { $set: { password: newpassword } });
};
//用户修改头像
const UpdatePic = (id, urlPic) => {
  return User.update({ _id: id }, { $set: { urlPic: urlPic } });
};
// 查询单个用户信息接口
const userInter = id => {
  return User.findOne({ _id: id });
};

const updateStatues = (value, yytime, id, yyid) => {
  return User.update(
    { _id: id },
    { $set: { status: value, yytime: yytime, yyid: yyid } },
    { multi: true },
  );
};
const SqFw = (id, fwid) => {
  console.log(id, fwid);
  return User.update({ _id: id }, { $set: { fwid: fwid } });
};
const updateJurisdiction = (value, id) => {
  return User.update({ _id: id }, { $set: { Jurisdiction: value } });
};
//在用户预约列表页，显示预约成功以后，将服务人员的信息存入用户信息中
const saveOrderInfo = (record, userid) => {
  console.log(record);
  return User.update({ _id: userid }, { $push: { orderinfo: record } });
};
// 取消预约
const cancleOrder = (flag, id) => {
  return User.update({ _id: id }, { $set: { status: flag, yyid: '' } }, { multi: true });
};
// const resetpassword=(id,pass)=>{
//     return User.update({ _id: id }, { $set: { status: flag,yyid:"" }},{multi:true})
// }
const pingjia = (value, id) => {
  console.log(value);
  return User.update({ _id: id }, { $push: { pingjia: value } });
};
const saveServiceInfo = (record, userid) => {
  return User.update({ _id: userid }, { $push: { serviceInfo: record } });
};
//获取用户详细信息，包含了订单信息
const userDetailInfo = userid => {
  return User.findOne({ _id: userid });
};
const deleteYuyueUser = (userId, id) => {
  return User.update({ _id: userId }, { $pull: { orderinfo: { _id: id } } });
};
const delpingjia = (logid, name) => {
  return User.update(
    { $and: [{ username: logid }, { userstatus: 'unadmin' }] },
    { $pull: { pingjia: { username: name } } },
  );
};
// 管理员删除人员信息
const deleteWorkerInfo = id => {
  return User.find({ _id: id }).deleteOne();
};
module.exports = {
  delpingjia,
  SqFw,
  updateJurisdiction,
  pingjia,
  cancleOrder,
  updateStatues,
  saveServiceInfo,
  userFind,
  userSave,
  userPass,
  updatePass,
  UpdatePic,
  userInter,
  deleteYuyueUser,
  //用户总信息
  searchValue,
  userInfo,
  // 将预约成功的服务人员信息存入用户信息中
  saveOrderInfo,
  userDetailInfo,
  deleteWorkerInfo,
};
