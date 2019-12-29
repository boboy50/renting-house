import axios from 'axios'
import { getLocationCity } from '../../utils/city'
import { SET_OPEN_TYPE, SET_FILTER_DATA, SET_SELECT_VALUE,SET_SELECT_TITLE_VALUE } from '../actionTypes/filterActionType'
/**
* 更改actionType 的同步 actionCreator
*  @param {openType}   要打开的类型     "area" "mode" "price" "more"
* @return: 
*/
export const setOpenType = openType => {
    return {
        type: SET_OPEN_TYPE,
        payload: {openType} 
    }
}

/**
* 同步更改filterData 中的方法
*/
const setFilterData = filterData => {
    return {
        type: SET_FILTER_DATA,
        payload: {filterData}
    }
}

/**
* 异步的action  用于获取数据
*/
export const asyncSetFilterData = () => {
    return async dispatch => {
        const {value} = await getLocationCity()
        const result = await axios.get(`/houses/condition?id=${value}`)
        
        //触发同步的 action
       dispatch(setFilterData(result.data.body))
    }
}

/**
* obj {mode:['true']}
*/
//设置选中的值
export const setSelectValue = obj => {
    return {
        type: SET_SELECT_VALUE,
        payload: obj
    }
}

/**
* 设置选中的type值 
*/
export const setSelectTitleValue = titleObj => {
    return {
        type: SET_SELECT_TITLE_VALUE,
        payload: titleObj
    }
}