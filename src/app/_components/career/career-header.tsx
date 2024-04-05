'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

import { addUrlParam } from '@/app/_utils/url';
import { DepartmentDropdown } from './department-dropdown';
import { LocationDropdown } from './location-dropdown';
import { LevelDropdown } from './level-dropdown';

export const CareerHeader = ({ total }: { total: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // helper function for replace url with params
  const replaceUrl = (field: string, value?: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    replace(
      addUrlParam({
        searchParams: params,
        pathname,
        field,
        value,
      })
    );
  };

  return (
    <div className='bg-grey-75 pt-20 md:pt-32 lg:pt-44 pb-16 w-full'>
      <div className='w-auto lg:container mx-4 sm:mx-16 xl:mx-auto'>
        <h2 className='text-sm md:text-base text-primary-600 font-bold text-center mb-3 md:mb-5'>
          {total} offene Stellen bei Creditplus
        </h2>
        <h1 className='text-center text-3xl lg:text-5xl md:text-4xl text-secondary font-bold mb-6 md:mb-8'>
          Hier beginnt deine Zukunft
        </h1>

        <div className='justify-center grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4'>
          <div className='lg:col-start-2 col-span-4 md:col-span-6 lg:col-span-10 flex gap-5 flex-col md:flex-row'>
            <div className='w-full md:w-1/3'>
              <Suspense fallback={<h1>Loading</h1>}>
                <DepartmentDropdown
                  replaceUrl={replaceUrl}
                  searchParams={searchParams}
                />
              </Suspense>
            </div>
            <div className='w-full md:w-1/3'>
              <Suspense fallback={<h1>Loading</h1>}>
                <LocationDropdown
                  replaceUrl={replaceUrl}
                  searchParams={searchParams}
                />
              </Suspense>
            </div>

            <div className='w-full md:w-1/3'>
              <Suspense fallback={<h1>Loading</h1>}>
                <LevelDropdown
                  replaceUrl={replaceUrl}
                  searchParams={searchParams}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
