import React from 'react';
//全局导入虚拟化长列表样式
import 'react-virtualized/styles.css'
//导入全局样式
import './App.css'

//导入字体图标
import './assets/fonts/iconfont.css'

//导入组件
import Layout  from './views/Layout'
import Login from './views/Login'
import Map from './views/Map'
import CityList from './views/CityList'
import NotFound from './views/NotFound'


import './utils/axios'

//导入路由
import { HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
function App() {
  return (
    <Router>
        <div id='app'>
          <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/layout" component={Layout}></Route>
          <Route path="/map" component={Map}></Route>
          <Route path="/citList" component={CityList}></Route>
          <Redirect exact from="/" to="/layout/home"></Redirect>
          <Route component={NotFound}></Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
