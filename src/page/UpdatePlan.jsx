import  { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFindPlan, updatePlanThunk } from '../redux/planSlice'; // Điều chỉnh đường dẫn nếu cần
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdatePlan() {

  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const goatID = query.get('id'); // Lấy ID từ query string

  const plan = useSelector((state) => state.plans.currentPlan);
  const status = useSelector((state) => state.plans.status);

  const [newGoat, setNewGoat] = useState({
    CategoryName: '',
    TargetAmount: ''
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFindPlan(goatID));
    }
  }, [dispatch, status,goatID]);

  useEffect(() => {
    if (status === 'succeeded' && plan) {
      setNewGoat({
        CategoryName: plan.CategoryName || '',
        TargetAmount: plan.TargetAmount || ''
      });
    }
  }, [plan, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoat((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateClick = () => {
    // Gọi action để cập nhật dữ liệu
    dispatch(updatePlanThunk({ goatID, ...newGoat }));
 
    toast.success('Cập nhật thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

      setNewGoat({
         CategoryName: '',
         TargetAmount: ''
      })

     
    
  };

  return (
    <>
    <ToastContainer />
      <div
        id="addgoats"
        className={`block z-20 border-0 rounded-3xl shadow-md p-3 mt-20 mx-auto h-[450px] w-[400px] flex flex-col items-center bg-white`}
      >
        <h1 className="text-2xl text-center font-medium mb-10">Update Goat</h1>
        <div className="w-[82%]">
          <label className="text-sm my-2 text-slate-500">Goats Name :</label>
          <input
            type="text"
            placeholder=" Something ..."
            name="CategoryName"
            value={newGoat.CategoryName}
            onChange={handleInputChange}
            className="form-control text-sm border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full bg-transparent transition duration-250 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-[82%]">
          <label className="text-sm my-2 text-slate-500">Amount Goat :</label>
          <input
            type="text"
            placeholder=" $ 0.00 "
            name="TargetAmount"
            value={newGoat.TargetAmount}
            onChange={handleInputChange}
            className="form-control border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full bg-transparent transition duration-250 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="px-5 py-2 my-5 bg-orange-500 text-white rounded-lg hover:opacity-85 " onClick={handleUpdateClick}>
          Update
        </button>
      </div>
    </>
  );
}

export default UpdatePlan;
