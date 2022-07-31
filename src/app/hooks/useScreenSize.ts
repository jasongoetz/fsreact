import {useMediaQuery} from "react-responsive";

interface UseScreenSizeInterface {
    isMobile: boolean;
    isLargeMobile: boolean;
}

export const useScreenSize = (): UseScreenSizeInterface => {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const isLargeMobile = useMediaQuery({ query: '(max-width: 992px)' });
    return {
        isMobile,
        isLargeMobile
    };
}
