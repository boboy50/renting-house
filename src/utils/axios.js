import axios from 'axios';
import { Component } from 'react';
import { BASEURL } from './url'

//设置基准地址
axios.defaults.baseURL = BASEURL

Component.prototype.$axios = axios