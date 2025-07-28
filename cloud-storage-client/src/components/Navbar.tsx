'use client';

import { Search, User } from 'lucide-react';
import '../app/globals.css';

export const Navbar = () => {
  return (
    <div className="flex w-full border-b-1 border-gray-300 py-3 px-5">
      <div className="relative">
        <Search className="w-4 text-gray-500 absolute top-1.5 left-2 mr-2 h-4" />
        <input
          type="text"
          placeholder="Search files..."
          value={''}
          onChange={(e) => {}}
          className="searchbar pl-7 rounded-xl text-sm bg-gray-200 px-3 py-1 text-black outline-none"
        />
      </div>
      <div className="grow ">
        <User className="float-right w-6 text-black mr-2 h-6" />
      </div>
    </div>
  );
};
