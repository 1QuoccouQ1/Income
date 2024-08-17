import SimpleBarChart from '../components/charts/chartDaily';
import BasicPie from '../components/charts/BasicPie';
import  { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from '../components/inputSearch';
import { fetchFindUser , updateUserThunk  } from "../redux/userSlice";
import { fetchBills } from "../redux/billSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('5days');
  // Sử dụng useState để quản lý trạng thái hiển thị của div
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('UserName');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const bills = useSelector((state) => state.bills.bills);
  const billStatus = useSelector((state) => state.bills.status);

  const users = useSelector((state) => state.users.currentUser);
  const userStatus = useSelector((state) => state.users.status);

  const [newBalance, setNewBalance] = useState({
    CurrentBalance: "",
    TotalReceived: "",
  });

  const [balance, setBalance] = useState({
    CurrentBalance : 0,
    TotalSpent : 0,
    TotalReceived : 0
  });

  const id = localStorage.getItem("UserID");
  // Call API
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchFindUser(id));
    }
    if (billStatus === "idle") {
      dispatch(fetchBills(id));
    }
    setBalance({
      CurrentBalance : users.CurrentBalance,
      TotalSpent : users.TotalSpent,
      TotalReceived : users.TotalReceived
    });
  }, [dispatch ,userStatus,billStatus]);

 

  useEffect(() => {
    if (bills) {
      const results = bills.filter(transaction =>
        (transaction[searchCriteria]?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
      setFilteredTransactions(results);
      setCurrentPage(1); 
    }
  }, [bills, searchQuery,searchCriteria]);

   // Xác định các mục cần hiển thị trên trang hiện tại
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
 
   // Xử lý thay đổi trang
   const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
   const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
 

  // Hàm để chuyển đổi trạng thái hiển thị của div
  const toggleDivVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSearch = ({query ,criteria}) => {
    setSearchQuery(query);
    setSearchCriteria(criteria);
    setCurrentPage(1); // Reset trang khi tìm kiếm
  };

  const handleAddGoat = () => {

    const updatedBalance ={
      CurrentBalance: parseInt(balance.CurrentBalance) + parseInt(newBalance.TotalReceived),
      TotalReceived: parseInt(balance.TotalReceived) + parseInt(newBalance.TotalReceived),
    }

    dispatch(updateUserThunk({ id, ...updatedBalance }));

    toast.success('Thêm thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    
    setNewBalance({
      CurrentBalance: "",
      TotalReceived: "",
    })
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBalance((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm để xử lý thay đổi trong dropdown
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };
    return ( 
        <>
        <ToastContainer />

                <main className="flex-1 w-full bg-[#f4f7fe]">
      <div className="px-8">
        <div className="grid grid-cols-3 gap-6 my-6">
          <div className="border text-card-foreground col-span-1 bg-white rounded-lg shadow" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Spending Chart </h3>
              <div className="flex space-x-4">
                  <select
                    value={timePeriod}
                    onChange={handleTimePeriodChange}
                    className="p-2 bg-blue-500 text-white rounded text-sm "
                  >
                    <option value="5days">Last 5 Days</option>
                    <option value="15days">Last 15 Days</option>
                    <option value="1month">Last 1 Month</option>
                  </select>
                </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <SimpleBarChart  timePeriod={timePeriod} />
              </div>
            </div>
          </div>
          <div className="border text-card-foreground col-span-1 bg-white rounded-lg shadow" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Danh Mục</h3>
            </div>
            <div className="">
              <div className="w-full h-[200px] mt-20">
                    <BasicPie />
              </div>
              
            </div>
          </div>
          <div className="border text-card-foreground col-span-1 bg-white rounded-lg shadow p-3" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 pb-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Total Amount </h3>
              <div className="relative">
              <a className="  z-20" onClick={toggleDivVisibility}>
                <svg
                  id="Layer_1"
                  height="25"
                  viewBox="0 0 24 24"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Layer 1"
                >
                  <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1 -9 9zm5-9a1.5 1.5 0 0 1 -1.5 1.5h-2v2a1.5 1.5 0 0 1 -3 0v-2h-2a1.5 1.5 0 0 1 0-3h2v-2a1.5 1.5 0 0 1 3 0v2h2a1.5 1.5 0 0 1 1.5 1.5z" />
                </svg>
              </a>

              <div
                id="addgoats"
                className={`${
                  isVisible ? "block" : "hidden"
                } absolute top-10 left-0 z-20 border-0 rounded-3xl shadow-md  p-3 h-[300px] w-[400px] flex flex-col items-center bg-white`}
              >
                <h1 className="text-2xl text-center font-medium mb-10">
                  Add Income {" "}
                </h1>
                <div className="w-[82%]">
                  <label className="text-sm my-2 text-slate-500">
                    Amount :
                  </label>
                  <input
                    type="text"
                    placeholder=" $ 0.00 "
                    name="TotalReceived"
                    value={newBalance.TotalReceived}
                    onChange={handleInputChange}
                    className="form-control  border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full  bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 "
                  />
                </div>

                <button onClick={handleAddGoat} className="px-5 py-2 my-5 bg-orange-500 text-white rounded-lg hover:opacity-85 ">
                  Add
                </button>
              </div>
            </div>
            </div>
              <>
              <div className='hover:opacity-90  duration-300  flex items-center justify-between w-[100%] p-3 bg-orange-400 rounded-xl px-10   shadow-md cursor-pointer '>
                <div className='flex flex-col '> 
                  <p className='text-white text-sm ≈ '>Total Balance </p>
                  <p className='text-2xl font-bold  '>$ {balance.CurrentBalance}</p>
                </div>
                <div className='text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill='currentColor' viewBox="0 0 24 24" width="30" height="30"><path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,22c-5.514,0-10-4.486-10-10S6.486,2,12,2s10,4.486,10,10-4.486,10-10,10Zm-2-12c0,.378,.271,.698,.644,.76l3.041,.507c1.342,.223,2.315,1.373,2.315,2.733,0,1.654-1.346,3-3,3v2h-2v-2c-1.654,0-3-1.346-3-3h2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1,0-.378-.271-.698-.644-.76l-3.041-.507c-1.342-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-2h2v2c1.654,0,3,1.346,3,3h-2c0-.551-.448-1-1-1h-2c-.552,0-1,.449-1,1Z"/></svg>
                </div>
            </div>
            <div className='hover:opacity-90  duration-300  flex items-center justify-between w-[100%] p-3 bg-red-500 rounded-xl px-10 my-3 shadow-md cursor-pointer '>
                <div className='flex flex-col '> 
                  <p className='text-white text-sm  '>Expenses </p>
                  <p className='text-2xl font-bold  '>$ {balance.TotalSpent}</p>
                </div>
                <div className='text-white'>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" fill='currentColor' width="30" height="30"><path d="M17.71,9.88l-4.3-4.29a2,2,0,0,0-2.82,0L6.29,9.88a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0L11,8V19a1,1,0,0,0,2,0V8l3.29,3.29a1,1,0,1,0,1.42-1.41Z"/></svg>
                </div>
            </div>
            <div className='hover:opacity-90  duration-300  flex items-center justify-between w-[100%] p-3 bg-blue-600 rounded-xl px-10  shadow-md cursor-pointer '>
                <div className='flex flex-col '> 
                  <p className='text-white  text-sm ≈  font-medium'>Income </p>
                  <p className='text-2xl font-bold   '>$ {balance.TotalReceived}</p>
                </div>
                <div className='text-white rotate-180'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" fill='currentColor' width="30" height="30"><path d="M17.71,9.88l-4.3-4.29a2,2,0,0,0-2.82,0L6.29,9.88a1,1,0,0,0,0,1.41,1,1,0,0,0,1.42,0L11,8V19a1,1,0,0,0,2,0V8l3.29,3.29a1,1,0,1,0,1.42-1.41Z"/></svg>
                </div>
            </div>
              </>
          </div>
        </div>
        <div className="border text-card-foreground bg-white rounded-lg shadow" data-v0-t="card">
          <div className='flex items-center justify-between pr-4'>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Lịch sử </h3>
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
              <div >
                 <InputSearch onSearch={handleSearch} />
              </div>
          </div>
          <div className="p-6">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&amp;_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                      STT
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                      Category
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                      Description
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                      Price
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                    Date
                    </th>
                  </tr>
                </thead>
                <tbody className="[&amp;_tr:last-child]:border-0">
                {currentItems.map((transaction,index) => (
                      <tr key={transaction._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                          {index + 1}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                          {transaction.CategoryName}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                          {transaction.Description}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                          {transaction.Amount}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368]">
                          {transaction.Dates}
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

export default Dashboard;