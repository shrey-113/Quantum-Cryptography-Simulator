import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function LineGraph({ aliceBases, bobBases }) {
  const uniqueBases = Array.from(new Set([...aliceBases, ...bobBases])).sort();
  const aliceCounts = uniqueBases.map(b => aliceBases.filter(base => base === b).length);
  const bobCounts = uniqueBases.map(b => bobBases.filter(base => base === b).length);

  const options = {
    chart: {
      type: "line",
      width: 800,
      height: 400,
    },
    title: {
      text: "Bases Distribution",
    },
    xAxis: {
      categories: uniqueBases,
      title: {
        text: 'Basis'
      }
    },
    yAxis: {
      title: {
        text: 'Count'
      }
    },
    series: [
      {
        name: "Alice",
        data: aliceCounts,
        marker: {
          symbol: 'circle'
        }
      },
      {
        name: "Bob",
        data: bobCounts,
        marker: {
          symbol: 'circle'
        }
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
  };

  return (
    <div className="highcharts-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
