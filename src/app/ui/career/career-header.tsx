'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Dropdown from '../dropdown';
import { addUrlParam } from '@/app/utils/url';

export const CareerHeader = ({
  total,
  locations,
  levels,
  departments,
  selectedLocation,
  selectedLevel,
  selectedDepartment,
}: {
  total: number;
  locations: any;
  levels: any;
  departments: any;
  selectedLocation?: any;
  selectedLevel?: any;
  selectedDepartment?: any;
}) => {
  // I have put any to props tpyes because it was easier
  const locationList: JobLocation[] = locations.map((loc: any) => loc.fields);
  const levelList: JobLevel[] = levels.map((level: any) => level.fields);
  const departmentList: JobDepartment[] = departments.map(
    (dep: any) => dep.fields
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // helper function for replace url with params
  const replaceUrl = (field: string, value?: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    replace(
      addUrlParam({
        searchParams: params,
        pathname,
        field,
        value,
      })
    );
  };

  // set department in url query,  if isSelected is true, deselect item
  const setDepartment = (
    department: JobDepartment,
    isSelected: boolean
  ): void => {
    replaceUrl('department', isSelected ? undefined : department.title);
  };

  // set location in url query, if isSelected is true, deselect item
  const setLocation = (location: JobLocation, isSelected: boolean): void => {
    const locationId =
      location && !isSelected
        ? locations.find((loc: any) => loc.fields.city === location.city).sys.id
        : null;
    replaceUrl('location', locationId);
  };

  // set job level in url query,  if isSelected is true, deselect item
  const setLevel = (jobLevel: JobLevel, isSelected: boolean): void => {
    const levelId = levels.find(
      (level: any) => level.fields.title === jobLevel.title
    ).sys.id;

    replaceUrl('level', !isSelected ? levelId : undefined);
  };

  return (
    <div className='bg-grey-75 pt-24 pb-16'>
      <div className='container mx-auto'>
        <div>
          <h2 className='text-sm md:text-base text-primary-600 font-bold text-center mb-3 md:mb-5'>
            {total} offene Stellen bei Creditplus
          </h2>
          <h1 className='text-center text-3xl lg:text-5xl md:text-4xl text-secondary font-bold mb-6 md:mb-8'>
            Hier beginnt deine Zukunft
          </h1>

          <div className='dropdowns  justify-center grid grid-cols-12 gap-4'>
            <div className=' lg:col-start-1 col-span-12 md:col-span-4 lg:col-span:3'>
              <Dropdown
                field='title'
                items={departmentList}
                placeholder='Bereich'
                onSelect={setDepartment}
                selected={selectedDepartment}
              ></Dropdown>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span:3'>
              <Dropdown
                field='city'
                items={locationList}
                placeholder='Stadt'
                onSelect={setLocation}
                selected={selectedLocation}
              ></Dropdown>
            </div>
            <div className='col-span-12 md:col-span-4 lg:col-span:3'>
              <Dropdown
                field='title'
                items={levelList}
                placeholder='Erfahrungslevel'
                onSelect={setLevel}
                selected={selectedLevel}
              ></Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
