import { useNavigate, useParams } from 'react-router-dom';
import {useSlideContent} from "../hooks/useSlideHooks.ts";
import ReactMarkdown from 'react-markdown';
import {grey} from "@mui/material/colors";
import "../styles/SlideDeckDisplay.css"

export const SlideDeckDisplay: React.FC = () => {
    const { slideName } = useParams<{ slideName: string }>();

    console.log(slideName);
    const { data: content, error, isLoading } = useSlideContent(slideName);
    const navigate = useNavigate();


    return (
        <div style={{ background: grey[100], padding: 24 }}>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{slideName}</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{(error as Error).message}</div>
            ) : (
                <pre style={{ whiteSpace: 'pre-wrap' }}><ReactMarkdown>{content ?? ''}</ReactMarkdown></pre>
            )}
        </div>
    );
};