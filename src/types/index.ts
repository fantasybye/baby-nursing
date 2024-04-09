export interface AuthItem {
    authId: string;
    email: string;
}

export interface ModalRef<T> {
    show: (record?: T) => void;
}

export enum ShareStatus {
    Pass = 0,
    Fail = 1,
    Wait = 2
}

export enum ResumeStatus {
    Valid = 0,
    Invalid = 1
}

export interface Resume {
    // 个人信息
    ID: string,
    name: string,
    phone: string,
    wx: string,
    wx_uri: string,
    birth_day: string,
    height: number,
    tdu: string,
    nation: string,
    birthplace: string,
    // 简历信息
    employee_type: string,
    work_type: string,
    work_years: number,
    work_count: number,
    work_city: string[],
    work_exp: string,
    introduction: string,
    home: string,
    domain: string,
    character: string[],
    tag: string[],
    salary: number,
    intent: string,
    // 图片信息
    head: string,
    id_card: string,
    qualifications: string[],
    reviews: string[],
    recommend: string[],
    manual_order: number,
    status: ResumeStatus
}

export interface Share {
    ID: number,
    user_id: number;
    name: string;
    phone: string;
    status: ShareStatus
    employee_id: string;
    cv_name: string;
    cv: string;
    reason: string;
}