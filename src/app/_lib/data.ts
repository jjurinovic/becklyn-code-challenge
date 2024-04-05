import { client } from './contentful';

/**
 * Fetch all jobs
 * @param {JobFilter} param0 job filter object
 * @returns list of jobs
 */
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

  // if department exist, add to filters
  if (!!department) {
    args = {
      ...args,
      'fields.department.fields.title': department,
      'fields.department.sys.contentType.sys.id': 'jobDepartment',
    };
  }

  // if location exist, add to filters
  if (!!location) {
    args = {
      ...args,
      'fields.locations.sys.id[in]': location,
    };
  }

  // if level exist, add to filters
  if (!!level) {
    args = {
      ...args,
      'fields.levels.sys.id': level,
    };
  }
  return await client.getEntries(args);
};

/** Fetch all job levels */
export const fetchJobLevels = async () => {
  const levels = await client.getEntries({
    content_type: 'jobLevel',
  });
  return levels;
};

/** Fetch all job locations */
export const fetchJobLocations = async () => {
  const locations = await client.getEntries({
    content_type: 'location',
  });
  return locations;
};

/** Fetch all job departments */
export const fetchDepartments = async () => {
  const departments = await client.getEntries({
    content_type: 'jobDepartment',
  });
  return departments;
};
