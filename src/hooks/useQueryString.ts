import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObject: {
    page?: number;
  } = Object.fromEntries([...searchParams]);
  return searchParamsObject;
};
