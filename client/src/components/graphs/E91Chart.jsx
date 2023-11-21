import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarGraph({ aliceBases, bobBases }) {
  const uniqueBases = Array.from(new Set([...aliceBases, ...bobBases])).sort();
  const aliceCounts = uniqueBases.map(b => aliceBases.filter(base => base === b).length);
  const bobCounts = uniqueBases.map(b => bobBases.filter(base => base === b).length);

  const options = {
    chart: {
      type: "column" 
    },
    title: {
      text: "Bases Distribution"
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
        color: 'rgba(165,170,217,1)' // Color for Alice's bars
      },
      {
        name: "Bob",
        data: bobCounts,
        color: 'rgba(126,86,134,.9)' // Color for Bob's bars
      },
    ],
    credits: {
      enabled: false
    },
    legend: {
      enabled: true
    }
  };

  return (
    <div className="highcharts-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
