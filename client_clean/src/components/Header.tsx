import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Link as MuiLink } from '@mui/material';

interface HeaderProps {
    progress: number;
    total?: number;
}

export const Header: React.FC<HeaderProps> = ({ progress, total = 17 }) => (
    <div className="header">
        <Typography variant="h4" className="font-bold">Clean Code Reading Tracker - Refactored</Typography>
        <Typography>Progress: {progress}/{total} chapters read</Typography>
        <MuiLink component={Link} to="/" className="text-blue-500">Back to List</MuiLink>
    </div>
);
