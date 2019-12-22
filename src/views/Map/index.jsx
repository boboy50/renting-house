import React, { Component } from 'react'
//导入样式
import styles from './index.module.scss';
import NavHeader from '../../components/NavHeader'
//导入获取定位城市的方法
import { getLocationCity } from '../../utils/city'
//导入Ant轻提示
import { Toast } from 'antd-mobile';
//导入 多样式
import classNames from 'classnames'
//导入小区房源列表
import HouseItem from '../../components/HouseItem'
const BMap = window.BMap

// 圆形覆盖物的样式：
const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255, 0, 0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
}
export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            houseList: null,  //小区下面的房源列表
            isShow: false  //房源列表显示或隐藏
        }
    }
    
    componentDidMount() {
        this.initMap()
    }

    //初始化地图
    initMap = async () => {
        //获取定位城市
        const { label, value } = await getLocationCity()
        //创建地图实例
        this.map = new BMap.Map("container");

        //设置当触摸地图移动时 关闭城市房源窗口
        this.map.addEventListener('touchstart',()=> {
            this.setState({
                isShow: false
            })
        })
        //利用百度地图的地址解析,通过城市名称,获取经纬度
        // 创建地址解析器实例     
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(label, point => {   //注意:这里要用箭头函数 不然函数里面不能直接使用this   
            if (point) {
                this.map.centerAndZoom(point, 11);
                // map.addOverlay(new BMap.Marker(point));  
                //渲染三级覆盖物
                this.renderOverlays(value)
            }
        },
            label);
        // console.log(label);

        // 创建点坐标
        // var point = new BMap.Point(116.404, 39.915);
        // 初始化地图，设置中心点坐标和地图级别     
        // map.centerAndZoom(point, 11);
    }

    //写一个判断 是渲染[一二级(圆形)] 或第三级(方形),及地图缩放级别的方法
    getTypeAndNextZoom = () => {
        let type = 'circle' //圆形覆盖物,适用于第一级和第二级
        let nextZoom = 11  //点击之后的缩放级别

        //获取当前地图的缩放级别
        const currentZoom = this.map.getZoom()


        if (currentZoom > 10 && currentZoom < 12) {
            type = 'circle'
            nextZoom = 13
        } else if (currentZoom > 12 && currentZoom < 14) {
            type = 'circle'
            nextZoom = 15
        } else if (currentZoom > 14) {
            type = 'rect'
        }

        return {
            type,
            nextZoom
        }
    }

    //渲染覆盖物(一共有三级)
    renderOverlays = async (id) => {
        //轻提示
        Toast.loading('正在拼命加载中~', 0)
        const result = await this.$axios.get(`/area/map?id=${id}`)
        console.log(result);
        //数据响应后取消提示
        Toast.hide()

        //调用方法获取 当前的type 和nextZoom
        const { type, nextZoom } = this.getTypeAndNextZoom()

        //渲染覆盖物(要传入渲染[一二级],还是第三级覆盖物,以及地图缩放的级别)
        result.data.body.forEach(item => {
            //根据item生成覆盖物 并添加到地图上
            if (type === 'circle') {
                this.renderCircleOverlays(item, nextZoom)
            } else {
                this.renderRectOverlays(item)
            }
        })
    }

    //添加第一级 第二级 覆盖物
    renderCircleOverlays = (item, nextZoom) => {
        //将获取的经纬度解构出来 
        const { coord: { longitude, latitude }, count, label: name, value } = item
        //覆盖物的中心点 注意区分径度和纬度的前后顺序
        var point = new BMap.Point(longitude, latitude);
        var opts = {
            position: point,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(30, -30)    //设置文本偏移量
        }
        var label = new BMap.Label("", opts);  // 创建文本标注对象
        label.setStyle(labelStyle);

        //在设置覆盖内容时 样式应该写class 不能写className
        label.setContent(`<div class=${styles.bubble}>
             <p class=${styles.name}>${name}</p>
             <p class=${styles.name}>${count}套</p>
         </div>`)

        //给覆盖物 label 添加点击事件
        label.addEventListener('click', () => {
            //清除覆盖物 (注意:要放在异步队列里面,不然会报错)
            setTimeout(() => {
                this.map.clearOverlays()
            }, 0);

            //变换地图的中心点 和缩放级别
            this.map.centerAndZoom(point, nextZoom)

            //调用renderOverlays请求二级覆盖物,并渲染
            this.renderOverlays(value)


        })
        //添加覆盖物
        this.map.addOverlay(label);

    }

    // 添加第三级覆盖物
    renderRectOverlays = (item, nextZoom) => {
        //将获取的经纬度解构出来
        const { coord: { longitude, latitude }, label: name, count, value } = item
        var point = new BMap.Point(longitude, latitude);
        var opts = {
            position: point,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(-50, -20)    //设置文本偏移量
        }
        var label = new BMap.Label("", opts);  // 创建文本标注对象
        label.setStyle(labelStyle); //添加覆盖物的样式
        //添加覆盖物的内容
        label.setContent(`<div class=${styles.rect}>
            <span class=${styles.housename}>${name}</span>
            <span class=${styles.housenum}>${count}</span>
            <i class=${styles.arrow}></i>
        </div>`)
        //给三级覆盖物添加点击事件 
        label.addEventListener('click', e => {
            //将覆盖物移动到可视区的中间位置(调用百度地图的API----panBy(x,y))
            if (e && e.changedTouches) {
                //拿到鼠标点击的位置
                const { clientX, clientY } = e.changedTouches[0]

                //计算移动的像素
                const moveX = window.innerWidth / 2 - clientX
                const moveY = (window.innerHeight - 330 + 45) / 2 - clientY

                //点击的小区移动到 显示区的中心位置
                this.map.panBy(moveX, moveY)
            }

            //发送请求 获取当前点击的小区下面的房源列表
            this.getHouseListById(value)
        })

        //添加覆盖物
        this.map.addOverlay(label);
    }

    //根据小区的id 获取小区的房源信息
    getHouseListById = async id => {
        //轻提示
        Toast.loading('正在拼命加载中~', 0)
        const result = await this.$axios.get(`/houses?cityId=${id}`)
        console.log(result);
        Toast.hide()
        //将获取的数据赋值给模型
        this.setState({
            houseList: result.data.body.list,
            isShow: true
        })

    }

    //渲染房屋列表
    renderHouseList = () => {
        const { houseList, isShow } = this.state 
        return(
            //有多个属性时 使用第三方插件 classNames
            <div className={classNames(styles.houseList,{[styles.show]: isShow})}>
                <div className={styles.titleWrap}>
                    <h1 className={styles.listTitle}>房屋列表</h1>
                    <a href="#/house/list" className={styles.titleMore}>更多房源</a>
                </div>
                <div className={styles.houseItems}>
                    {houseList.map(item => {
                        return <HouseItem key={item.houseCode} {...item}></HouseItem>
                    })}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={styles.map}>
                <NavHeader title='城市地图'></NavHeader>
                <div id='container'></div>
                {this.state.houseList && this.renderHouseList()}
            </div>
        )
    }
}
