import { classNames } from '@/app/utils/style';

describe('classNames', () => {
  it('should return string from given classname values', () => {
    expect(classNames('test', 'test-2')).toEqual('test test-2');
  });
});
