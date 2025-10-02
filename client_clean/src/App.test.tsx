import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockChapters = [
    { id: 1, title: 'Chap 1', summary: 'Sum 1', details: 'Det 1', cliffnotes: ['Note 1'], read: false, notes: [] },
    { id: 2, title: 'Chap 2', summary: 'Sum 2', details: 'Det 2', cliffnotes: ['Note 2'], read: true, notes: ['A note'] },
];

const mockSingleChapter = { ...mockChapters[0], notes: ['First note'] };

beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn((url, opts) => {
        if (url.includes('/chapters?page=')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: mockChapters, total: 2 }),
            });
        }
        if (url.endsWith('/chapters/1')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockSingleChapter),
            });
        }
        if (url.endsWith('/chapters/1/notes')) {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ ...mockSingleChapter, notes: ['First note', 'New note'] }),
            });
        }
        if (url.endsWith('/chapters/1') && opts?.method === 'PATCH') {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ ...mockSingleChapter, read: !mockSingleChapter.read }),
            });
        }
        return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
    }) as any;
});

describe('App', () => {
    it('renders loading then chapter list', async () => {
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        expect(screen.getByText(/Loading/)).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText(/Chapters/)).toBeInTheDocument());
        expect(screen.getByText('Chap 1')).toBeInTheDocument();
        expect(screen.getByText('Chap 2')).toBeInTheDocument();
    });

    it('shows error if fetch fails', async () => {
        (global.fetch as any).mockImplementationOnce(() => Promise.resolve({ ok: false }));
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText(/Error/)).toBeInTheDocument());
    });

    it('toggles read status', async () => {
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText('Chap 1'));
        const switches = screen.getAllByRole('switch');
        fireEvent.click(switches[0]);
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/chapters/1'), expect.objectContaining({ method: 'PATCH' })));
    });

    it('adds a note', async () => {
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText('Chap 1'));
        const viewDetailsLinks = screen.getAllByText(/View Details/);
        fireEvent.click(viewDetailsLinks[0]);
        await waitFor(() => screen.getByText(/Details/));
        const input = screen.getByLabelText(/Add note/);
        fireEvent.change(input, { target: { value: 'New note' } });
        fireEvent.click(screen.getByText('Add Note'));
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/chapters/1/notes'), expect.objectContaining({ method: 'POST' })));
    });

    it('renders chapter detail and navigates back', async () => {
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText('Chap 1'));
        const viewDetailsLinks = screen.getAllByText(/View Details/);
        fireEvent.click(viewDetailsLinks[0]);
        await waitFor(() => screen.getByText(/Details/));
        expect(screen.getByText('Det 1')).toBeInTheDocument();
        fireEvent.click(screen.getByText(/Back to List/));
        await waitFor(() => screen.getByText('Chapters'));
    });

    it('calls onToggleRead with correct arguments', async () => {
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText('Chap 1'));
        const switches = screen.getAllByRole('switch');
        fireEvent.click(switches[0]);
        await waitFor(() =>
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/chapters/1'),
                expect.objectContaining({ method: 'PATCH' })
            )
        );
    });

    it('triggers infinite scroll and loads more chapters', async () => {
        let pageCalled = 1;
        (global.fetch as any).mockImplementation((url: string) => {
            if (url.includes('/chapters?page=')) {
                const pageMatch = url.match(/page=(\d+)/);
                pageCalled = pageMatch ? Number(pageMatch[1]) : 1;
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        data: mockChapters,
                        total: 10,
                    }),
                });
            }
            return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
        });
        const queryClient = new QueryClient();
        render(
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </MemoryRouter>
        );
        await waitFor(() => screen.getByText('Chap 1'));
        Object.defineProperty(document.documentElement, 'scrollTop', { value: 1000, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
        Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1900, writable: true });
        fireEvent.scroll(window);
        await waitFor(() => {
            expect(pageCalled).toBeGreaterThan(1);
        });
    });
});
