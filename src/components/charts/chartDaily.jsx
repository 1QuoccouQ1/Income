import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import { fetchBills } from "../../redux/billSlice";
import { useSelector, useDispatch } from "react-redux";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween); // Cấu hình plugin isBetween

// Hàm tiện ích để nhóm dữ liệu theo ngày
const groupByDate = (bills, startDate, endDate) => {
  const groupedData = {};
  bills.forEach(bill => {
    const date = dayjs(bill.Dates).format('YYYY-MM-DD');
    if (dayjs(date).isBetween(startDate, endDate, null, '[]')) {
      if (!groupedData[date]) {
        groupedData[date] = { income: 0, expenses: 0 };
      }
      if (bill.Amount > 0) {
        groupedData[date].income += parseFloat(bill.Amount);
      } else {
        groupedData[date].expenses += parseFloat(bill.Amount);
      }
    }
  });
  return groupedData;
};

// Hàm tiện ích để tạo dữ liệu cho biểu đồ
const createChartData = (groupedData) => {
  const dates = Object.keys(groupedData).sort();
  const incomeData = dates.map(date => groupedData[date].income);
  const expensesData = dates.map(date => groupedData[date].expenses);

  return {
    xLabels: dates,
    pData: expensesData,
    uData: incomeData
  };
};

export default function SimpleBarChart({ timePeriod }) {
  const UserAccountID = localStorage.getItem("UserID");
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bills.bills);
  const billStatus = useSelector((state) => state.bills.status);

  const [data, setData] = useState({ xLabels: [], pData: [], uData: [] });

  useEffect(() => {
    if (billStatus === "idle") {
      dispatch(fetchBills(UserAccountID));
    }
    // console.log(bills);
  }, [billStatus, dispatch]);

  useEffect(() => {
    if (bills.length > 0) {
      let startDate, endDate;

      switch (timePeriod) {
        case '5days':
          endDate = dayjs().format('YYYY-MM-DD');
          startDate = dayjs().subtract(5, 'day').format('YYYY-MM-DD');
          break;
        case '15days':
          endDate = dayjs().format('YYYY-MM-DD');
          startDate = dayjs().subtract(15, 'day').format('YYYY-MM-DD');
          break;
        case '1month':
          endDate = dayjs().format('YYYY-MM-DD');
          startDate = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
          break;
        default:
          endDate = dayjs().format('YYYY-MM-DD');
          startDate = dayjs().subtract(5, 'day').format('YYYY-MM-DD');
      }

      const groupedData = groupByDate(bills, startDate, endDate);
      const chartData = createChartData(groupedData);
      setData(chartData);
    }
  }, [bills, timePeriod]);

  return (
    <BarChart
      width={500}
      height={250}
      series={[
        // { data: data.pData, label: 'Expenses', id: 'pvId' },
        { data: data.uData, label: 'Expenses', id: 'uvId' },
      ]}
      xAxis={[{ data: data.xLabels, scaleType: 'band' }]}
    />
  );
}
