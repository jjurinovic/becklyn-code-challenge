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
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(field, value);
  } else {
    params.delete(field);
  }
  return `${pathname}?${params.toString()}`;
};
