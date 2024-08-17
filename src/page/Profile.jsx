import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserContext from '../context/UserContext'; // Đảm bảo đường dẫn chính xác
import { fetchFindUser,updateUserThunk } from '../redux/userSlice'; // Đảm bảo đường dẫn chính xác
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const { userID } = useContext(UserContext);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Phone: '',
    Address: ''
  });

  useEffect(() => {
    if (userID) {
      dispatch(fetchFindUser(userID));
    }
  }, [userID, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        FullName: currentUser.FullName || '',
        Email: currentUser.Email || '',
        Phone: currentUser.Phone || '',
        Address: currentUser.Address || ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = () => {
    dispatch(updateUserThunk({ userID, ...formData }));
    toast.success('Cập nhât thành công!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <>
    <ToastContainer />

    <section className="max-w-2xl mx-auto mt-20 p-4 mb-20 bg-white shadow-md rounded-2xl">
      <div className="space-y-4">
        <h1 className="text-2xl text-center font-bold">Thông Tin Cá Nhân</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-600">Họ và tên :</label>
            <input
              type="text"
              id="full-name"
              name="FullName"
              className="mt-1 p-2 w-full border rounded-md"
              value={formData.FullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email :</label>
            <input
              type="text"
              id="email"
              name="Email"
              className="mt-1 p-2 w-full border rounded-md"
              value={formData.Email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Số điện thoại :</label>
            <input
              type="text"
              id="phone"
              name="Phone"
              className="mt-1 p-2 w-full border rounded-md"
              value={formData.Phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600">Địa chỉ :</label>
            <input
              type="text"
              id="address"
              name="Address"
              className="mt-1 p-2 w-full border rounded-md"
              value={formData.Address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-slate-950 mx-auto duration-500 block"
          onClick={handleUpdate}
        >
          Cập nhật
        </button>
      </div>
    </section>
    </>
  );
}

export default Profile;
