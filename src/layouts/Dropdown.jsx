import InputSearch from '../components/inputSearch';

function Dropdown() {
    return (   
        <>
            <div className="flex justify-between  w-auto h-auto flex-shrink py-2 mb-3 h-[90px] px-3   bg-white  text-zinc-700 flex items-center justify-center">
              {/* <InputSearch/> */}
              {/* <div></div> */}
              <h1 className='font-medium text-2xl '>Quản Lý Chi Tiêu</h1>
              <div className="relative inline-block text-left">
                <div className="dropdown flex  items-center">
                  <div className="w-10 relative h-10 border rounded-full flex items-center justify-center mx-3 cursor-pointer hover:text-red-500">
                    <p className="text-[60px] absolute top-0 left-7 animate-ping z-10 ">
                      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="15" height="15"><path d="M12,19a7,7,0,1,1,7-7A7.008,7.008,0,0,1,12,19Z"/></svg>
                    </p>      
                    <svg id="Layer_1" height="18" viewBox="0 0 24 24" fill="currentColor" width="18" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m1.037 5.889-1.043-1.7 6.735-4.127 1.042 1.706zm21.237 10.328-4.125 6.683 1.7 1.051 4.125-6.684zm-1.35-1.617-4.924 7.983a2.879 2.879 0 0 1 -2.13 1.394 3.158 3.158 0 0 1 -.38.023 2.887 2.887 0 0 1 -2.052-.854l-.963-.963a4.75 4.75 0 0 1 -6.614-6.617l-3.008-3.009a2.911 2.911 0 0 1 .452-4.486l7.762-4.75a8.362 8.362 0 0 1 9.709.489l1.892-1.892 1.414 1.414-1.9 1.9a8.449 8.449 0 0 1 .742 9.368zm-11.914 6.118-3.692-3.695a2.719 2.719 0 0 0 .491 3.211 2.825 2.825 0 0 0 3.201.484zm9.12-14.818a6.4 6.4 0 0 0 -8-.878l-7.752 4.736a.88.88 0 0 0 -.373.649.9.9 0 0 0 .262.736l10.586 10.589a.886.886 0 0 0 .759.26.9.9 0 0 0 .67-.441l4.92-7.973a6.445 6.445 0 0 0 -1.072-7.678z"/></svg>
                  </div>
                  <img className="w-9 h-9 rounded-full mx-2" src="https://th.bing.com/th/id/R.764e0bc52a95bc66804825f1656de9df?rik=44d52B58UQUFUA&pid=ImgRaw&r=0"></img>
                  {/* <button
                    className="btn btn-secondary dropdown-toggle flex-shrink  text-slate-700 bg-white nline-flex w-min justify-center gap-x-1.5 outline-none border-none border-0 border-transparent tracking-wide  hover:text-black px-3 py-2 text-sm   ring-1 ring-inset "
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Jane
                  </button>
                  <ul
                    className="dropdown-menu absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        className="dropdown-item block px-4 py-2 text-sm text-gray-700"
                        href="#"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item block px-4 py-2 text-sm text-gray-700"
                        href="login"
                      >
                        Log In
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item block px-4 py-2 text-sm text-gray-700"
                        href="resgister"
                      >
                        Resgister
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item block px-4 py-2 text-sm text-gray-700"
                        href="#"
                      >
                        Log Out
                      </a>
                    </li>
                  </ul> */}
                  <Example/>
                </div>
              </div>
            </div>
        </>
     );
}

export default Dropdown;

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  TrashIcon,
  UserIcon,
  ArrowDownOnSquareIcon
} from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom';

export function Example() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken'); // Kiểm tra token để xác định trạng thái đăng nhập
  const UserName = localStorage.getItem('UserName'); // Kiểm tra token để xác định trạng thái đăng nhập

  const handleLogout = (e) => {
    e.preventDefault();
    // Xóa token khỏi localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserID');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('UserName');
    
    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-dashed data-[focus]:outline-1 data-[focus]:outline-white">
        {UserName ? UserName : ''}
        <ChevronDownIcon className="size-4 text-black" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {isLoggedIn ? (
          <>
            <MenuItem>
              <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:text-black" href='/Profile'>
                <UserIcon className="size-4 fill-black" />
                Profile
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
              </a>
            </MenuItem>
            <MenuItem>
              <a onClick={handleLogout} className="group cursor-pointer flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:text-black">
                <TrashIcon className="size-4 fill-black" />
                Log Out
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
              </a>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <a href='/login' className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:text-black">
                <ArrowDownOnSquareIcon className="size-4 fill-black" />
                Log In
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
              </a>
            </MenuItem>
            <MenuItem>
              <a href='/resgister' className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:text-black">
                <ArchiveBoxXMarkIcon className="size-4 fill-black" />
                Register
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
              </a>
            </MenuItem>
          </>
        )}
      </MenuItems>
    </Menu>
  );
}
