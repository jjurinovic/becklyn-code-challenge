import {
  Entry,
  EntryCollection,
  EntrySkeletonType,
  FieldsType,
} from 'contentful';

export interface DataCollection<T extends FieldsType>
  extends EntryCollection<EntrySkeletonType<T>, undefined, string> {}

export interface DataEntry<T extends FieldsType>
  extends Entry<EntrySkeletonType<T>> {}
