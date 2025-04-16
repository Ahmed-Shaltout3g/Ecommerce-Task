import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart() {
    const { t } = useTranslation();
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const roleCounts = users.reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(roleCounts).map((role) => t(`chart.${role}`));

        setData({
            labels,
            datasets: [
                {
                    data: Object.values(roleCounts),
                    backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                },
            ],
        });
    }, [t]);

    return (
        <div className="card p-3">
            <h5 className="mb-3">{t("chart.usersByRole")}</h5>
            <Pie data={data} />
        </div>
    );
}
