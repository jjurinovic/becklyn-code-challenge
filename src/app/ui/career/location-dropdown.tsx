'use client';
import { useEffect, useState } from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';

import { fetchJobLocations } from '@/app/lib/data';
import Dropdown from '../dropdown';

export const LocationDropdown = ({
  replaceUrl,
  searchParams,
}: {
  replaceUrl: (field: string, value?: string) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const [locations, setLocations]: any = useState(null);

  // get location list only without unused fields
  const locationList: JobLocation[] = locations
    ? locations.items.map((loc: any) => loc.fields)
    : [];

  // Find selected location from query param
  const selectedLocation = locations
    ? locations.items.find(
        (location: any) => searchParams.get('location') === location.sys.id
      )?.fields
    : null;

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
      location && !isSelected && locations
        ? locations.items.find((loc: any) => loc.fields.city === location.city)
            .sys.id
        : undefined;
    replaceUrl('location', locationId);
  };

  return (
    <Dropdown
      field='city'
      items={locationList}
      placeholder='Stadt'
      onSelect={setLocation}
      selected={selectedLocation}
    ></Dropdown>
  );
};
