export type F1TimestampSet = {
    UTCTime: string;
    ISTTime: string;
    CESTTime: string;
};

export type F1Meta = {
    Message: string;
    RetVal: number;
    Success: boolean;
    Timestamp: F1TimestampSet;
    StatusCode: number;
    Maintenance: string;
};
