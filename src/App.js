import React from 'react';

//导入字体图标
import './assets/fonts/iconfont.css'

//导入组件
import Layout  from './views/Layout'
import Login from './views/Login'
import NotFound from './views/NotFound'

import './utils/axios'

//导入路由
import { HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
function App() {
  return (
    <Router>
        <div >
          <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/layout" component={Layout}></Route>
          <Redirect exact from="/" to="/layout/home"></Redirect>
          <Route component={NotFound}></Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
