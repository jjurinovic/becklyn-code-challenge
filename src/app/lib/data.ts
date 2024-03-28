import { client } from '@/app/lib/contentful';

export const fetchJobs = async ({
  limit,
  skip,
  department,
  location,
  level,
}: JobFilter) => {
  let args: any = {
    content_type: 'job',
    limit,
    skip,
  };

  if (!!department) {
    args = {
      ...args,
      'fields.department.fields.title': department,
      'fields.department.sys.contentType.sys.id': 'jobDepartment',
    };
  }

  if (!!location) {
    args = {
      ...args,
      'fields.locations.sys.id[in]': location,
    };
  }

  if (!!level) {
    args = {
      ...args,
      'fields.levels.sys.id': level,
    };
  }
  return await client.getEntries(args);
};

export const fetchJobLevels = async () => {
  const levels = await client.getEntries({
    content_type: 'jobLevel',
  });
  return levels;
};

export const fetchJobLocations = async () => {
  const locations = await client.getEntries({
    content_type: 'location',
  });
  return locations;
};

export const fetchDepartments = async () => {
  const locations = await client.getEntries({
    content_type: 'jobDepartment',
  });
  return locations;
};
