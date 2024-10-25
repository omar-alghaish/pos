import React from 'react'
import { IoIosSearch } from "react-icons/io";


interface SearchParams {}
const Search:React.FC<SearchParams> = () => {
  return (
    <div className='search_bar_container'>
      <input type="text" />
      <div className="icon"><IoIosSearch /></div>
    </div>
  )
}

export default Search
