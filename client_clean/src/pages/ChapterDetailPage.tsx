import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Typography, Button, Switch } from '@mui/material';
import { fetchChapter } from '../api/chapters.ts';
import {AccordionDisplay} from '../components/AccordionDisplay.tsx';
import { ChapterNotes } from '../components/ChapterNotes.tsx';
import type {Chapter} from '../types';

interface ChapterDetailPageProps {
    progress: number;
    toggleRead: (id: number, read: boolean) => void;
    addNote: (id: number, note: string) => void;
}

export const ChapterDetailPage: React.FC<ChapterDetailPageProps> = ({ progress, toggleRead, addNote }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: chapter, isLoading, error } = useQuery<Chapter>({
        queryKey: ['chapter', id],
        queryFn: () => fetchChapter({ id: id! }),
        enabled: !!id,
    });

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {(error as Error).message}</div>;
    if (!chapter) return <div className="p-4">Chapter not found</div>;

    return (
        <div className="space-y-4 chapter-card" >
            <Typography variant="h5">{chapter.title}</Typography>
            <Typography>{chapter.summary}</Typography>
            <div className="flex items-center gap-2">
                <Switch
                    checked={chapter.read}
                    onChange={() => toggleRead(chapter.id, !chapter.read)}
                    color="primary"
                />
                <Typography>Mark as {chapter.read ? 'Unread' : 'Read'}</Typography>
            </div>
            {chapter.read && (
                <Typography className="text-green-600">Good job! Progress: {progress}/17</Typography>
            )}
            <ChapterNotes notes={chapter.notes} onAddNote={(note) => addNote(chapter.id, note)} />
            <AccordionDisplay title="Cliff Notes" content={chapter.cliffnotes} />
            <AccordionDisplay title="Details" content={ [chapter.details]} />
            <Button onClick={() => navigate('/')}>Back to List</Button>
        </div>
    );
};