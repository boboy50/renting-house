import React, { Component } from 'react'
import styles from './index.module.scss'
import { BASEURL } from '../../utils/url'

import { Carousel } from 'antd-mobile';
export default class Home extends Component {
    constructor(props) {
        super()

        this.state = {
            swipes: null //轮播图

        }
    }

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
    render() {
        return (
            <div className={styles.root}>
                {/* 渲染轮播图 */}
                {this.state.swipes && this.renderSwipes()}
            </div>
        )
    }
}
