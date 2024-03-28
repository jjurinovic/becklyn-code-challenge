'use client';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
  total,
  page,
  size,
}: {
  total: number;
  page: number;
  size: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const setPage = (page: number | string) => {
    replace(createPageURL(page));
  };

  const totalPages = Math.ceil(total / size);

  const createPageNumbers = () => {
    const arr = Array.from(Array(totalPages).keys());
    return arr.map((num) => {
      if (num < 3 || num > totalPages - 3) {
        return (
          <a
            key={num + 1}
            href='#'
            className={
              'relative inline-flex rounded-full items-center px-4 py-2 text-sm font-semibold text-grey-600 hover:bg-primary-75 focus:z-20 focus:outline-offset-0' +
              (num + 1 === page ? ' bg-primary-75 text-primary-600' : '')
            }
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </a>
        );
      }
      if (num === 4) {
        return <span key={num + 1}>...</span>;
      }
      return '';
    });
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center justify-between'>
        <nav
          className='flex items-center justify-between w-full text-sm'
          aria-label='Pagination'
        >
          <span
            className='relative inline-flex items-center rounded-full px-2 py-2 text-grey-600 hover:bg-primary-75 cursor-pointer'
            onClick={() => prevPage()}
          >
            <ArrowLeftIcon className='h-4 w-4' aria-hidden='true' />
            <span className='hidden sm:inline ml-2'>Vorherige</span>
          </span>
          <div>{createPageNumbers()}</div>
          <span
            className='relative inline-flex items-center rounded-full px-2 py-2 text-grey-600 hover:bg-primary-75  cursor-pointer'
            onClick={() => nextPage()}
          >
            <span className='hidden sm:inline mr-2'>Nächste</span>
            <ArrowRightIcon className='h-4 w-4' aria-hidden='true' />
          </span>
        </nav>
      </div>
    </div>
  );
}
