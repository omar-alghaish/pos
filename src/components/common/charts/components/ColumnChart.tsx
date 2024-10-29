// src/components/ColumnChart.tsx
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

interface ColumnChartProps {
  title?: string;
  categories: string[];
  series: { name: string; data: number[] }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  title,
  categories,
  series,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Sales",
      },
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: false,
    },
    colors: ["#CB3CFF", "#0E43FB", "#21C3FC"],
    legend: {
      show: false, // Hide the default legend
    },
  };

  return (
    <div className="column_chart_container">
      <div className="header">
              {title && <h2>{title}</h2>}

        {series.map((item, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-marker"
              style={{
                backgroundColor: options.colors ? options.colors[index] : "#000",
              }}
            />
            <span className="legend-label">{item.name}</span>
          </div>
        ))}
      </div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
