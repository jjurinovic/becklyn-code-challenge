import { addUrlParam } from '@/app/_utils/url';

describe('addUrlParam', () => {
  it('should return url with given param values', () => {
    const searchParams = new URLSearchParams();
    const pathname = 'test';
    const paramField = 'page';
    const paramValue = '2';
    expect(
      addUrlParam({
        searchParams,
        pathname,
        field: paramField,
        value: paramValue,
      })
    ).toEqual('test?page=2');
  });

  it('should return url without given param', () => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', '2');
    searchParams.set('testing', 'true');

    const pathname = 'test';
    const paramField = 'page';

    expect(
      addUrlParam({
        searchParams,
        pathname,
        field: paramField,
      })
    ).toEqual('test?testing=true');
  });
});
