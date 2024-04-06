'use client';

import { JobCard } from '../job-card/job-card';

type CarrerJobsProps = {
  jobs: Job[];
};

export const CareerJobs = ({ jobs }: CarrerJobsProps) => {
  return (
    <div className='flex justify-center flex-col gap-5 '>
      {jobs.map((job: Job, index: number) => (
        <JobCard key={index} job={job}></JobCard>
      ))}
      {jobs.length === 0 && (
        <p className='text-xl md:text-2xl text-center font-bold text-primary-900'>
          Es gibt keine offenen Stellen.
        </p>
      )}
    </div>
  );
};
