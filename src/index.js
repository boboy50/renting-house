import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//导入字体图标样式
import './assets/fonts/iconfont.css'

//导入 axios 让webpack 去打包它
import './utils/axios'

//处理 react-redux
import { Provider } from 'react-redux'
import store from './store'

//用Provider将App包裹起来
ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
