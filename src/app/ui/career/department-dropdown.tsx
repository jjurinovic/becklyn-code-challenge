'use client';
import { useEffect, useState } from 'react';
import { fetchDepartments } from '@/app/lib/data';

import Dropdown from '../dropdown';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const DepartmentDropdown = ({
  replaceUrl,
  searchParams,
}: {
  replaceUrl: (field: string, value?: string) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const [departments, setDepartments]: any = useState([]);
  // selected department
  const selectedDepartment = departments.find(
    (department: any) => searchParams.get('department') === department.title
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDepartments();
      const departmentList: JobDepartment[] = result.items.map(
        (dep: any) => dep.fields
      );
      setDepartments(departmentList);
    };

    fetchData();
  }, []);

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
      items={departments}
      placeholder='Bereich'
      onSelect={setDepartment}
      selected={selectedDepartment}
    ></Dropdown>
  );
};
