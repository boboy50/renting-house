import React from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import {NavBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
function NavHeader({title,history}) {
    return(
        <NavBar
        className={styles.navBar}
      mode="light"
      icon={<i className='iconfont icon-back' />}
      onLeftClick={() => history.goBack()}
    >{title}</NavBar>
    )
}

NavHeader.propType = {
    title: PropTypes.string.isRequired
}
NavHeader.defaultProps ={
    title: ''
}

export default withRouter (NavHeader)