export interface Chapter {
    id: number;
    title: string;
    summary: string;
    cliffnotes: string[];
    read: boolean;
    notes: string[];
    details: string;
}

export interface ChaptersResponse {
    data: Chapter[];
    total: number;
}