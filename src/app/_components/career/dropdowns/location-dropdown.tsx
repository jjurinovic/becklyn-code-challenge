'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchJobLocations } from '@/app/_lib/data';
import Dropdown from '../../shared/dropdown/dropdown';
import { DataCollection, DataEntry } from '@/app/_lib/contentful/types';
import { JobFilterType } from '@/app/_types/job-filter-type.enum';

export const LocationDropdown = ({
  replaceUrl,
}: {
  replaceUrl: (field: string, value?: string) => void;
}) => {
  const searchParams = useSearchParams();
  const [locations, setLocations] =
    useState<DataCollection<JobLocation> | null>(null);

  // get location list only without unused fields
  const locationList: JobLocation[] = locations
    ? locations.items.map((loc: any) => loc.fields)
    : [];

  // Find selected location from query param
  const selectedLocation: JobLocation = locations?.items.find(
    (location: DataEntry<JobLocation>) =>
      searchParams.get(JobFilterType.location) === location.sys.id
  )?.fields as JobLocation;

  // Fetch job locations
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchJobLocations();

      setLocations(result);
    };

    fetchData();
  }, []);

  // set location in url query, if isSelected is true, deselect item
  const setLocation = (location: JobLocation, isSelected: boolean): void => {
    const locationId =
      location && !isSelected
        ? locations?.items.find(
            (loc: DataEntry<JobLocation>) =>
              (loc.fields.city as unknown | string) === location.city
          )?.sys.id
        : undefined;
    replaceUrl(JobFilterType.location, locationId);
  };

  return (
    <Dropdown<JobLocation, 'city'>
      field='city'
      items={locationList}
      placeholder='Stadt'
      onSelect={setLocation}
      selected={selectedLocation}
    ></Dropdown>
  );
};
