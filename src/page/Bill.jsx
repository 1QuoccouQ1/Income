import { useState, useEffect } from "react";
import { fetchBills, createBill } from "../redux/billSlice";
import { fetchPlans, updatePlanThunk } from "../redux/planSlice";
import { fetchFindUser, updateUserThunk } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import InputSearch from "../components/inputSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bill() {
  const UserAccountID = localStorage.getItem("UserID");
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.bills);
  const billStatus = useSelector((state) => state.bills.status);

  const plans = useSelector((state) => state.plans.plans);
  const planStatus = useSelector((state) => state.plans.status);

  const users = useSelector((state) => state.users.currentUser);
  const userStatus = useSelector((state) => state.users.status);

  // Dữ liệu phân trang
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("UserName");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Số item trên 1 trang

  const [newBill, setNewBill] = useState({
    UserAccountID,
    CategoryID: plans.length > 0 ? plans[0].CategoryID : "",
    Amount: "",
    Dates: "",
    Description: "",
    CategoryName: plans.length > 0 ? plans[0].CategoryName : "",
  });

  useEffect(() => {
    if (billStatus === "idle") {
      dispatch(fetchBills(UserAccountID));
    }
    if (planStatus === "idle") {
      dispatch(fetchPlans(UserAccountID));
    }
    if (userStatus === "idle") {
      dispatch(fetchFindUser(UserAccountID));
    }
  }, [billStatus, planStatus, userStatus, dispatch]);

  useEffect(() => {
    // Ensure default values are set when plans are fetched
    if (plans.length > 0 && !newBill.CategoryID) {
      setNewBill((prevBill) => ({
        ...prevBill,
        CategoryID: plans[0].CategoryID,
        CategoryName: plans[0].CategoryName,
      }));
    }
  }, [plans]);

  const handleAddGoat = () => {
    // Gán giá trị ngày hiện tại cho StartDate nếu chưa có giá trị
    const GoalIDv4 = uuidv4();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    if (newBill.Description && newBill.Amount) {
      // Cập nhật newGoat với goatID
      const goatWithID = {
        TransactionID: GoalIDv4,
        CategoryID: "",
        CategoryName: "",
        ...newBill,
        Dates: formattedDate,
      };

      // Tìm kế hoạch với CategoryID tương ứng
      const selectedPlan = plans.find(
        (plan) => plan.CategoryID === goatWithID.CategoryID
      );

      // Nếu tìm thấy kế hoạch, lấy CurrentAmount
      const currentAmount = selectedPlan ? selectedPlan.CurrentAmount : "";

      const newPlans = {
        CategoryID: goatWithID.CategoryID,
        CurrentAmount: parseInt(currentAmount) + parseInt(goatWithID.Amount),
      };
      const id = newPlans.CategoryID;

      dispatch(updatePlanThunk({ id, ...newPlans }));

      const newUsers = {
        UserAccountID,
        CurrentBalance:
          parseInt(users.CurrentBalance, 10) - parseInt(goatWithID.Amount, 10),
        TotalSpent: parseInt(users.TotalSpent) + parseInt(goatWithID.Amount),
      };

      // console.log(newUsers);
      dispatch(updateUserThunk({ id: UserAccountID, ...newUsers }));

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(createBill(goatWithID));
          setTimeout(() => {
            dispatch(fetchBills(UserAccountID));
          }, 500);
          toast.success("Thêm mới thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          // Reset form fields
          setNewBill({
            UserAccountID,
            CategoryID: plans.length > 0 ? plans[0].CategoryID : "", // Reset to default
            Amount: "",
            Dates: "",
            Description: "",
            CategoryName: plans.length > 0 ? plans[0].CategoryName : "", // Reset to default
          });
        }
      });
    }
  };

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

  return (
    <>
      <ToastContainer />

      <div className="w-full bg-[#f4f7fe]">
        <div className="w-full bg-white mx-3 my-2 p-5 rounded-lg h-screen ">
          <div className="flex items-center justify-center ">
            <h1 className="text-4xl font-bold mr-5 mb-10  ">Chi Tiêu</h1>
          </div>
          <div className="flex ">
            <div className="border-0 rounded-3xl shadow-md  p-3 h-[500px] w-[400px] flex flex-col items-center shrink-0">
              <h1 className="text-2xl text-center font-medium mb-10">
                Add Expense{" "}
              </h1>
              <div className="w-[82%]">
                <label className="text-sm my-2 text-slate-500">Name :</label>
                <input
                  type="text"
                  placeholder=" Something ..."
                  name="Description"
                  value={newBill.Description}
                  onChange={(e) =>
                    setNewBill({ ...newBill, Description: e.target.value })
                  }
                  className="form-control text-sm  border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 "
                />
              </div>

              <div className="w-[82%]">
                <label className="text-sm my-2 text-slate-500">Amount :</label>
                <input
                  type="text"
                  placeholder=" $ 0.00 "
                  name="Amount"
                  value={newBill.Amount}
                  onChange={(e) =>
                    setNewBill({ ...newBill, Amount: e.target.value })
                  }
                  className="form-control  border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full  bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 "
                />
              </div>

              <div className="w-[82%]">
                <label className="text-sm my-2 text-slate-500">
                  Danh Mục :
                </label>
                <select
                  className=" py-3 px-3 border w-full selection:  border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newBill.CategoryID}
                  onChange={(e) => {
                    const selectedPlan = plans.find(
                      (plan) => plan.CategoryID === e.target.value
                    );
                    setNewBill({
                      ...newBill,
                      CategoryID: e.target.value,
                      CategoryName: selectedPlan
                        ? selectedPlan.CategoryName
                        : "",
                    });
                  }}
                >
                  {plans.map((plan) => (
                    <option key={plan.CategoryID} value={plan.CategoryID}>
                      {plan.CategoryName}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddGoat}
                className="px-5 py-2 my-5 bg-orange-500 text-white rounded-lg hover:opacity-85 "
              >
                Payment
              </button>
            </div>
            <div className="px-8 w-full ">
              <div
                className="border text-card-foreground bg-white rounded-lg shadow"
                data-v0-t="card"
              >
                <div className="flex items-center justify-between pr-4">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                      Transaction History
                    </h3>
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
                          <th className="h-12 px-4 w-5 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                            STT
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center ">
                            Category
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center ">
                            Description
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                            Price
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium [&amp;:has([role=checkbox])]:pr-0 text-sm text-[#5f6368] text-center">
                            Date
                          </th>
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
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
