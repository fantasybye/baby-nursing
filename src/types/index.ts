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
    Name: string,
    Phone: string,
    Wx: string,
    WxUri: string,
    BirthDay: string,
    Height: number,
    Edu: string,
    Nation: string,
    Birthplace: string,
    // 简历信息
    EmployeeType: string,
    WorkType: string,
    WorkYears: number,
    WorkCount: number,
    WorkCity: string[],
    WorkExp: string,
    Introduction: string,
    Home: string,
    Domain: string,
    Character: string[],
    Tag: string[],
    Salary: number,
    Intent: string,
    // 图片信息
    Head: string,
    IDCard: string,
    Qualifications: string[],
    Reviews: string[],
    Recommend: string[],
    ManualOrder: number,
    Status: ResumeStatus
}

export interface Share {
    ID: number,
    UserId: number;
    Name: string;
    Phone: string;
    Status: ShareStatus
    EmployeeId: string;
    CvName: string;
    Cv: string;
    Reason: string;
}