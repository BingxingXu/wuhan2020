export interface Banner {
    id: number;
    created_at: Date;
    updated_at: Date;
    url: Image;
}

export interface Image {
    id: number;
    name: string;
    hash: string;
    sha256: string;
    url: string;
}