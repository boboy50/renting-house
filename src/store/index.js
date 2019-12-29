import { createStore, applyMiddleware, compose } from 'redux'

//导入根reducers
import rootReducer from './reducers'

//导入异步的 redux-thunk
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//创建仓库 并导出
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

export default store