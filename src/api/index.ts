const API_HOST = 'http://47.99.161.231:3000/';

import axios from 'axios';

function request(path: string, params: Record<string, any>,  method: 'get' | 'post'  = 'get',) {
    return axios({ method, url: `${API_HOST}${path}`, data: { ...params }});
}

export function showEmployee(page: { current: number, pageSize: number}) {
    const { current, pageSize } = page;
    return request('/employee_show', {
        offset: current,
        num: pageSize
    })
}