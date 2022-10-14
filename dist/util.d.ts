export declare const isNegativeNumber: (n: number) => boolean;
export declare const isExactNumber: (n1: number) => (n2: number) => boolean;
export declare const isString: (s: unknown) => s is string;
export declare const isNonEmptyString: (s: unknown) => boolean;
export declare const isExactString: (s1: string) => (s2: string) => boolean;
export declare const isObject: (input: unknown) => input is Record<PropertyKey, unknown>;
export declare const hasProperty: <T extends Record<PropertyKey, unknown>>(input: T) => (key: keyof T) => boolean;
