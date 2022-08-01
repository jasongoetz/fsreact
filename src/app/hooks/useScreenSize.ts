import {useMediaQuery} from "react-responsive";

interface UseScreenSizeInterface {
    isXSmall: boolean;
    isSmall: boolean;
    isMedium: boolean;
    isLarge: boolean;
    isXLarge: boolean;
    isXXLarge: boolean;
    isMobile: boolean;
    isLargeMobile: boolean;
}

export function useScreenSize(): UseScreenSizeInterface {
    const isXSmall = useMediaQuery({ query: '(max-width: 576px)' });
    const isSmall = useMediaQuery({ query: '(max-width: 767px)' });
    const isMedium = useMediaQuery({ query: '(max-width: 991px)' });
    const isLarge = useMediaQuery({ query: '(max-width: 1199px)' });
    const isXLarge = useMediaQuery({ query: '(max-width: 1399px)' });
    const isXXLarge = useMediaQuery({ query: '(min-width: 1400px)' });

    return {
        isXSmall,
        isSmall,
        isMedium,
        isLarge,
        isXLarge,
        isXXLarge,
        isMobile: isSmall,
        isLargeMobile: isMedium,
    }
}

