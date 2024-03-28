export const addUrlParam = ({
  searchParams,
  pathname,
  field,
  value,
}: {
  searchParams: URLSearchParams;
  pathname: string;
  field: string;
  value?: string;
}) => {
  if (value) {
    searchParams.set(field, value);
  } else {
    searchParams.delete(field);
  }
  return `${pathname}?${searchParams.toString()}`;
};
