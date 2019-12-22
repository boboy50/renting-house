import axios from "axios"

const KEY = 'hkzf_city_key'

//将获取的定位城市保存到本地
export const setCity = city => {
    window.localStorage.setItem(KEY, JSON.stringify(city))
}

//从本地储存获取定位城市
export const getCity = () => {
    return window.localStorage.getItem(KEY)
}

//获取定位城市
const BMap = window.BMap;
export const getLocationCity = () => {
    const city = getCity()
    if (!city) { //如果本地没有之前缓存的城市
        return new Promise((resolve, reject) => {
            //发送请求 百度地图定位API 获取当前的定位城市
            var myCity = new BMap.LocalCity();
            myCity.get(async result => {
                console.log(result.name);
                //再次发送请求给自家服务器,获取完整的城市信息
                const res = await axios.get(`/area/info?name=${result.name}`)
                console.log(res);
                //把获取的完整的城市信息,保存到本地
                setCity(res.data.body)
                //resolve 把结果传递给调用者
                resolve(res.data.body)
            });
        })
    } else { //如果有则返回给到 CityList 里面的getLocationCity
        //简化写法,创建一个promise对象,里面通过resolve把正确的结果传递出去 
        return Promise.resolve(JSON.parse(city))
    }
}