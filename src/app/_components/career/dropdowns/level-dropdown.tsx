'use client';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchJobLevels } from '@/app/_lib/data';
import Dropdown from '../../shared/dropdown/dropdown';

export const LevelDropdown = ({
  replaceUrl,
  searchParams,
}: {
  replaceUrl: (field: string, value?: string) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const [levels, setLevels]: any = useState(null);

  // get just data what is useful
  const levelList: JobLevel[] = levels
    ? levels.items.map((level: any) => level.fields)
    : [];

  // Find selected level from query param
  const selectedLevel = levels
    ? levels.items.find(
        (level: any) => searchParams.get('level') === level.sys.id
      )?.fields
    : null;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchJobLevels();
      setLevels(result);
    };

    fetchData();
  }, []);

  // set job level in url query,  if isSelected is true, deselect item
  const setLevel = (jobLevel: JobLevel, isSelected: boolean): void => {
    const levelId = levels.items.find(
      (level: any) => level.fields.title === jobLevel.title
    ).sys.id;

    replaceUrl('level', !isSelected ? levelId : undefined);
  };

  return (
    <Dropdown
      field='title'
      items={levelList}
      placeholder='Erfahrungslevel'
      onSelect={setLevel}
      selected={selectedLevel}
    ></Dropdown>
  );
};
