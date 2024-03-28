import {
  fetchDepartments,
  fetchJobLevels,
  fetchJobLocations,
  fetchJobs,
} from '../lib/data';
import { CareerHeader } from '../ui/career/career-header';
import { CareerJobs } from '../ui/career/career-jobs';
import Pagination from '../ui/pagination';

const Page = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const currentPage = Number(searchParams?.page) || 1;
  const currentSize = Number(searchParams?.size) || 5;

  // Fetch jobs
  const jobs: any = await fetchJobs({
    limit: currentSize,
    skip: currentPage - 1, // Page numbers start from 1 and skip from 0
    department: searchParams?.department,
    level: searchParams?.level,
    location: searchParams?.location,
  });

  // Fetch data for filters
  const [locations, levels, departments] = await Promise.all([
    fetchJobLocations(),
    fetchJobLevels(),
    fetchDepartments(),
  ]);

  // Find selected location from query param
  const selectedLocation = locations.items.find(
    (location) => searchParams?.location === location.sys.id
  )?.fields;

  // Find selected level from query param
  const selectedLevel = levels.items.find(
    (level) => searchParams?.level === level.sys.id
  )?.fields;

  // Find selected department from query param
  const selectedDepartment = departments.items.find(
    (department) => searchParams?.department === department.fields.title
  )?.fields;

  return (
    <div>
      <CareerHeader
        total={jobs?.total}
        locations={locations.items}
        departments={departments.items}
        levels={levels.items}
        selectedLocation={selectedLocation}
        selectedLevel={selectedLevel}
        selectedDepartment={selectedDepartment}
      />
      <CareerJobs jobs={jobs.items}></CareerJobs>
      <div className='container mx-auto  '>
        <div className='flex justify-center'>
          <div className='w-full max-w-4xl pt-8 border-grey-200 border-t'>
            <Pagination
              total={jobs?.total}
              page={currentPage}
              size={currentSize}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
