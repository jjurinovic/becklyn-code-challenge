'use client';

import { Job } from './job';

export const CareerJobs = ({ jobs }: { jobs: any }) => {
  const jobList = jobs.map((job: any) => job.fields);

  return (
    <div className='flex justify-center flex-col gap-5 '>
      {jobList.map((job: Job, index: number) => (
        <Job key={index} job={job}></Job>
      ))}
      {jobList.length === 0 && (
        <p className='text-2xl text-center font-bold text-primary-900'>
          Es gibt keine offenen Stellen.
        </p>
      )}
    </div>
  );
};
