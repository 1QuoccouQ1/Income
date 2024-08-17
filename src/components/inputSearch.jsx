// components/InputSearch.js
import  { useState } from 'react';

function InputSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const [criteria, setCriteria] = useState('UserName');

  const handleSearch = () => {
    onSearch({ query, criteria });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center bg-slate-100 py-2 px-3 rounded-3xl">
      <select className='bg-transparent outline-none ' onChange={(e) => setCriteria(e.target.value)} value={criteria}>
        <option value="UserName">UserName</option>
        <option value="Email">Email</option>
        <option value="CategoryName">Category</option>
        <option value="Description">Description</option>
        <option value="Phone">Phone</option>
        <option value="Address">Address</option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        className="search-icon ml-2"
        viewBox="0 0 24 24"
        width="17"
        height="17"
      >
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
      </svg>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border-none mx-2 w-[300px] bg-transparent focus:outline-none text-slate-900 text-sm"
        placeholder="Search for type command..."
      />
      <div
        className="bg-slate-200 rounded-xl p-[7px] cursor-pointer hover:bg-red-400 hover:text-white duration-300"
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="cursor-pointer filter-icon"
          id="Outline"
          viewBox="0 0 24 24"
          width="15"
          height="15"
        >
          <path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"/>
          <path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/>
          <path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"/>
          <path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"/>
        </svg>
      </div>
    </div>
  );
}

export default InputSearch;
