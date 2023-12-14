import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import AdminService from '../../services/AdminService';
import CardStats from './CardStats';
import Table from '../../components/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [orderQuantity, setOrderQuantity] = useState([]);
    const [revenue, setRevenue] = useState([]);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    // const [data, setData] = useState();
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const statistic = await AdminService.getOrderStatistic();
                console.log(statistic);
                const revenue = convertObjectToNumbers(statistic.revenueByMonth);
                const orderQuan = convertObjectToNumbers(statistic.productSoldByMonth);
                setOrderQuantity(orderQuan);
                setRevenue(revenue);
                setTotalProducts(statistic.totalProduct);
                setTotalRevenue(statistic.totalRevenue);

                console.log(revenue);
                console.log(orderQuan);
            } catch (err) {
                toast.error('Load dashboard failed', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
        fetchMyAPI();
    }, []);
    console.log(revenue);
    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        datasets: [
            {
                label: 'revenue',
                data: [...revenue],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
            {
                label: 'product quantity',
                data: [...orderQuantity],
                fill: false,
                borderColor: '#742774',
            },
        ],
    };
    return (
        <div className="space-y-8">
            <label className="text-[40px] font-bold ">DashBoard</label>

            <div className="flex justify-around w-full">
                {' '}
                <div className="w-[50%]">
                    <Line data={data} />
                </div>
                <div className="w-[50%] flex justify-center">
                    <div className="flex flex-col w-full">
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="TOTAL PRODUCTS"
                                statTitle={`${totalProducts}`}
                                statPercentColor="text-emerald-500"
                                statDescripiron="Total Product has been sold"
                                statIconName="far fa-chart-bar"
                                statIconColor="bg-red-500"
                            />
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="TOTAL REVENUE"
                                statTitle={`${totalRevenue}`}
                                statPercentColor="text-red-500"
                                statDescripiron="Total Revenue "
                                statIconName="fas fa-chart-pie"
                                statIconColor="bg-orange-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Table type="orders" />
            </div>
            <ToastContainer />
        </div>
    );
};
function convertObjectToNumbers(obj) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const result = months.map((month) => {
        const value = obj[month] || 0;
        return parseInt(value, 10);
    });

    return result;
}

export default Dashboard;
