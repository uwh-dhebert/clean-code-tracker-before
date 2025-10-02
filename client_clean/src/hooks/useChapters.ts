import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchChapters, toggleRead, addNote } from '../api/chapters';
import type {Chapter, ChaptersResponse} from '../types';

export const useChapters = () => {
    const queryClient = useQueryClient();

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, error } = useInfiniteQuery<ChaptersResponse>({
        queryKey: ['chapters'],
        queryFn: fetchChapters,
        getNextPageParam: (lastPage, allPages) => lastPage.data.length > 0 ? allPages.length + 1 : undefined,
        select: (data) => ({
            pages: data?.pages.flatMap(page => page.data) as Chapter[],
            pageParams: data.pageParams,
        }),
    });

    const toggleMutation = useMutation({
        mutationFn: toggleRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapters'] });
            queryClient.invalidateQueries({ queryKey: ['chapter'] });
        },
    });

    const noteMutation = useMutation({
        mutationFn: addNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapters'] });
            queryClient.invalidateQueries({ queryKey: ['chapter'] });
        },
    });

    return {
        chapters: data?.pages || [],
        progress: data?.pages.flatMap(page => page).filter(c => c.read).length || 0,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        toggleRead: (id: number, read: boolean) => toggleMutation.mutate({ id, read }),
        addNote: (id: number, note: string) => noteMutation.mutate({ id, note }),
        error,
    };
};