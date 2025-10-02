import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Switch } from '@mui/material';
import type {Chapter} from '../types';

interface ChapterItemListProps {
    chapter: Chapter;
    progress: number;
    toggleRead: (id: number, read: boolean) => void;
}

export const ChapterItemList: React.FC<ChapterItemListProps> = ({ chapter, progress, toggleRead }) => (
    <div className="chapter-card">
        <Typography variant="h6">{chapter.title}</Typography>
        <Typography className="mb-2">{chapter.summary}</Typography>
        <div className="flex items-center gap-2 my-2">
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
        <Typography variant="body2" className="mt-2">Notes: {chapter.notes.length}</Typography>
        <Link to={`/chapter/${chapter.id}`} className="text-blue-500">View Details</Link>
    </div>
);