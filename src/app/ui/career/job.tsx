import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

export const Job = ({ job }: { job: Job }) => {
  return (
    <div className='rounded-2xl bg-grey-50 border border-grey-200 px-6 py-6 md:py-8 w-full max-w-4xl mx-auto'>
      <div className='flex items-center justify-between text-sm text-primary-600 font-bold mb-2'>
        {job.department.fields.title}
        <a href='#' className='flex items-center justify-between text-base'>
          <span className='hidden md:inline-block mr-3.5'>Stelle Anzeigen</span>
          <ArrowUpRightIcon className='h-5 w-5'></ArrowUpRightIcon>
        </a>
      </div>
      <p className='text-lg text-grey-900 font-bold mb-5'>{job?.name}</p>
      <div className='font-normal text-grey-700 flex items-center'>
        <MapPinIcon className='h-6 w-6 mr-2'></MapPinIcon>
        <span className='mr-6'>
          {job.locations.map((loc) => loc.fields.city).join(', ')}
        </span>
        <ClockIcon className='h-6 w-6 mr-2'></ClockIcon>
        <span>{job.type.fields.title}</span>
      </div>
    </div>
  );
};
