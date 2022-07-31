import {useLocation} from "react-router-dom";

export const useQueryParam = (param: string): string | null => {
    const location = useLocation();
    const useQuery = () => {
        return new URLSearchParams(location.search);
    }
    const query = useQuery();
    let paramValue = query.get(param);
    return paramValue;
}
