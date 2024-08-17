import { PieChart } from '@mui/x-charts/PieChart';
import { fetchPlans, DeletePlan, createPlan } from "../../redux/planSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";


export default function BasicPie() {
  const UserAccountID = localStorage.getItem("UserID");
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans.plans);
  const planStatus = useSelector((state) => state.plans.status);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (planStatus === "idle") {
      dispatch(fetchPlans(UserAccountID));
    }
  }, [planStatus, dispatch,UserAccountID]);

  useEffect(() => {
    if (plans.length > 0) {
      // Chuyển đổi dữ liệu thành định dạng { id, value, label }
      const formattedData = plans.map((plan, index) => {
        // Tính giá trị phần trăm
        const percentage = (plan.CurrentAmount / plan.TargetAmount) * 100;

        return {
          id: index, // hoặc plan.CategoryID nếu bạn muốn dùng ID của danh mục
          value: percentage, // Giá trị phần trăm để hiển thị trên biểu đồ
          label: plan.CategoryName // Nhãn cho từng phần của biểu đồ
        };
      });
      setPieData(formattedData);
    }
  }, [plans]);
  return (
    <PieChart
      series={[
        {
          data: pieData,
        },
      ]}
      width={350}
      height={150}
    />
  );
}
