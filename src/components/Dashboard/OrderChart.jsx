import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useTranslation } from 'react-i18next'; // <-- الترجمة

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function OrderChart() {
    const { t } = useTranslation(); // <-- استخدام الترجمة
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        const orderCountsByDate = orders.reduce((acc, curr) => {
            const date = curr.date.split('T')[0]; // assuming format "YYYY-MM-DDTHH:MM:SS"
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        setData({
            labels: Object.keys(orderCountsByDate),
            datasets: [
                {
                    label: t("chart.numberOfOrders"), // <-- تم الترجمة هنا
                    data: Object.values(orderCountsByDate),
                    borderColor: 'rgba(75, 192, 192, 0.6)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
            ],
        });
    }, [t]); // <-- للتحديث عند تغيير اللغة

    return (
        <div className="card p-3">
            <h5 className="mb-3">{t("chart.ordersByDate")}</h5> {/* <-- تم الترجمة هنا */}
            <Line data={data} />
        </div>
    );
}
