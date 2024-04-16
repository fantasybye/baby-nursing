import axios from 'axios';
import { Resume, Share } from '@/types';

const API_HOST = 'https://bops.ayilianmeng.com:456';

function get(path: string, params: Record<string, any>) {
    return axios.get(`${API_HOST}${path}`, { params: { ...params }, withCredentials: true });
}

function post(path: string, params: Record<string, any>) {
    return axios.post(`${API_HOST}${path}`, { ...params },  { withCredentials: true, headers: { 'Content-Type': "application/json" }});
}

export function showEmployee(page: { current: number, pageSize: number}) {
    const { current, pageSize } = page;
    return get(`/employee_show`, {
        offset: current,
        num: pageSize
    })
}

export function editEmployee(body: Resume) {
    return post(`/employee_edit`, {
       ...body
    })
}

export function editEmployeeShare(body: Share) {
    return post(`/employee_share_edit`, {
       ...body
    })
}
export function showEmployeeDetail(body: { id: number, userId: number }) {
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

export function uploadImg(img: string) {
    return post(`/upload_img`, {
        img,
    })
}