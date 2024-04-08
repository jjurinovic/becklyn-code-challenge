import { CareerHeader } from '../_components/career/career-header/career-header';
import { CareerJobs } from '../_components/career/career-jobs/career-jobs';
import Pagination from '../_components/shared/pagination/pagination';
import { fetchJobs } from '../_lib/data';

import styles from './career.module.css';

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
    jobDepartment: searchParams?.jobDepartment,
    jobLevel: searchParams?.jobLevel,
    jobLocation: searchParams?.jobLocation,
  });

  // map to Job array
  const jobList: Job[] = jobs.items.map((job: any) => job.fields);

  return (
    <div className={styles.main}>
      {/* Header */}
      <CareerHeader total={jobs?.total} />

      {/* Jobs */}
      <div className={styles.main_container}>
        <div className={styles.main_grid}>
          <div className={styles.main_grid_column}>
            {/* Job list */}
            <div className={styles.jobs}>
              <CareerJobs jobs={jobList}></CareerJobs>
            </div>

            {/* Show pagination only if there are jobs */}
            {jobList.length > 0 && (
              <div className={styles.pagination_container}>
                <div className={styles.pagination}>
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
