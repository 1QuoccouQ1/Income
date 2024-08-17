import { useState, useEffect } from "react";
import { fetchPlans, DeletePlan, createPlan } from "../redux/planSlice";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Plan() {
  const UserAccountID = localStorage.getItem("UserID");
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.plans);
  const planStatus = useSelector((state) => state.plans.status);
  // Sử dụng useState để quản lý trạng thái hiển thị của div
  const [isVisible, setIsVisible] = useState(false);
  const [newPlan, setNewPlan] = useState({
    UserAccountID,
    CategoryName: "",
    TargetAmount: "",
    CurrentAmount: 0,
    StartDate: "",
    Status: "in_progress",
  });

  useEffect(() => {
    
    if (planStatus === "idle") {
      dispatch(fetchPlans(UserAccountID));
    }
  }, [planStatus, dispatch]);

  useEffect(() => {
    // Kiểm tra điều kiện CurrentAmount >= TargetAmount và hiển thị thông báo
    plans.forEach(plan => {
      if (plan.CurrentAmount >= plan.TargetAmount) {
        toast.warning(`Plan "${plan.CategoryName}" đã đạt mục tiêu!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    });
  }, [plans]);

  // Hàm để chuyển đổi trạng thái hiển thị của div
  const toggleDivVisibility = () => {
    setIsVisible(!isVisible);
    
  };
  const handleAddGoat = () => {
    // Gán giá trị ngày hiện tại cho StartDate nếu chưa có giá trị
    const GoalIDv4 = uuidv4();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    if (newPlan.CategoryName && newPlan.TargetAmount) {
      // Cập nhật newGoat với goatID
      const goatWithID = {
        CategoryID: GoalIDv4,
        ...newPlan,
        StartDate: formattedDate,
      };

      dispatch(createPlan(goatWithID));


      toast.success('Thêm mới thành công!', {
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
        dispatch(fetchPlans(UserAccountID));
      },1000)
    }
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
        dispatch(DeletePlan(goatID));
       
        toast.success('Your file has been deleted', {
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
          dispatch(fetchPlans(UserAccountID));
        },1000)
      }
    });
   
  };
  return (
    <>
    <ToastContainer />
      <div className="w-full bg-[#f4f7fe]">
        <div className="w-full bg-white mx-3 my-2 p-5 rounded-lg h-screen">
          <div className="flex items-center justify-center ">
            <h1 className="text-4xl font-bold mr-5 ">Plans</h1>
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
                } absolute top-10 right-0 z-20 border-0 rounded-3xl shadow-md  p-3 h-[400px] w-[400px] flex flex-col items-center bg-white`}
              >
                <h1 className="text-2xl text-center font-medium mb-10">
                  Add Plan{" "}
                </h1>
                <div className="w-[82%]">
                  <label className="text-sm my-2 text-slate-500">
                    Plan Name :
                  </label>
                  <input
                    type="text"
                    placeholder=" Something ..."
                    name="CategoryName"
                    value={newPlan.CategoryName}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, CategoryName: e.target.value })
                    }
                    className="form-control text-sm  border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 "
                  />
                </div>

                <div className="w-[82%]">
                  <label className="text-sm my-2 text-slate-500">
                    Amount :
                  </label>
                  <input
                    type="text"
                    placeholder=" $ 0.00 "
                    name="TargetAmount"
                    value={newPlan.TargetAmount}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, TargetAmount: e.target.value })
                    }
                    className="form-control  border-b-2 rounded-lg bottom-[30px] border-gray-300 p-[10px] w-full  bg-transparent transition duration-250 focus:outline-none focus:border-blue-500 "
                  />
                </div>

                <button
                  onClick={handleAddGoat}
                  className="px-5 py-2 my-5 bg-orange-500 text-white rounded-lg hover:opacity-85 "
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start  flex-wrap">
          {plans.length === 0 ? (
              <p className="text-center text-xl font-medium my-10">
                Hiện tại chưa có Plan nào hết! Hãy thêm Plan mới nhé!  
              </p>
            ) : (
            plans.map((plan) => (
              <div
                key={plan._id}
                className="flex relative  flex-col items-center min-w-[200px] justify-center shadow-lg py-3 px-10 rounded-md bg-blue-600  text-white my-10 mx-3 cursor-pointer hover:opacity-80 "
              >
                <p className="text-2xl font-medium ">{plan.CategoryName} </p>
                <p>
                  {plan.CurrentAmount}đ / {plan.TargetAmount}đ
                </p>
                <div className="absolute top-2 left-2 cursor-pointer ">
                <a href={`/UpdatePlan?id=${plan.CategoryID}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="white"
                    stroke="white"
                  >
                    <path d="m19.5,0H4.5C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h15c2.481,0,4.5-2.019,4.5-4.5V4.5c0-2.481-2.019-4.5-4.5-4.5Zm3.5,19.5c0,1.93-1.57,3.5-3.5,3.5H4.5c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5h15c1.93,0,3.5,1.57,3.5,3.5v15ZM14.732,5.732L6.025,14.439c-.661.66-1.025,1.539-1.025,2.475v1.586c0,.276.224.5.5.5h1.586c.921,0,1.823-.374,2.475-1.025l8.707-8.707c.975-.975.975-2.561,0-3.535-.943-.945-2.592-.945-3.535,0Zm-5.879,11.535c-.465.466-1.11.732-1.768.732h-1.086v-1.086c0-.668.26-1.296.732-1.768l6.604-6.604,2.121,2.121-6.604,6.604Zm8.707-8.707l-1.396,1.396-2.121-2.121,1.396-1.396c.566-.566,1.555-.566,2.121,0,.585.585.585,1.536,0,2.121Z" />
                  </svg>
                </a>
                </div>
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => handleDeleteGoat(plan.CategoryID)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Plan;
