import { SearchIcon, TrashIcon } from '@heroicons/react/solid'
import React from 'react'

interface Props {
  results : '' | {}
  getTeamData:Function
  setResults:Function
}

const Searchbar = ({results,getTeamData,setResults}: Props) => {
  return (
    <div className="relative p-2 ">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center">
  
      {results === '' &&
      <button onClick={() =>  getTeamData()} type="button" className="inline-flex items-center shadow-sm px-6 py-1.5 border border-gray-300 text-lg leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <SearchIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
  
        <span>Search Colleges</span>
      </button>
  }
  
  {    
    results !== '' &&
  <button onClick={() =>  setResults('')} type="button" className="inline-flex items-center shadow-sm px-6 py-1.5 border border-gray-300 text-lg leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <TrashIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
  
        <span>Clear Search</span>
      </button>}
  
  
  
    </div>
  </div>
  )
}

export default Searchbar
