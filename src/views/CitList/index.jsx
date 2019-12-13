import React, { Component } from 'react'
import styles from './index.module.scss'
//导入头部通用返回组件
import NavHeader from '../../components/NavHeader'
export default class CityList extends Component {
    render() {
        return (
            <div className={styles.citylist}>
                <NavHeader title="城市列表"></NavHeader>
                城市列表组件
            </div>
        )
    }
}
