import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFindGoat, updateGoatThunk } from '../redux/goatSlice'; // Điều chỉnh đường dẫn nếu cần
import { fetchFindUser, updateUserThunk } from "../redux/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPrice() {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const goatID = query.get('id'); // Lấy ID từ query string
  const UserAccountID = localStorage.getItem("UserID");

  const goat = useSelector((state) => state.goats.currentGoat);
  const status = useSelector((state) => state.goats.status);


  const users = useSelector((state) => state.users.currentUser);
  const userStatus = useSelector((state) => state.users.status);


  const [newGoat, setNewGoat] = useState({
    CurrentAmount: ''
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFindGoat(goatID));
    }
    if (userStatus === "idle") {
      dispatch(fetchFindUser(UserAccountID));
    }
  }, [dispatch, status,goatID,userStatus]);

  useEffect(() => {
    if (status === 'succeeded' && goat) {
    //   setNewGoat({
    //     CurrentAmount: goat.CurrentAmount || ''
    //   });
    }
  }, [goat, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoat((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {

    const currentAmount = parseFloat(goat.CurrentAmount) || 0;
    const newAmount = parseFloat(newGoat.CurrentAmount) || 0;
    const updatedAmount = currentAmount + newAmount;

    // Gọi action để cập nhật dữ liệu
    dispatch(updateGoatThunk({ goatID, CurrentAmount : updatedAmount }));

    toast.success('Thêm tiền thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

      const newUsers = {
        UserAccountID,
        CurrentBalance:
          parseInt(users.CurrentBalance, 10) - parseInt(newGoat.CurrentAmount, 10),
        TotalSpent: parseInt(users.TotalSpent) + parseInt(newGoat.CurrentAmount),
      };

      dispatch(updateUserThunk({ id: UserAccountID, ...newUsers }));

      setNewGoat({
        CurrentAmount: ''
      })
    
  };

  return (
    <>
    <ToastContainer />

      <div
        id="addgoats"
        className={`block z-20 border-0 rounded-3xl shadow-md p-3 mt-20 mx-auto h-[450px] w-[400px] flex flex-col items-center bg-white`}
      >
        <h1 className="text-2xl text-center font-medium mb-10">Add Price</h1>
        <div className="w-[82%]">
          <label className="text-sm my-2 text-slate-500">Price :</label>
          <input
            type="text"
            placeholder=" $ 0.00 "
            name="CurrentAmount"
            value={newGoat.CurrentAmount}
            onChange={handleInputChange}
            className="form-control border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full bg-transparent transition duration-250 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="px-5 py-2 my-5 bg-orange-500 text-white rounded-lg hover:opacity-85 " onClick={handleUpdateClick}>
        Add
        </button>
      </div>
    </>
  );
}

export default AddPrice;
