import { fetchDepartments } from '@/app/lib/data';

import Dropdown from '../dropdown';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const DepartmentDropdown = async ({
  replaceUrl,
  searchParams,
}: {
  replaceUrl: (field: string, value?: string) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const departments = await fetchDepartments();
  const departmentList: JobDepartment[] = departments.items.map(
    (dep: any) => dep.fields
  );

  // Find selected department from query param
  const selectedDepartment = departments.items.find(
    (department) => searchParams.get('department') === department.fields.title
  )?.fields;

  // set department in url query,  if isSelected is true, deselect item
  const setDepartment = (
    department: JobDepartment,
    isSelected: boolean
  ): void => {
    replaceUrl('department', isSelected ? undefined : department.title);
  };

  return (
    <Dropdown
      field='title'
      items={departmentList}
      placeholder='Bereich'
      onSelect={setDepartment}
      selected={selectedDepartment}
    ></Dropdown>
  );
};
