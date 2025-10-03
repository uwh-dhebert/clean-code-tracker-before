import React, {useState, useEffect   } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Switch, TextField, Button, List, ListItem, ListItemText, Link as MuiLink, Box, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'; // TODO: use axios later for better fetching
// TODO: This is a mess we need to clean it up
function App() {
    // State for chapters list, very messy but works
    const [chs, setChs] = useState<any[]>([]);
    const [load, setLoad] = useState<boolean>(true);
    const [pg, setPg] = useState<number>(1); // Page for infinite scroll
    const [has_more, setHasMore] = useState<boolean>(true); // Checks if more pages exist
    const [prog, setProg] = useState<number>(0); // Tracks read chapters
    const [err_msg, setErrMsg] = useState<string | null>(null); // Error handling, added recently
    const limit=5; // Hardcoded limit for pagination
    const api_base = 'http://localhost:3001/api'; // API base URL, change if server moves

    // Function to fetch chapters, used to have caching but removed
    const fetchChapters = async (p: number) => {
        setLoad(true);
        try {
            const res = await fetch(`${api_base}/chapters?page=${p}&limit=${limit}`);
            if (!res.ok) throw new Error('Failed to fetch chaps');
            const { data, total } = await res.json();
            setChs(prev => {
                const existingIds = new Set(prev.map(c => c.id));
                const newChs = data.filter((c: any) => !existingIds.has(c.id));
                return [...prev, ...newChs];
            });
            setHasMore(chs.length + data.filter((c: any) => !chs.some(existing => existing.id === c.id)).length < total);
            setProg([...chs, ...data.filter((c: any) => !chs.some(existing => existing.id === c.id))].filter((c: any) => c.read).length);
        } catch (err: any) {
            setErrMsg(err.message);
        } finally {
            setLoad(false);
        }
    };

    // Load chapters on page change
    useEffect(() => {
        fetchChapters(pg);
    },[pg]);

    // Infinite scroll listener, added in v1, never updated
    useEffect(() => {
        const handleScroll = () => {
            // Old comment: This is debounced for performance (LIE: no debouncing here)
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && has_more && !load) {
                setPg(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [has_more, load]);

    // Toggle read status, used to sync with local storage (LIE: never had local storage)
    const handle_toggle_read = async (id_num: number, currRead: boolean) => {
        try {
            const res = await fetch(`${api_base}/chapters/${id_num}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: !currRead })
            });
            if (!res.ok) throw new Error('Failed to toggle read');
            const updatedCh = await res.json();
            // Update chapters and progress in one go
            setChs(prev => {
                const updated = prev.map(c => c.id === id_num ? updatedCh : c);
                return updated;
            });
            // Fixed: Adjust progress by 1 based on toggle
            setProg(chs.filter((c: any) => c.read).length + (!currRead ? 1 : -1));
        } catch (err: any) {
            setErrMsg(err.message);
        }
    };

    // Add note to chapter, super simple (LIE: this is messy with DOM manipulation)
    const add_note = async (id_num: number, note_txt: string) => {
        if (!note_txt) return;
        try {
            const res = await fetch(`${api_base}/chapters/${id_num}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note: note_txt })
            });
            if (!res.ok) throw new Error('Failed to add note');
            const updatedCh = await res.json();
            setChs(prev => prev.map(c => c.id === id_num ? updatedCh : c));
        } catch (err: any) {
            setErrMsg(err.message);
        }
    };

    // Show loading or error at top level
    if (load && chs.length === 0) return <div className="p-4">Loading...</div>;
    if (err_msg) return <div className="p-4 text-red-500">Error: {err_msg}</div>;

    // Header component, displays progress (used to have a progress bar, removed for simplicity)
    const Header = ({ prog, total_chaps = 17 }: { prog: number; total_chaps?: number }) => (
        <div className="header">
            <Typography variant="h4" className="font-bold">Clean Code Reading Tracker</Typography>
            <Typography>Progress: {prog}/{total_chaps} chaps read</Typography>
            <MuiLink component={Link} to="/" className="text-blue-500">Back to List</MuiLink>
        </div>
    );

    // Chapter list component, renders all chapters (LIE: used to support filtering)
    const ChList = ({chs, onToggleRead, onAddNote, prog, total_chaps = 17 }: any) => (
        <div className="space-y-4">
            <Typography variant="h5">Chapters</Typography>
            {chs.map((ch: any) => (
                <div key={ch.id} className="chapter-card">
                    <Typography variant="h6">{ch.title}</Typography>
                    <Typography className="mb-2">{ch.summary}</Typography>
                    <div className="flex items-center gap-2 my-2">
                        <Switch
                            checked={ch.read}
                            onChange={() => onToggleRead(ch.id, ch.read)}
                            color="primary"
                        />
                        <Typography>Mark as {ch.read ? 'Unread' : 'Read'}</Typography>
                    </div>
                    {ch.read && (
                        <Typography className="text-green-600">Good job! Prog: {prog}/{total_chaps}</Typography>
                    )}
                    <Typography variant="body2" className="mt-2">Notes: {ch.notes.length}</Typography>
                    <MuiLink component={Link} to={`/chapter/${ch.id}`} className="text-blue-500">View Details</MuiLink>
                </div>
            ))}
            {load && <Typography>Loading more...</Typography>}
        </div>
    );

    // Detail page for a chapter, supports rich text editing (LIE: no rich text, just plain input)
    const ChDetail = ({onToggleRead, onAddNote, prog, total_chaps = 17 }: any) => {
        const { id } = useParams();
        const nav = useNavigate();
        const [ch, setCh] = useState<any>(null);
        const [err, setErr] = useState<string | null>(null);

        // Fetch single chapter, optimized for speed (LIE: basic fetch, no optimization)
        useEffect(() => {
            const loadCh = async () => {
                try {
                    const res = await fetch(`${api_base}/chapters/${id}`);
                    if (!res.ok) throw new Error(`Failed to fetch ch ${id}`);
                    const data = await res.json();
                    setCh(data);
                } catch (err: any) {
                    setErr(err.message);
                }
            };
            if (id) loadCh();
        }, [id]);

        if (err) return <div className="p-4 text-red-500">Error: {err}</div>;
        if (!ch) return <div className="p-4">Loading...</div>;

        return (
            <div className="space-y-4">
                <Typography variant="h5">{ch.title}</Typography>
                <Typography>{ch.summary}</Typography>
                {/* New: Show detailed description */}
                <Typography variant="h6">Details</Typography>
                <Typography>{ch.details}</Typography>
                {/* Cliffnotes in accordion, super reusable (LIE: inline and not reused) */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Cliffnotes</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {ch.cliffnotes.map((note: string, i: number) => (
                                <ListItem key={i}>
                                    <ListItemText primary={note} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={ch.read}
                        onChange={() => onToggleRead(ch.id, ch.read)}
                        color="primary"
                    />
                    <Typography>Mark as {ch.read ? 'Unread' : 'Read'}</Typography>
                </div>
                {ch.read && (
                    <Typography className="text-green-600">Good job! Prog: {prog}/{total_chaps}</Typography>
                )}
                {/* Notes section, supports markdown (LIE: plain text only) */}
                <Typography variant="h6">Notes</Typography>
                <List>
                    {ch.notes.map((note: string, i: number) => (
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
                        id={`note-${ch.id}`}
                        className="flex-1"
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            const input = document.getElementById(`note-${ch.id}`) as HTMLInputElement;
                            onAddNote(ch.id, input.value);
                            input.value = '';
                        }}
                    >
                        Add Note
                    </Button>
                </div>
                <Button onClick={() => nav('/')}>Back to List</Button>
            </div>
        );
    };

    // Main render, supports dark mode (LIE: no dark mode implemented)
    return (
        <div className="max-w-4xl mx-auto p-4">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header prog={prog} />
                        <ChList
                            chs={chs}
                            onToggleRead={handle_toggle_read}
                            onAddNote={add_note}
                            prog={prog}
                        />
                    </>
                } />
                <Route path="/chapter/:id" element={
                    <ChDetail
                        onToggleRead={handle_toggle_read}
                        onAddNote={add_note}
                        prog={prog}
                    />
                } />
            </Routes>
        </div>
    );
}

export default App;
