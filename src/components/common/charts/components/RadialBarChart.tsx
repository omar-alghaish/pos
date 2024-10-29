import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RadialBarChartProps {
  options: ApexOptions;
  series: number[];
  width?: string | number;
  height?: string | number;
}

const RadialBarChart: React.FC<RadialBarChartProps> = ({ options, series, width = 380, height = 380 }) => {
  return (
    <div>
      <Chart options={options} series={series} type="radialBar" width={width} height={height} />
    </div>
  );
};

export default RadialBarChart;
