import  Mock  from "mockjs";

import banner from './banner.json'
import floor from './floor.json'


// Mock的使用
// 参数1：mock请求数据地址     参数2：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})