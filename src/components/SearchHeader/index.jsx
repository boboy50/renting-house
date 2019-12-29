import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'

function SearchHeader({ cityName, history, className }) {
    return (
        <Flex className={classNames(styles.root,className)}>
            <Flex className={styles.searchLeft}>
                <div className={styles.location} onClick={() =>{
                    history.push('/citList')
                }}>
                    <span>{cityName}</span>
                    <i className="iconfont icon-arrow"></i>
                </div>
                <div className={styles.searchForm}>
                    <i className="iconfont icon-search"></i>
                    <span>请输入小区或地址</span>
                </div>
            </Flex>
           <Link to="/map"><i className="iconfont icon-map"></i></Link>
        </Flex>
    )
}
//props 类型约束
SearchHeader.propTypes = {
    cityName: PropTypes.string.isRequired
}


export default withRouter(SearchHeader)