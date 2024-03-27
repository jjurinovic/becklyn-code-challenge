'use client';

export const CareerHeader = ({
  total,
  locations,
  levels,
  departments,
}: {
  total: number;
  locations: any;
  levels: any;
  departments: any;
}) => {
  // I have put any to props tpyes because it was easier
  const locationList: JobLocation[] = locations.map((loc: any) => loc.fields);
  const levelList: JobLevel[] = levels.map((level: any) => level.fields);
  const departmentList: JobDepartment[] = departments.map(
    (dep: any) => dep.fields
  );

  return <div>{total}</div>;
};
