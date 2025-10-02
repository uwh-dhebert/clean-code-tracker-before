import React from 'react';
import { Typography } from '@mui/material';
import { ChapterItemList } from '../components/ChapterItemList.tsx';
import type {Chapter} from '../types';

interface ChapterListPageProps {
    chapters: Chapter[];
    progress: number;
    toggleRead: (id: number, read: boolean) => void;
    addNote: (id: number, note: string) => void;
    isFetchingNextPage: boolean;
}

export const ChapterListPage: React.FC<ChapterListPageProps> = ({ chapters, progress, toggleRead, isFetchingNextPage }) => (
    <div className="space-y-4">
        <Typography variant="h5" className="bg-gray-100 p-1">Chapters</Typography>
        {chapters.map(chapter => (
            <ChapterItemList
                key={chapter.id}
                chapter={chapter}
                progress={progress}
                toggleRead={toggleRead}
            />
        ))}
        {isFetchingNextPage && <Typography>Loading more...</Typography>}
    </div>
);