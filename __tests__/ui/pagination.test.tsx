import Pagination from '@/app/ui/pagination';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return '';
  },
}));

describe('Pagination Component', () => {
  const fakeProps = {
    total: 100,
    currentPage: 1,
    pageSize: 10,
  };

  it('renders the pagination component with page numbers and correct icons', () => {
    const componentt = render(<Pagination {...fakeProps} />);

    expect(componentt.getAllByTestId('list-item').length).toBe(5);
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button-icon')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button-text').textContent).toEqual(
      'Vorherige'
    );
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button-icon')).toBeInTheDocument();
    expect(screen.getByTestId('next-button-text').textContent).toEqual(
      'Nächste'
    );
  });
});
