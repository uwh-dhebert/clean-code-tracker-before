import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ChapterListPage } from './pages/ChapterListPage';
import { ChapterDetailPage } from './pages/ChapterDetailPage';
import { SlideDeckDisplay } from './pages/SlideDeckDisplay.tsx';

import { useChapters } from './hooks/useChapters';
import './App.css';

function App() {
    const { chapters, progress, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, toggleRead, addNote, error } = useChapters();

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {(error as Error).message}</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 clean_code_background">
            <Header progress={progress} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ChapterListPage
                            chapters={chapters}
                            progress={progress}
                            toggleRead={toggleRead}
                            addNote={addNote}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    }
                />
                <Route
                    path="/chapter/:id"
                    element={
                        <ChapterDetailPage
                            progress={progress}
                            toggleRead={toggleRead}
                            addNote={addNote}
                        />
                    }
                />
                <Route
                    path="/slide/:slideName"
                    element={
                        <SlideDeckDisplay
                            progress={progress}
                            toggleRead={toggleRead}
                            addNote={addNote}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
