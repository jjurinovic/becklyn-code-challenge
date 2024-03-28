import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Home from '@/app/page';

import * as NextNavigation from 'next/navigation';

jest.mock('next/navigation', () => {
  return {
    redirect: jest.fn(),
  };
});

describe('Home', () => {
  it('redirects to /career', () => {
    const spy = jest.spyOn(NextNavigation, 'redirect');
    render(<Home />);

    expect(spy).toHaveBeenCalledWith('/career');
  });
});
