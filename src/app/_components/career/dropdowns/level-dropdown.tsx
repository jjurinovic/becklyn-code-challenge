'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { fetchJobLevels } from '@/app/_lib/data';
import Dropdown from '../../shared/dropdown/dropdown';
import { DataCollection, DataEntry } from '@/app/_lib/contentful/types';
import { JobFilterType } from '@/app/_types/job-filter-type.enum';

export const LevelDropdown = ({
  replaceUrl,
}: {
  replaceUrl: (field: string, value?: string) => void;
}) => {
  const searchParams = useSearchParams();
  const [levels, setLevels] = useState<DataCollection<JobLevel> | null>(null);

  // get just data what is useful
  const levelList: JobLevel[] = levels
    ? (levels.items.map(
        (level: DataEntry<JobLevel>) => level.fields
      ) as JobLevel[])
    : [];

  // Find selected level from query param
  const selectedLevel: JobLevel = levels?.items.find(
    (level: DataEntry<JobLevel>) =>
      searchParams.get(JobFilterType.level) === level.sys.id
  )?.fields as JobLevel;

  // Fetch job level data
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchJobLevels();
      setLevels(result);
    };

    fetchData();
  }, []);

  // set job level in url query,  if isSelected is true, deselect item
  const setLevel = (jobLevel: JobLevel, isSelected: boolean): void => {
    const levelId = levels?.items.find(
      (level: DataEntry<JobLevel>) =>
        (level.fields.title as unknown | string) === jobLevel.title
    )?.sys.id;

    replaceUrl(JobFilterType.level, !isSelected ? levelId : undefined);
  };

  return (
    <Dropdown<JobLevel, 'title'>
      field='title'
      items={levelList}
      placeholder='Erfahrungslevel'
      onSelect={setLevel}
      selected={selectedLevel}
    ></Dropdown>
  );
};
