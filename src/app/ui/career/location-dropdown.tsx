import { ReadonlyURLSearchParams } from 'next/navigation';
import { ContentfulCollection } from 'contentful';

import { fetchJobLocations } from '@/app/lib/data';
import Dropdown from '../dropdown';

export const LocationDropdown = async ({
  replaceUrl,
  searchParams,
}: {
  replaceUrl: (field: string, value?: string) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const locations: ContentfulCollection<any> = await fetchJobLocations();
  const locationList: JobLocation[] = locations.items.map(
    (loc: any) => loc.fields
  );

  // Find selected location from query param
  const selectedLocation = locations.items.find(
    (location) => searchParams.get('location') === location.sys.id
  )?.fields;

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
