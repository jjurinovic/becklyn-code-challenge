import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className='rounded-2xl bg-grey-50 border border-grey-200 px-6 py-6 md:py-8 w-full  mx-auto'>
      {children}
    </div>
  );
};
