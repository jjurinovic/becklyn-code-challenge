'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchDepartments } from '@/app/_lib/data';
import Dropdown from '../../shared/dropdown/dropdown';
import { DataEntry } from '@/app/_lib/contentful/types';
import { JobFilterType } from '@/app/_types/job-filter-type.enum';

export const DepartmentDropdown = ({
  replaceUrl,
}: {
  replaceUrl: (field: string, value?: string) => void;
}) => {
  const searchParams = useSearchParams();
  const [departments, setDepartments] = useState<JobDepartment[]>([]);

  // Find selected department in department list
  const selectedDepartment = departments.find(
    (department: JobDepartment) =>
      searchParams.get(JobFilterType.department) === department.title
  );

  // Fetch departments
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDepartments();
      const departmentList: JobDepartment[] = result.items.map(
        (dep: DataEntry<JobDepartment>) => dep.fields as JobDepartment
      );

      setDepartments(departmentList);
    };

    fetchData();
  }, []);

  // set selected department in url query,  if isSelected is true, deselect item
  const setSelectedDepartment = (
    department: JobDepartment,
    isSelected: boolean
  ): void => {
    replaceUrl(
      JobFilterType.department,
      isSelected ? undefined : department.title
    );
  };

  return (
    <Dropdown<JobDepartment, 'title'>
      field='title'
      items={departments}
      placeholder='Bereich'
      onSelect={setSelectedDepartment}
      selected={selectedDepartment}
    ></Dropdown>
  );
};
