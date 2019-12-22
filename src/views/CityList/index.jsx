import React, { Component } from 'react'

import styles from './index.module.scss'

//导入轻提示
import { Toast } from 'antd-mobile';

//导入头部通用返回组件
import NavHeader from '../../components/NavHeader'

//导入获取定位城市的方法
import { getLocationCity, setCity } from '../../utils/city'

//导入虚拟化长列表
import { AutoSizer, List } from 'react-virtualized';

//每一行标题的高度
const TITLE_HEIGHT = 36

//每一行中 每一个城市的高度
const ROW_HEIGHT = 50

//热门城市
const HOST_CITY = ['北京', '上海', '广州', '深圳']
export default class CityList extends Component {
    constructor() {
        super()
        this.state = {
            cityListObj: null,  //渲染左边列表所需要的数据
            cityIndexList: null,   //渲染右边索引数组
            activeIndex: 0      //右边激活的索引
        }
    }

    //创建ref
    listRef = React.createRef()
    componentDidMount() {
        //获取城市列表数据
        this.getCityList()
    }

    //获取城市数据
    getCityList = async () => {
        const result = await this.$axios.get('/area/city?level=1')
        // console.log(result.data.body);
        this.dealWithCityData(result.data.body)
    }

    //处理渲染所需的数据
    dealWithCityData = async list => {
        //创建一个临时对象 用来处理数据对象(列表左边的数据)
        const tempObj = {}
        list.forEach(item => {
            const firstWord = item.short.substr(0, 1)
            if (tempObj[firstWord]) {//有值 则将这个数据对象 新增到数组后面
                tempObj[firstWord].push(item)
            } else {//没有则生成一个数组 将这个对象存入数组中
                tempObj[firstWord] = [item]
            }
        })
        // console.log(tempObj);

        //处理右边列表索引数据
        const tempIndex = Object.keys(tempObj).sort()
        // console.log(tempIndex);

        //处理服务器返回的热门城市
        const result = await this.$axios.get('/area/hot')
        // console.log(result.data.body); 
        tempIndex.unshift('hot')
        tempObj['hot'] = result.data.body

        //获取定位城市
        const locationCity = await getLocationCity()
        tempIndex.unshift('#')
        tempObj['#'] = [locationCity]

        // console.log(tempObj);
        // console.log(tempIndex); 

        //更改模型里面的值
        this.setState({
            cityListObj: tempObj,
            cityIndexList: tempIndex
        })
    }

    //格式化字母
    formatLetter = letter => {
        switch (letter) {
            case "#":
                return '定位城市'

            case "hot":
                return '热门城市'

            default:

                //将所有母转换成大写字母
                return letter.toUpperCase()
        }
    }

    //切换城市选择
    toggle = item => {
        if (!HOST_CITY.includes(item.label)) {
            Toast.info('该城市暂无房源', 2)
            return
        }
        const {label,value} = item
        //更新本地的缓存
        setCity({label,value})
        //通过编程式返回到首页
        this.props.history.goBack()

    }

    //渲染左边的每一行
    rowRenderer = ({ key, index, style }) => {
        //取出右边索引的每一个字母
        const letter = this.state.cityIndexList[index]

        //取出每一个字母下对应的城市
        const list = this.state.cityListObj[letter]

        // 一定要设置 style 因为这个值可以改变top 值 让列表达到复用的效果
        return (
            <div className={styles.city} key={key} style={style}>
                <div className={styles.title}>{this.formatLetter(letter)} </div>
                {
                    list.map(item => {
                        return (
                            <div key={item.value} className={styles.name} onClick={() => this.toggle(item)}>{item.label}</div>
                        )
                    })
                }
            </div>
        );
    }

    //计算每一行的高度
    calcRowHeight = ({ index }) => { //这里index为数组 需要解构
        const cityIndex = this.state.cityIndexList[index]

        //拿到 cityIndex 对应的数据
        const list = this.state.cityListObj[cityIndex]

        return TITLE_HEIGHT + list.length * ROW_HEIGHT
    }

    //渲染右边的索引
    renderCityIndexList = () => {
        const { cityIndexList, activeIndex } = this.state
        return (
            <div className={styles.cityIndex}>
                {
                    cityIndexList.map((item, index) => {
                        return (
                            //给右边的索引添加点击事件 
                            <div key={item} className={styles.cityIndexItem} onClick={() => this.clickIndex(index)}>
                                <span className={index === activeIndex ? styles.indexActive : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    //滚动左边长列表 触发的方法
    onRowsRendered = ({ startIndex }) => {
        //判断 是否还处于当前字母下的城市列表
        if (this.state.activeIndex !== startIndex) {
            // console.log(startIndex);
            this.setState({
                activeIndex: startIndex

            })
        }
        //在同一个字母下面 有多个城市 会多次触发
        // console.log(startIndex);
    }

    //点击右边的索引的交互方法
    clickIndex = index => {
        this.listRef.current.scrollToRow(index)
        //注意设置 列表滚动的对齐方式
    }
    render() {
        const { cityListObj, cityIndexList } = this.state
        return (
            <div className={styles.citylist}>
                {/* 渲染 NavHeader子组件*/}
                <NavHeader title="城市列表"></NavHeader>
                {/* AutoSizer 会自适应屏幕宽高 */}
                {cityListObj && (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                ref={this.listRef}
                                height={height}
                                rowCount={cityIndexList.length}
                                //每一行的高度
                                rowHeight={this.calcRowHeight}
                                //每一行的渲染
                                rowRenderer={this.rowRenderer}
                                //滚动左长列表触发的方法
                                onRowsRendered={this.onRowsRendered}
                                //列表的对齐方式
                                scrollToAlignment="start"
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )}
                {/* 渲染右边的索引 */}
                {
                    cityIndexList && this.renderCityIndexList()
                }
            </div>
        )
    }
}
