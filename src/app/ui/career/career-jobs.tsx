'use client';

import { Job } from './job';

export const CareerJobs = ({ jobs }: { jobs: any }) => {
  const jobList = jobs.map((job: any) => job.fields);

  console.log(jobList);

  return (
    <div className='container mx-auto mt-16 mb-12 '>
      <div className='flex justify-center flex-col gap-5'>
        {jobList.map((job, index) => (
          <Job key={index} job={job}></Job>
        ))}
      </div>
    </div>
  );
};
