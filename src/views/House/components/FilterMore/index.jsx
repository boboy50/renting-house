import React, { Component } from 'react'

import { connect } from 'react-redux'

import styles from './index.module.scss'

import FilterFooter from '../FilterFooter'

import { bindActionCreators } from 'redux'

import * as filterActionCreator from '../../../../store/actionCreators/filterActionCreator'

import classNames from 'classnames'
class FilterMore extends Component {
    constructor(props) {
        super()
        this.state = {
            value: props.more
        }
    }
    //切换选择
    toggleSelect = val => {
        //深拷贝之前的数组
        let oldValue = JSON.parse(JSON.stringify(this.state.value))
        //判断value 是否之前存在于 oldValue 数组中, 如果存在则去掉,如果不存在则添加

        if (oldValue.includes(val)) {
            oldValue = oldValue.filter(item => item !== val)
        } else {
            oldValue.push(val)
        }

        //赋值给value,重新渲染之后,添加高亮
        this.setState({
            value: oldValue
        })

    }
    //渲染编辑选项
    renderDd = data => {
        const { value } = this.state
        return (
            <dd className={styles.dd}>
                {
                    data.map(item => {
                        return (
                            <span className={classNames(styles.tag, { [styles.tagActive]: value.includes(item.value) })} key={item.value} onClick={() => this.toggleSelect(item.value)}>{item.label}</span>
                        )
                    })
                }
            </dd>
        )
    }
    render() {
        const { roomType, characteristic, floor, oriented } = this.props
        return (
            <div className={styles.root}>
                {/* 遮罩 */}
                <div className={styles.mask} onClick={() => this.props.setOpenType('')}> </div>
                <div className={styles.tags}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        {this.renderDd(roomType)}
                        <dt className={styles.dt}>朝向</dt>
                        {this.renderDd(characteristic)}
                        <dt className={styles.dt}>楼层</dt>
                        {this.renderDd(floor)}
                        <dt className={styles.dt}>房屋亮点</dt>
                        {this.renderDd(oriented)}
                    </dl>
                </div>
                <div className={styles.footer}>
                    <FilterFooter cancelText="清除" onCancel={() => this.setState({ value: [] })} onOk={() => {
                        this.props.setSelectValue({ more: this.state.value })
                        this.props.setOpenType('')
                    }} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    Filters: {
        filterData: { characteristic, floor, oriented, roomType },
        selectValue: {more}
    }
}) => {
    return {
        characteristic,
        floor,
        oriented,
        roomType,
        more
    }
}

const mapDispatchToProps = dispatch => {

    return bindActionCreators(filterActionCreator, dispatch)

}
export default connect(mapStateToProps, mapDispatchToProps)(FilterMore)