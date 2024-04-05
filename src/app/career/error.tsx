'use client';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className='flex items-center justify-center flex-col w-full h-screen'>
      <h1 className='text-4xl text-primary-900 font-bold mb-8'>
        Something went wrong!
      </h1>

      <button className='rounded-md py-2 px-3 bg-primary-100' onClick={reset}>
        {' '}
        Reset
      </button>
    </div>
  );
};

export default Error;
