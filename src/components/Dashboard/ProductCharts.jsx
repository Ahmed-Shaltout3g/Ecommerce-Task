import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useTranslation } from 'react-i18next'; // <-- مكتبة الترجمة

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProductCharts() {
    const { t } = useTranslation(); // <-- استخدام الترجمة

    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("admin_products")) || [];

        const categoryCounts = storedProducts.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + 1;
            return acc;
        }, {});

        setData({
            labels: Object.keys(categoryCounts),
            datasets: [
                {
                    label: t("chart.numberOfProducts"), // <-- تم الترجمة هنا
                    data: Object.values(categoryCounts),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        });
    }, [t]); // <-- يعيد التحديث عند تغيير اللغة

    return (
        <div className="card p-3">
            <h5 className="mb-3">{t("chart.productsByCategory")}</h5> {/* <-- تم الترجمة هنا */}
            <Bar data={data} />
        </div>
    );
}
