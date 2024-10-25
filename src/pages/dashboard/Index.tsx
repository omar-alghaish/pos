import React, { useState } from "react";
import RadialBarChart from "../../components/common/charts/components/RadialBarChart";
import { ApexOptions } from "apexcharts";
import StateCard from "./components/StateCard";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Typography from "../../components/common/typography/Index";
import Button from "../../components/common/button/Index";
import { HiDownload } from "react-icons/hi";
import ColumnChart from "../../components/common/charts/components/ColumnChart";
import TimeSeriesChart from "../../components/common/charts/components/TimeSeriesChart";
import Header from "../../components/header/Index";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [radialLabels, setRadialLabels] = useState([
    "Apples",
    "Oranges",
    "Bananas",
  ]);
  const [radialColors, setRadialColors] = useState([
    "#CB3CFF",
    "#0E43FB",
    "#21C3FC",
  ]);
  const [chartOptions] = useState<ApexOptions>({
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "60%",
        },
        track: {
          show: false,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return `${w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0
              )}`;
            },
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: radialLabels,
    // Custom colors for the radial bars
    colors: radialColors, // Array of colors for each circle
  });

  const [chartSeries] = useState([67, 84, 50]);

  const barCategories = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const barSeries = [
    {
      name: "Product A",
      data: [60, 70, 55, 50, 80, 90, 100, 70, 60, 90, 110, 130], // Sales for Product A
    },
    {
      name: "Product B",
      data: [30, 40, 35, 30, 49, 60, 70, 20, 40, 60, 80, 90], // Sales for Product B
    },
    {
      name: "Product C",
      data: [50, 60, 65, 55, 70, 80, 90, 50, 80, 70, 100, 110], // Sales for Product C
    },
  ];


  type SeriesData = [number, number];

  interface Series {
    name: string;
    data: SeriesData[];
  }
  
  const series: Series[] = [
    {
      name: "Series 1",
      data: [
        [1327359600000, 30.95],
        [1327446000000, 31.34],
        [1327532400000, 31.18],
        [1327618800000, 31.05],
        [1327878000000, 31.5],
        [1327964400000, 32.25],
        [1328050800000, 33.1],
      ],
    },
    {
      name: "Series 2",
      data: [
        [1327259600000, 20.5],  // Different starting point and values
        [1327356000000, 21.4],
        [1327452400000, 22.18],
        [1327558800000, 23.5],
        [1327858000000, 24.25],
        [1327954400000, 24.85],
        [1328050800000, 25.5],  // Different end point
      ],
    },
    {
      name: "Series 3",
      data: [
        [1327259600000, 15.5],  // Even earlier start with distinct values
        [1327356000000, 18.2],
        [1327552400000, 19.4],
        [1327658800000, 21.1],
        [1327858000000, 21.8],
        [1327954400000, 22.75],
        [1328150800000, 23.4],  // Later end
      ],
    },
  ];
  

  return (
    <div className="dashboard_page">
      <Header />
      <div className="state_cards_container">
        <StateCard
          icon={<FaHeart />}
          title="Saved Products"
          total="50.8k"
          percentage="28.4"
          status="increase"
        />
        <StateCard
          icon={<FaShoppingCart />}
          title="Purchased Items"
          total="8.3k"
          percentage="12.5"
          status="decrease"
        />
        <StateCard
          icon={<FaHeart />}
          title="Saved Products"
          total="50.8k"
          percentage="28.4"
          status="increase"
        />
        <StateCard
          icon={<FaShoppingCart />}
          title="Purchased Items"
          total="8.3k"
          percentage="12.5"
          status="decrease"
        />
      </div>
      <div className="midel_section">
        <div className="radial_dashboard">
          <div className="header">
            <Typography variant="h5"> Website Visitors</Typography>{" "}
            <Button variant="contained">
              Export <HiDownload />
            </Button>
          </div>
          <div className="radial_char_container">
            <RadialBarChart
              options={chartOptions}
              series={chartSeries}
              width={"100%"}
            />
          </div>

          <div className="info">
            <ul>
              {radialLabels.map((item, index) => {
                return (
                  <div className="item_container">
                    <div className="item">
                      <div
                        className="color"
                        style={{ backgroundColor: radialColors[index] }}
                      />
                      <Typography variant="subtitle1">{item}</Typography>
                    </div>
                    {chartSeries[index]}%
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="bar_dashboard">
          <div className="header"></div>
          <ColumnChart title="Test" categories={barCategories} series={barSeries} />
        </div>
      </div>
      <div className="line_char_section">
      <TimeSeriesChart title="Sales Over Time" series={series} />

      </div>
    </div>
  );
};
export default Dashboard;
