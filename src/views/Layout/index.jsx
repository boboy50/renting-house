import React, { Component } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'

import { TabBar } from 'antd-mobile'

import styles from './index.module.scss'


//导入组件
import Home from '../Home'
import House from '../House'
import Info from '../Info'
import My from '../My'
import NotFound from '../NotFound'
export default class Layout extends Component {
    constructor(props) {
        super()
        this.state = {
            selectedPath: props.location.pathname
        }
    }

   static getDerivedStateFromProps(props, state) {
        console.log(props);
        console.log(state);
        return{
            
        }
        
    }
    //tabs数组
    TABS = [
        {
            title: '首页',
            icon: 'icon-index',
            path: '/layout/home'
        },
        {
            title: '找房',
            icon: 'icon-findHouse',
            path: '/layout/house'
        },
        {
            title: '咨询',
            icon: 'icon-info',
            path: '/layout/info'
        },
        {
            title: '我的',
            icon: 'icon-my',
            path: '/layout/my'
        }
    ]

    renderTabBar = () => {
        return (
            <TabBar tintColor="#21B97A" noRenderContent>
                {
                   this.TABS.map(item => {
                       return<TabBar.Item 
                       key={item.path} 
                       title={item.title}
                       icon={<i className={`iconfont ${item.icon}`}/>}
                       selectedIcon={<i className={`iconfont ${item.icon}`}/>}
                       selected={this.state.selectedPath === item.path}
                       onPress={() => {
                           this.setState({
                               selectedPath: item.path
                           })

                           //让路由切换 显示页面
                           if(this.state.selectedPath !== item.path) {
                               this.props.history.push(item.path)
                           }
                       }}
                       />
                   })
                }

            </TabBar>
        )
    }

    render() {
        return (

            <div className={styles.layout}>
                <div>
                    <Switch>
                        <Route path="/layout/home" component={Home} ></Route>
                        <Route path="/layout/house" component={House}></Route>
                        <Route path="/layout/info" component={Info}></Route>
                        <Route path="/layout/my" component={My}></Route>
                        <Redirect exact from="/layout" to="/layout/home"></Redirect>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
                <div className={styles.tabbar}>
                    {this.renderTabBar()}
                </div>

            </div>

        )
    }
}
