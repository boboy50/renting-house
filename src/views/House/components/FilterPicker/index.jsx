import React, { Component } from 'react'

import { connect } from 'react-redux'

import { PickerView } from "antd-mobile"

import FilterFooter from '../FilterFooter'

import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
import { bindActionCreators } from 'redux'

class FilterPicker extends Component {
    constructor(props) {
        super()
        this.state = {
            value: props.selectValue[props.openType],
            openType: props.openType
        }
    }

    select = (val) => {
        this.setState({
            value: val
        })
    }

    //筛选项,从在筛选项里直接切换 显示上一次的选中项 取出最新的openType的value值将原先的值覆盖
    static  getDerivedStateFromProps(props, state) {
      if(props.openType !== state.openType ) {
        return {
            ...state,
            value: props.selectValue[props.openType], //取出最新的openType 的选中值 赋值给value
            openType: props.openType //取出最新的 openType值 赋值给openType
        }
      } else {
          return state
      }
    
    }
    render() {
        const { value } = this.state
        const { openType, area, subway, rentType, price } = this.props
        let cols = 3
        let data = null
        switch (openType) {
            case 'area':
                data = [area, subway]
                break

            case 'mode':
                data = rentType
                cols = 1
                break

            case 'price':
                data = price
                cols = 1
                break

            default:
                break
        }
        return (
            <div>
                <PickerView data={data} cols={cols} value={value} onChange={this.select} />
                <FilterFooter onCancel={() => this.props.setOpenType('')
                } onOk={() => {
                    this.props.setSelectValue({ [openType]: value })
                    this.props.setOpenType('')
                }} />
            </div>
        )
    }
}
const mapStateToProps = ({ Filters: { openType, filterData: { area, subway, rentType, price },selectValue } }) => {
    return {
        openType,
        area,
        subway,
        rentType,
        price,
        selectValue
        
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(filterActionCreator, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterPicker)