export declare function required(value: any): boolean;

export declare function min(value: any, payload: number): boolean;

export declare function minLength(value: any, payload: number): boolean;

export declare function max(value: any, payload: number): boolean;

export declare function maxLength(value: any, payload: number): boolean;

export declare function email(value: any): boolean;

export declare function phone(value: any): boolean;

export declare function repeatPassword(value: any, payload?: string): boolean;

export declare function url(value: any): boolean;

export declare function customRegex(value: any, regex: RegExp): boolean;
