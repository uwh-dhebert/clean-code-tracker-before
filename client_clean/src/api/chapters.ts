import type {Chapter, ChaptersResponse} from "../types";

const apiBase = 'http://localhost:3001/api'; // API base URL, change if server moves

export const FetchParams = {
    pageParam: 1,
    limit: 5
}

export const fetchChapters = async ({ pageParam, limit }= FetchParams): Promise<ChaptersResponse> => {
    const res = await fetch(`${apiBase}/chapters?page=${pageParam}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch chapters');
    return await res.json();
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