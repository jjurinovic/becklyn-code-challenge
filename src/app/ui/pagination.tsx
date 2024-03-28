'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { addUrlParam } from '../utils/url';
import { usePagination } from '../hooks/usePagination';
import { classNames } from '../utils/style';

type PaginationProps = {
  total: number;
  currentPage: number;
  pageSize: number;
};

export default function Pagination({
  total,
  currentPage,
  pageSize,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const totalPages = Math.ceil(total / pageSize);
  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount: 1,
    pageSize,
  });

  // Create page numbers
  const createPageNumbers = () => {
    return paginationRange?.map((num: number | string, index: number) => {
      if (typeof num === 'number') {
        return (
          <span
            key={index}
            className={classNames(
              'relative inline-flex rounded-full items-center px-4 py-2 text-sm font-semibold text-grey-600 hover:bg-primary-75 focus:z-20 focus:outline-offset-0 cursor-pointer',
              num === currentPage ? ' bg-primary-75 text-primary-600' : ''
            )}
            onClick={() => setPage(num)}
          >
            {num}
          </span>
        );
      } else {
        return <span key={index}>{num}</span>;
      }
    });
  };

  // Set page number in url
  const setPage = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    replace(
      addUrlParam({
        searchParams: params,
        pathname,
        field: 'page',
        value: page.toString(),
      })
    );
  };

  // handle next page click
  const nextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  // handle previous page click
  const prevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const isFirstSelected = currentPage === 1;
  const isLastSelected = currentPage === totalPages;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center justify-between'>
        <nav
          className='flex items-center justify-between w-full text-sm'
          aria-label='Pagination'
        >
          <span
            className={classNames(
              'relative inline-flex items-center rounded-full px-2 py-2 text-grey-600 hover:bg-primary-75 cursor-pointer',
              isFirstSelected &&
                'text-grey-200 cursor-not-allowed hover:bg-grey-50'
            )}
            onClick={() => prevPage()}
          >
            <ArrowLeftIcon className='h-4 w-4' aria-hidden='true' />
            <span className='hidden sm:inline ml-2'>Vorherige</span>
          </span>
          <div>{createPageNumbers()}</div>
          <span
            className={classNames(
              'relative inline-flex items-center rounded-full px-2 py-2 text-grey-600 hover:bg-primary-75  cursor-pointer',
              isLastSelected &&
                'text-grey-200 cursor-not-allowed hover:bg-grey-50'
            )}
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
