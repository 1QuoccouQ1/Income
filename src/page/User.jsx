import InputSearch from '../components/inputSearch';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser , DeleteUser } from '../redux/userSlice';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function User() {
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.users.users); // Đảm bảo tên state đúng
  const status = useSelector((state) => state.users.status); // Đảm bảo tên state đúng
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('UserName');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Call API
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (Users) {
      const results = Users.filter(user =>
        (user[searchCriteria]?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(results);
      setCurrentPage(1); // Reset trang khi dữ liệu tìm kiếm thay đổi
    }
  }, [Users, searchQuery,searchCriteria]);

  // Xác định các mục cần hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSearch = ({query ,criteria}) => {
    setSearchQuery(query);
    setSearchCriteria(criteria);
    setCurrentPage(1); // Reset trang khi tìm kiếm
  };

  const handleDeleteGoat = (goatID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteUser(goatID));
        toast.success('Your has been deleted', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setTimeout(() => {
          dispatch(fetchUser());
        }, 1000);
      }
    });
  };

  return (
    <>
        <ToastContainer />

      <main className="flex-1">
        <div className="px-3">
          <div className="border text-card-foreground bg-white rounded-lg shadow" data-v0-t="card">
            <div className='flex items-center justify-between pr-4'>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Danh Sách User</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#5f6368]"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
              <div>
                <InputSearch onSearch={handleSearch} />
              </div>
            </div>
            <div className="p-6">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-center">
                      <th className="h-12 px-4 w-5 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">STT</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">User Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Full Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Phone</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Address</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center"></th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    {currentItems.map((user,index) => (
                      <tr key={user._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-align">
                        <td className="p-4 align-middle w-5 [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{index + 1}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{user.UserName}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{user.Email}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{user.FullName || 'N/A'}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{user.Phone || 'N/A'}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{user.Address || 'N/A'}</td>
                        <td className="p-4 align-middle  [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                          <a onClick={() => handleDeleteGoat(user.UserAccountID)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Layer_1"
                              data-name="Layer 1"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                            >
                              <path d="m12.038.02C5.421.02.038,5.402.038,12.02s5.383,12,12,12,12-5.383,12-12S18.655.02,12.038.02Zm0,22c-5.514,0-10-4.486-10-10S6.524,2.02,12.038,2.02s10,4.486,10,10-4.486,10-10,10Zm4.765-14.105l-3.457,4.105,3.457,4.105c.356.423.302,1.054-.12,1.409-.188.158-.417.235-.644.235-.285,0-.568-.121-.766-.355l-3.235-3.842-3.235,3.842c-.197.234-.48.355-.766.355-.227,0-.456-.077-.644-.235-.422-.355-.477-.986-.12-1.409l3.457-4.105-3.457-4.105c-.356-.423-.302-1.054.12-1.409.423-.358,1.055-.301,1.409.12l3.235,3.842,3.235-3.842c.354-.42.986-.478,1.409-.12.422.355.477.986.12,1.409Z" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default User;
