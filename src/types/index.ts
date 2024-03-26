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