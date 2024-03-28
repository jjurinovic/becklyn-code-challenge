'use client';

import { Job } from './job';

export const CareerJobs = ({ jobs }: { jobs: any }) => {
  const jobList = jobs.map((job: any) => job.fields);

  return (
    <div className='flex justify-center flex-col gap-5 '>
      {jobList.map((job: Job, index: number) => (
        <Job key={index} job={job}></Job>
      ))}
    </div>
  );
};
