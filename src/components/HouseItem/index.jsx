import React from 'react'

import styles from './index.module.scss'

import classNames from 'classnames'

import { BASEURL } from '../../utils/url'
function HouseItem({ houseCode, desc, houseImg, price, tags, title }) {
    return (
        <div className={styles.house}>
            <div className={styles.imgWrap}>
                <img className={styles.img} src={`${BASEURL}${houseImg}`} alt="" />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.desc}>{desc}</div>
                <div>
                  {
                      tags.map((item,index) => {
                          const tagName = `tag${(index % 3) + 1}`
                          return(
                          <span className={classNames(styles.tag,styles[tagName])} key={item}>{item}</span>
                          )
                      })
                  }
                </div>
                <div className={styles.price}>
                    <span className={styles.priceNum}>{price} 元/月</span>
                </div>
            </div>
        </div>
    )
}

export default HouseItem