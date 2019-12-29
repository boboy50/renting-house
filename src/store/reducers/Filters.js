import {SET_OPEN_TYPE, SET_FILTER_DATA,SET_SELECT_VALUE,SET_SELECT_TITLE_VALUE} from '../actionTypes/filterActionType'

const initState = {
    openType: '' , //这就是我们要操作的openType,到时候更改不同的openType就可以切换不同的组件
    filterData: {}, //展示FilterPicker 与FilterMore所需要的数据
    selectValue: {
        // 选中的值
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: []
      },
    selectTitleValue: {//标题选中后的值,如果为true则显示高亮,如果为false则不显示高亮
        area: false,
        mode: false,
        price: false,
        more: false
    } 
}

//导处去的纯函数
export default (state = initState, action) => {
    switch (action.type) {
        case SET_OPEN_TYPE:
            //把之前的数据深拷贝一次
            const newState1 = JSON.parse(JSON.stringify(state))

            newState1.openType = action.payload.openType

            //判断用户是否有选中项 处理selectTitle是否高亮状态
            Object.keys(newState1.selectTitleValue).forEach(key => {
                if(key === 'area') {
                    newState1.selectTitleValue['area'] = newState1.selectValue['area'].length > 2
                } else if (key === 'mode' || key === 'price') {
                    newState1.selectTitleValue[key] = newState1.selectValue[key][0] !== 'null'
                } else if (key === 'more') {
                    newState1.selectTitleValue['more'] = newState1.selectValue['more'].length > 0
                }
            })

            return newState1

        case SET_FILTER_DATA:
            //把之前的数据深拷贝一次
            const newState2 = JSON.parse(JSON.stringify(state))
            return{...newState2, ...action.payload}

        case SET_SELECT_VALUE:
            //把之前的数据深拷贝一次
            const newState3 = JSON.parse(JSON.stringify(state))
            newState3.selectValue = {...newState3.selectValue, ...action.payload}
            return newState3
        case SET_SELECT_TITLE_VALUE:
            //把之前的数据深拷贝一次
            const newState4 = JSON.parse(JSON.stringify(state))
            newState4.selectTitleValue = {...newState4.selectTitleValue,...action.payload}

            return newState4
        default:
           return state
    }
}