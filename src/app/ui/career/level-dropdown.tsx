import { ReadonlyURLSearchParams } from 'next/navigation';
import { ContentfulCollection } from 'contentful';

import Dropdown from '../dropdown';
import { fetchJobLevels } from '@/app/lib/data';

export const LevelDropdown = async ({
  replaceUrl,
  searchParams,
}: {
  replaceUrl: (field: string, value?: string) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const levels: ContentfulCollection<any> = await fetchJobLevels();
  const levelList: JobLevel[] = levels.items.map((level: any) => level.fields);

  // Find selected level from query param
  const selectedLevel = levels.items.find(
    (level) => searchParams.get('level') === level.sys.id
  )?.fields;

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
