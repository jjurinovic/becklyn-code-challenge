'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid';

import { classNames } from '../utils/style';

type DropdownProps = {
  placeholder: string;
  items: any[];
  field: string;
  onSelect: (item: any, sameItem: boolean) => void;
  selected?: any;
};

export default function Dropdown({
  placeholder,
  items,
  field,
  onSelect,
  selected,
}: DropdownProps) {
  // Render chevron up or down icon
  const renderIcon = (open: boolean) => {
    const attrs = {
      className: '-mr-1 h-5 w-5 text-gray-400',
    };

    return !open ? (
      <ChevronDownIcon {...attrs} />
    ) : (
      <ChevronUpIcon {...attrs} />
    );
  };

  // helper function for check if item is selected
  const isSelectedItem = (selected?: any, currentItem?: any) => {
    return selected ? selected[field] === currentItem[field] : false;
  };

  return (
    <Menu as='div' className='relative block text-left'>
      {({ open }) => (
        <>
          {/* DROPDOWN INPUT */}
          <div className='w-full'>
            <Menu.Button
              className={classNames(
                'inline-flex w-full justify-between gap-x-1.5 rounded-lg bg-white px-4 py-3 text-sm font-normal text-grey-900  border border-grey-300 focus:border-primary-300 focus:shadow focus:shadow-primary-100',
                open ? 'border-primary-300 shadow-none' : '',
                selected ? 'border-grey-600' : ''
              )}
            >
              {selected ? (
                selected[field]
              ) : (
                <span className='text-grey-600 font-light'>{placeholder}</span>
              )}
              <span className='flex'>{renderIcon(open)}</span>
            </Menu.Button>
          </div>

          {/* DROPDOWN MODAL */}
          {open && (
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items
                static
                className='absolute right-0 max-h-80 overflow-x-auto z-10 mt-2 origin-top-right rounded-lg  bg-grey-50 shadow-lg  w-full outline-none'
              >
                <div className='py-1'>
                  {items.map((item, index) => (
                    <Menu.Item key={index}>
                      <span
                        onClick={() =>
                          onSelect(item, isSelectedItem(selected, item))
                        }
                        className={classNames(
                          isSelectedItem(selected, item)
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-grey-900',
                          'flex items-center justify-between px-4 py-3 text-sm cursor-pointer font-normal hover:bg-primary-50 hover:text-primary-700'
                        )}
                      >
                        {item[field]}
                        {isSelectedItem(selected, item) && (
                          <CheckIcon className='h-4 w-4 text-primary-700'></CheckIcon>
                        )}
                      </span>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          )}
        </>
      )}
    </Menu>
  );
}
