import type {Chapter, ChaptersResponse} from "../types";

const apiBase = 'http://localhost:3001/api'; // API base URL, change if server moves

export const FetchParams = {
    pageParam: 1
};

export const fetchChapters = async ({ pageParam }= FetchParams): Promise<ChaptersResponse> => {
    const limit = 5;
    const res = await fetch(`${apiBase}/chapters?page=${pageParam}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch chapters');
    return await res.json();
};

export const fetchSlide = async (slideName: string): Promise<string> => {
   console.log("Fetch Slide " + slideName);
    if (!slideName) throw new Error('No slide name provided');
    const res = await fetch(`/api/slide/${slideName}`);
    console.log(res.text());
    if (!res.ok) throw new Error('File not found');
    return res.text();
};

export const fetchChapter = async ({ id }: { id: string }): Promise<Chapter> => {
    const res = await fetch(`${apiBase}/chapters/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch chapter ${id}`);
    return await res.json();
};

export const toggleRead = async ({ id, read }: { id: number; read: boolean }): Promise<Chapter> => {
    const res = await fetch(`${apiBase}/chapters/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read }),
    });
    if (!res.ok) throw new Error(`Failed to toggle read for chapter ${id}`);
    return await res.json();
};

export const addNote = async ({ id, note }: { id: number; note: string }): Promise<Chapter> => {
    const res = await fetch(`${apiBase}/chapters/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
    });
    if (!res.ok) throw new Error(`Failed to add note for chapter ${id}`);
    return await res.json();
};