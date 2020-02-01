export interface Banner {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    url: string;
}

export interface CountTotal {
    confirmCount: number;
    suspectCount: number;
    deadCount: number;
    cure: number;
    updateTime: Date;
    recentTime: Date;
}