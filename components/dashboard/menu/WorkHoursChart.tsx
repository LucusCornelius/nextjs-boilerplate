"use client";
import { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { WorkHour } from "@/types/workhour";

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

type Props = { rows: WorkHour[] };

export default function WorkHoursChart({ rows }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    let day = date.getUTCDay();
    if (day === 0) day = 7;
    return day;
  };

  const startOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() - day + 1);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);

    const thisWeekRows = rows.filter((row) => {
      const rowDate = new Date(row.date);
      return rowDate >= weekStart && rowDate < weekEnd;
    });

    const hourWeekData = Array(7).fill(0);
    thisWeekRows.forEach((row) => {
      const day = getDayOfWeek(row.date);
      hourWeekData[day - 1] += parseFloat(row.total_hours || "0");
    });

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Hours Worked",
            data: hourWeekData,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderRadius: 10,
            barPercentage: 0.2,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        scales: { y: { beginAtZero: true } },
        responsive: true,
        plugins: { legend: { position: "top" }, title: { display: true, text: "Hours This Week" } },
      },
    });
  }, [rows]);

  return <canvas ref={canvasRef} />;
}
