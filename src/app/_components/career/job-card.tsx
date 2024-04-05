import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Card } from '../shared/card';

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <Card>
      <div className='flex items-center justify-between text-sm text-primary-600 font-bold mb-2'>
        {/* Department */}
        <span>{job.department.fields.title}</span>

        {/* Show more link */}
        <a
          href='#'
          className='flex items-center justify-between text-base group'
        >
          <span className='hidden md:inline-block mr-3.5 transition group-hover:translate-x-2'>
            Stelle Anzeigen
          </span>
          <ArrowUpRightIcon className='h-5 w-5'></ArrowUpRightIcon>
        </a>
      </div>

      {/* Job name */}
      <p className='text-lg text-grey-900 font-bold mb-5'>{job?.name}</p>

      {/* Location and type */}
      <div className='font-normal text-grey-700 flex items-center'>
        <MapPinIcon className='h-6 w-6 mr-2'></MapPinIcon>
        <span className='mr-6'>
          {job.locations.map((loc: any) => loc.fields.city).join(', ')}
        </span>
        <ClockIcon className='h-6 w-6 mr-2'></ClockIcon>
        <span>{job.type.fields.title}</span>
      </div>
    </Card>
  );
};
