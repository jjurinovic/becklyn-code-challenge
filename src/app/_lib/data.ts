import { EntrySkeletonType } from 'contentful';
import { client } from './contentful/contentful';

/**
 * Fetch all jobs
 * @param {JobFilter} param0 job filter object
 * @returns list of jobs
 */
export const fetchJobs = async ({
  limit,
  skip,
  jobDepartment,
  jobLocation,
  jobLevel,
}: JobFilter) => {
  let args: any = {
    content_type: 'job',
    limit,
    skip,
  };

  // if department exist, add to filters
  if (!!jobDepartment) {
    args = {
      ...args,
      'fields.department.fields.title': jobDepartment,
      'fields.department.sys.contentType.sys.id': 'jobDepartment',
    };
  }

  // if location exist, add to filters
  if (!!jobLocation) {
    args = {
      ...args,
      'fields.locations.sys.id[in]': jobLocation,
    };
  }

  // if level exist, add to filters
  if (!!jobLevel) {
    args = {
      ...args,
      'fields.levels.sys.id': jobLevel,
    };
  }
  return await client.getEntries(args);
};

/** Fetch all job levels */
export const fetchJobLevels = async () => {
  const levels = await client.getEntries<EntrySkeletonType<JobLevel>>({
    content_type: 'jobLevel',
  });
  return levels;
};

/** Fetch all job locations */
export const fetchJobLocations = async () => {
  const locations = await client.getEntries<EntrySkeletonType<JobLocation>>({
    content_type: 'location',
  });
  return locations;
};

/** Fetch all job departments */
export const fetchDepartments = async () => {
  const departments = (await client.getEntries)<
    EntrySkeletonType<JobDepartment>
  >({
    content_type: 'jobDepartment',
  });
  return departments;
};
