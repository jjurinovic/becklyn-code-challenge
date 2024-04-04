import { fetchJobs } from '../lib/data';
import { CareerHeader } from '../ui/career/career-header';
import { CareerJobs } from '../ui/career/career-jobs';
import Pagination from '../ui/pagination';

const CareerPage = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const currentSize = Number(searchParams?.size) || 5;

  // Fetch all jobs
  const jobs: any = await fetchJobs({
    limit: currentSize,
    skip: currentPage - 1, // Page numbers start from 1 and skip from 0
    department: searchParams?.department,
    level: searchParams?.level,
    location: searchParams?.location,
  });

  return (
    <div className='w-full'>
      <CareerHeader total={jobs?.total} />
      <div className='w-auto lg:container mx-4 sm:mx-16 xl:mx-auto mb-8'>
        <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4'>
          <div className='lg:col-start-3 col-span-4 md:col-span-6 lg:col-span-8'>
            {/* Job list */}
            <div className='w-full mt-16 mb-12'>
              <CareerJobs jobs={jobs.items}></CareerJobs>
            </div>

            {/* Show pagination only if there are jobs */}
            {jobs.items.length > 0 && (
              <div className='flex justify-center '>
                <div className='w-full pt-8 border-grey-200 border-t'>
                  <Pagination
                    total={jobs?.total}
                    currentPage={currentPage}
                    pageSize={currentSize}
                  ></Pagination>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
