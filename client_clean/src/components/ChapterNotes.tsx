import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

interface ChapterNotesProps {
    notes: string[];
    onAddNote: (note: string) => void;
}

export const ChapterNotes: React.FC<ChapterNotesProps> = ({ notes, onAddNote }) => {
    const [newNote, setNewNote] = useState<string>('');

    return (
        <div className="space-y-2">
            <Typography variant="h6">Notes</Typography>
            <List>
                {notes.map((note, i) => (
                    <ListItem key={i}>
                        <ListItemText primary={note} />
                    </ListItem>
                ))}
            </List>
            <div className="flex gap-2">
                <TextField
                    label="Add note"
                    variant="outlined"
                    size="small"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1"
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        if (newNote) {
                            onAddNote(newNote);
                            setNewNote('');
                        }
                    }}
                >
                    Add Note
                </Button>
            </div>
        </div>
    );
};