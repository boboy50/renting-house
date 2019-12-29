import React, { Component } from 'react'

import styles from './index.module.scss'

//导入子组件
import FilterTitle from '../FilterTitle'
import FilerPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'
//遮罩层动画
import { Spring } from 'react-spring/renderprops'
class Filter extends Component {
    componentDidMount() {
        this.props.asyncSetFilterData()
    }
    //渲染遮罩
    renderMark = () => {
        const { openType } = this.props
        //  if( openType === '' || openType === 'more') {
        //      return null
        //  } else {
        //      return(
        //          <div className={styles.mask} onClick={() => this.props.setOpenType('')}></div>
        //      )
        //  }
        const isShow = openType === 'area' || openType=== 'mode' || openType === 'price'
        return (
            <Spring
                to={{ opacity: isShow ? 1 : 0}} config={{ duration: 300 }}>
                {props => {
                    if(props.opacity === 0) {
                        return null
                    }
                    return(
                        <div style={props} className={styles.mask} onClick={() => this.props.setOpenType('')}></div>
                    )
                }}
            </Spring>
        )

    }
    render() {
        const { openType } = this.props
        return (
            <div className={styles.root}>
                {/* 遮罩层 */}
                {this.renderMark()}
                {/* 筛选栏 */}
                {/* 内容 */}
                <div className={styles.content}>
                    <FilterTitle />
                    {/* 根据openType的值渲染 FilerPicker 或是 FilterMore*/}
                    {(openType === 'area' || openType === 'mode' || openType === 'price') && <FilerPicker />}
                    {openType === 'more' && <FilterMore />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ Filters: { openType } }) => {
    return { openType }

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(filterActionCreator, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)