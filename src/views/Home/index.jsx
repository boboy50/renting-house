import React, { Component } from 'react'
//导入样式
import styles from './index.module.scss'
//导入基地址
import { BASEURL } from '../../utils/url'
//导入ui组件
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
//导入路由
import { Link } from 'react-router-dom'
//导入头部搜索
import SearchHeader from '../../components/SearchHeader'
//导入定位城市
import {getLocationCity} from '../../utils/city'

//导入本地图片
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'

export default class Home extends Component {
 constructor(props) {
        super()
        this.state = {
            swiper: null, //轮播图
            imgHeight: 212, //轮播图固定高度
            groups: null,  //租房组数据
            news: null, // 最新咨询
            cityName: ''
        }
    }

    //导航菜单 数据
    navs = [
        { icon: image1, text: '整租', path: '/layout/house' },
        { icon: image2, text: '合租', path: '/layout/house' },
        { icon: image3, text: '地图找房', path: '/map' },
        { icon: image4, text: '去出租', path: '/rent/add' }
    ]

   async componentDidMount() {
        //获取定位城市
        const {label} = await getLocationCity()
        this.setState({
            cityName: label
        })
        //获取轮播图
        this.getSwipersData()
        //获取租房数据
        this.getGroupsData()
        // 获取最新咨询数据
        this.getNewsData()
    }

    //---------------------发送请求获取数据-----------------------------------------------
    //1.获取轮播图数据
    getSwipersData = async () => {
        const result = await this.$axios.get('/home/swiper')
        // console.log(result.data.body);
        this.setState({
            swiper: result.data.body
        })
    }

    //获取租房数据
    getGroupsData = async () => {
        const result = await this.$axios.get('/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
       
        this.setState({
            groups: result.data.body
        })

    }

    //获取咨询数据
    getNewsData = async () => {
        const result = await this.$axios.get('/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
        // console.log(result.data.body,'-----------------');
        this.setState({
            news: result.data.body
        })
    }

    //------------------------渲染---------------------------------------------------------
    //渲染轮播图
    renderSwipers = () => {
        return (
            <Carousel autoplay infinite className={styles.swiper}>
                {this.state.swiper.map(item => (
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

    //渲染租房小组数据
    renderGroups = () => {
        return (
            <div className={styles.groups}>
                <Flex>
                    <Flex.Item className={styles.title}>租房小组</Flex.Item>
                    <Flex.Item align="end">更多</Flex.Item>
                </Flex>
                <Grid data={this.state.groups}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={dataItem => {
                        return (
                            <div key={dataItem.id} className={styles.navItem} >
                                <div className={styles.left}>
                                    <p>{dataItem.title}</p>
                                    <p>{dataItem.desc}</p>
                                </div>

                                <div className={styles.right}>
                                    <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                                </div>
                            </div>
                        )
                    }}
                />
            </div>
        )
    }

    //渲染咨询数据
    renderNews = () => {
        return (
            <div className={styles.news}>
                <h3 className={styles.groupTitle}>最新咨询</h3>
                {this.state.news.map(item => {
                    return (
                        <WingBlank className={styles.newsItem} size="md" key={item.id}>
                            <div className={styles.imgWrap}>
                                <img src={`${BASEURL}${item.imgSrc}`} alt="" />
                            </div>
                            <Flex
                                className={styles.content}
                                direction="column"
                                justify="between"
                            >
                                <h3 className={styles.title}>{item.title}</h3>
                                <Flex className={styles.info} direction="row" justify="between">
                                    <span>{item.from}</span>
                                    <span>{item.date}</span>
                                </Flex>
                            </Flex>
                        </WingBlank>
                    )
                })}
            </div>
        )
    }

    render() {
        //解构
        const { swiper, groups, news } = this.state
        return (
            <div className={styles.root}>
                {/* 渲染头部搜索 */}
                <SearchHeader cityName={this.state.cityName}></SearchHeader>
                {/* 渲染轮播图  注意有数据时才渲染*/}
                {swiper && this.renderSwipers()}
                {/* 渲染导航菜单 */}
                {this.renderNave()}
                {/* 渲染租房小组 */}
                {groups && this.renderGroups()}
                {/* 渲染最新咨询 */}
                {news && this.renderNews()}
            </div>
        )
    }
}
