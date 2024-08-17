import InputSearch from '../components/inputSearch';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/userSlice';

function HistoryUser() {
  const dispatch = useDispatch();
  const historyList = useSelector((state) => state.users.users); // Đảm bảo tên state đúng
  const status = useSelector((state) => state.users.status); // Đảm bảo tên state đúng
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('UserName');
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Call API
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (historyList) {
      const results = historyList.filter(item =>
        (item[searchCriteria]?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(results);
      setCurrentPage(1); // Reset trang khi dữ liệu tìm kiếm thay đổi
    }
  }, [historyList, searchQuery,searchCriteria]);

  // Xác định các mục cần hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

  const handleSearch = ({query ,criteria}) => {
    setSearchQuery(query);
    setSearchCriteria(criteria);
    setCurrentPage(1); // Reset trang khi tìm kiếm
  };

  return (
    <>
      <main className="flex-1">
        <div className="px-3">
          <div className="border text-card-foreground bg-white rounded-lg shadow" data-v0-t="card">
            <div className='flex items-center justify-between pr-4'>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Danh Sách History User</h3>
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
                      <th className="h-12 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Xem chi tiết</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Tổng thu</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Tổng Chi tiêu</th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                    {currentItems.map((item, index) => (
                      <tr key={item._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-align">
                        <td className="p-4 align-middle w-5 [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{index + 1}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{item.UserName}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{item.Email}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                          <a href={`/UserDetail?Userid=${item.UserAccountID}`} className="w-[20px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="Layer_1"
                              data-name="Layer 1"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                            >
                              <path d="m18.813,10c.309,0,.601-.143.79-.387s.255-.562.179-.861c-.311-1.217-.945-2.329-1.833-3.217l-3.485-3.485c-1.322-1.322-3.08-2.05-4.95-2.05h-4.515C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h3c.552,0,1-.448,1-1s-.448-1-1-1h-3c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h4.515c.163,0,.325.008.485.023v4.977c0,1.654,1.346,3,3,3h5.813Zm-6.813-3V2.659c.379.218.732.488,1.05.806l3.485,3.485c.314.314.583.668.803,1.05h-4.338c-.551,0-1-.449-1-1Zm11.122,4.879c-1.134-1.134-3.11-1.134-4.243,0l-6.707,6.707c-.755.755-1.172,1.76-1.172,2.829v1.586c0,.552.448,1,1,1h1.586c1.069,0,2.073-.417,2.828-1.172l6.707-6.707c.567-.567.879-1.32.879-2.122s-.312-1.555-.878-2.121Zm-1.415,2.828l-6.708,6.707c-.377.378-.879.586-1.414.586h-.586v-.586c0-.534.208-1.036.586-1.414l6.708-6.707c.377-.378,1.036-.378,1.414,0,.189.188.293.439.293.707s-.104.518-.293.707Z" />
                            </svg>
                          </a>
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{item.TotalReceived}</td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">{item.TotalSpent}</td>
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

export default HistoryUser;
