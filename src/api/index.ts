const API_HOST = 'http://47.99.161.231:3000';

import axios from 'axios';

function get(path: string, params: Record<string, any>) {
    return axios.get(`${API_HOST}${path}`, { params: { ...params }, withCredentials: true });
}

function post(path: string, params: Record<string, any>) {
    return axios.post(`${API_HOST}${path}`, { data: { ...params }, withCredentials: true });
}

export function showEmployee(page: { current: number, pageSize: number}) {
    const { current, pageSize } = page;
    return get(`/employee_show`, {
        offset: current,
        num: pageSize
    })
}

export function showEmployeeDetail(body: { id: number}) {
    return get(`/employee_detail`, {
       ...body
    })
}

export function showEmployeeShare(page: { current: number, pageSize: number}) {
    const { current, pageSize } = page;
    return get(`/employee_share_show`, {
        offset: current,
        num: pageSize
    })
}


export function showShare(page: { current: number, pageSize: number}) {
    const { current, pageSize } = page;
    return get(`/employee_share`, {
        offset: current,
        num: pageSize
    })
}

export function login(params: { user_name: string, password: string}) {
    return get(`/user/admin_login`, {
        ...params
    })
}

export const picUploadAction = `${API_HOST}/upload_img`