import { useState, useEffect } from "react";
import { fetchBills } from "../redux/billSlice";
import { useSelector, useDispatch } from "react-redux";
import InputSearch from "../components/inputSearch";
import { useLocation } from 'react-router-dom';


function UserDetail() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const UserID = query.get('Userid');
    const dispatch = useDispatch();
    const bills = useSelector((state) => state.bills.bills);
  const billStatus = useSelector((state) => state.bills.status);


  // Dữ liệu phân trang
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("UserName");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Số item trên 1 trang



  useEffect(() => {
    if (billStatus === "idle") {
      dispatch(fetchBills(UserID));
    }
    console.log(bills);
  }, [billStatus, dispatch]);

  useEffect(() => {
    if (bills) {
      const results = bills.filter((transaction) =>
        (transaction[searchCriteria]?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        )
      );
      setFilteredTransactions(results);
      setCurrentPage(1);
    }
  }, [bills, searchQuery, searchCriteria]);

  // Xác định các mục cần hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Xử lý thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleSearch = ({ query, criteria }) => {
    setSearchQuery(query);
    setSearchCriteria(criteria);
    setCurrentPage(1); // Reset trang khi tìm kiếm
  };

    return ( <>
        <main className="flex-1">
        <div className="px-3">
          <div className="border text-card-foreground bg-white rounded-lg shadow" data-v0-t="card">
            <div className='flex items-center justify-between pr-4'>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Danh Sách  User Detail</h3>
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
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Category</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Description</th>
                      <th className="h-12 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Price</th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">Date</th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0">
                  {currentItems.map((bill, index) => (
                          <tr
                            key={bill._id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-align"
                          >
                            <td className="p-4 align-middle w-5 [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                              {index + 1}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                              {bill.CategoryName}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                              {bill.Description}{" "}
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center text-red-500 ">
                              {bill.Amount}đ
                            </td>
                            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                              {bill.Dates}
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
    </> );
}

export default UserDetail;