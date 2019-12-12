import React, { Component } from 'react'
//导入样式
import styles from './index.module.scss'
//导入基地址
import { BASEURL } from '../../utils/url'
//导入ui组件
import { Carousel, Flex } from 'antd-mobile';
//导入路由
import {Link} from 'react-router-dom'

//导入本地图片
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'

export default class Home extends Component {
    constructor(props) {
        super()

        this.state = {
            swipes: null, //轮播图
            imgHeight: 212

        }
    }

    //导航菜单 数据
    navs = [
        { icon: image1, text: '整租', path: '/layout/house' },
        { icon: image2, text: '合租', path: '/layout/house' },
        { icon: image3, text: '地图找房', path: '/map' },
        { icon: image4, text: '去出租', path: '/rent/add' }
    ]

    componentDidMount() {
        //获取轮播图
        this.getSwiperData()
    }

    getSwiperData = async () => {
        const result = await this.$axios.get('/home/swiper')
        console.log(result.data.body);

        this.setState({
            swipes: result.data.body

        })

    }
    //渲染轮播图
    renderSwipes = () => {
        return (
            <Carousel autoplay infinite className={styles.swiper}>
                {this.state.swipes.map(item => (
                    <a
                        key={item.id}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                            src={`${BASEURL}${item.imgSrc} `}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }

    //渲染导航菜单
    renderNave = () => {
        return (
            <div className={styles.nav}>
                <Flex>
                    {
                        this.navs.map(item => {
                            return (
                                <Flex.Item key={item.text}>
                                    <Link to={item.path}>
                                    <img src={item.icon} alt="" />
                                    <p>{item.text}</p>
                                    </Link>
                                </Flex.Item>
                            )
                        })
                    }
                </Flex>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.root}>
                {/* 渲染轮播图 */}
                {this.state.swipes && this.renderSwipes()}
                {/* 渲染导航菜单 */}
                {this.renderNave()}
            </div>
        )
    }
}
