export interface AuthItem {
    authId: string;
    email: string;
}

export interface ModalRef<T> {
    show: (record?: T) => void;
}

export enum ShareStatus {
    Pass = 1,
    Fail = 2,
    Wait = 0
}

export enum ResumeStatus {
    Valid = 1,
    Invalid = 2
}

export interface Resume {
    // 个人信息
    ID: number,
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
    employee_id: number;
    cv_name: string;
    cv: string;
    reason: string;
}