// src/components/TimeSeriesChart.tsx
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Typography from "../../typography/Index";

interface TimeSeriesChartProps {
  title?: string;
  series: { name: string; data: [number, number][] }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ title, series }) => {
  const options: ApexOptions = {
    chart: {
      type: "area", // Use 'area' type for gradient under the line
      background: "transparent",
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth", // Makes the line smooth
    },
    xaxis: {
      type: "datetime", // Ensure x-axis is treated as datetime
    },
    yaxis: {
      title: {
        text: "Sales",
      },
    },
    fill: {
      type: "gradient", // Enable gradient fill
      gradient: {
        shade: "light", // Change this to 'light' to apply gradient from top to bottom
        type: "vertical", // Make gradient vertical
        shadeIntensity: 0.5,
        opacityFrom: 0.5, // Opacity of the gradient at the top
        opacityTo: 0, // Opacity of the gradient at the bottom
        stops: [0, 90, 100], // Gradient stops for smooth transition
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    colors: ["#CB3CFF", "#0E43FB", "#21C3FC"],
    grid: {
      show: false, // Remove grid lines if desired
    },
  };

  return (
    <div>
      {title && <Typography variant="h3">{title}</Typography>}
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
