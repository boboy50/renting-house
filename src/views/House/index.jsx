import React, { Component } from 'react'

import styles from './index.module.scss'

import SearchHeader from '../../components/SearchHeader'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'

import { getLocationCity } from '../../utils/city'
export default class House extends Component {
    constructor() {
        super()
        this.state = {
            cityName: ''
        }
    }

   async componentDidMount() {
        const { label } = await getLocationCity()
        this.setState ({
            cityName: label
        })
        
    }
    render() {
        return (
            <div className={styles.root}>
                <Flex className={styles.listHeader}>
                    <i onClick={() => this.props.history.goBack()} className="iconfont icon-back"></i>
                <SearchHeader cityName={this.state.cityName} className={styles.mySearchBar}></SearchHeader>
                </Flex>
                {/* 筛选子组件 */}
                <Filter></Filter>
            </div>
        )
    }
}
