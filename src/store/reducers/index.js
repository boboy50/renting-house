//combineReducers 合并多个reducer 因为创建仓库只能导入一个根reducer

import { combineReducers } from 'redux'

//导入各个子 reducer
import Filters from './Filters'
// import Community from './Community'

//导出combineReducers(合并后的多个reducer)
export default combineReducers ({
    Filters
})

