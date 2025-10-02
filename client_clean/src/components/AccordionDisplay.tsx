import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionDisplayProps {
    title?: string;
    content: string[];
}

export const AccordionDisplay: React.FC<AccordionDisplayProps> = ({title, content }) => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {content.map((note, i) => (
                    <ListItem key={i}>
                        <ListItemText primary={note} />
                    </ListItem>
                ))}
            </List>
        </AccordionDetails>
    </Accordion>
);