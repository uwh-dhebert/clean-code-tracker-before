import { useQuery } from '@tanstack/react-query';
import { fetchSlide } from '../api/chapters';

export function useSlideContent(slideName?: string) {
    return useQuery({
        queryKey: ['slide', slideName],
        queryFn: () => {
            console.log('useSlideContent ' + slideName);
            if (!slideName) throw new Error('No slide name provided');
            return fetchSlide(slideName);
        },
        enabled: !!slideName,
    });
}