import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mock fetch to simulate server responses
global.fetch = vi.fn();

const mockChs = [
    { id: 1, title: 'Clean Code', notes: [] },
    { id: 2, title: 'Meaningful Names', notes: [] }
];

const setupFetchMock = () => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: mockChs,
                total: mockChs.length
            })
        } as Response)
    );
};

describe('main entrypoint', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders without crashing', async () => {
        setupFetchMock();
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Clean Code Reading Tracker')).toBeInTheDocument();
            expect(screen.getByText('Chapters')).toBeInTheDocument();
            expect(screen.getByText('Clean Code')).toBeInTheDocument();
            expect(screen.getByText('Meaningful Names')).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});

