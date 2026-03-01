// src/components/ChartComponents.js
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import classnames from 'classnames';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


const chartContainerStyle = 'w-[600px] p-2.5 bg-white border border-gray-200 rounded-lg shadow-md m-2.5';

const piechartContainerStyle = 'w-[400px] h-[400px] p-2.5 bg-white border border-gray-200 rounded-lg shadow-md m-2.5';

const lineChartContainerClasses = classnames(
  chartContainerStyle,
  'xsm:w-[320px]',
  'xsm:h-[170px]',
  'xsm:m-[5px]',
  'xsm:p-[5px]',
  'sm:w-[400px]',
  'sm:h-[250px]',
  'md:w-[600px]', 
  'md:h-[350px]',
  'lg:w-[700px]',
  'lg:h-[400px]'
);

const pieChartContainerClasses = classnames(
  piechartContainerStyle, 
  'xsm:w-[300px]',
  'xsm:h-[300px]',
  'sm:w-[350px]', 
  'sm:h-[350px]',
  'md:w-[400px]', 
  'md:h-[400px]'
);

// Sample data for the charts
const listingsData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Listings',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: '#006CE4',
      tension: 0.1
    }
  ]
};

const revenueData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [10000, 20000, 15000, 22000, 18000, 25000, 30000],
      fill: false,
      borderColor: '#006CE4',
      tension: 0.1
    }
  ]
};

const bookingStatusData = {
  labels: ['Upcoming', 'Completed', 'Cancelled'],
  datasets: [
    {
      label: 'Bookings',
      data: [300, 500, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4
    }
  ]
};

const monthlyBookingsData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Bookings',
      data: [52, 76, 155, 210, 350, 400, 550],
      fill: false,
      borderColor: '#006CE4',
      tension: 0.1
    }
  ]
};

export const ListingsLineChart = () => (
    <div className={lineChartContainerClasses}>
      <Line data={listingsData} />
    </div>
  );
  
  export const RevenueLineChart = () => (
    <div className={lineChartContainerClasses}>
      <Line data={revenueData} />
    </div>
  );
  
  export const BookingStatusPieChart = () => (
    <div className={pieChartContainerClasses}>
      <Pie data={bookingStatusData} />
    </div>
  );
  
  export const MonthlyBookingsLineChart = () => (
    <div className={lineChartContainerClasses}>
      <Line data={monthlyBookingsData} />
    </div>
  );
