import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Stack } from "@mui/material";

export default function ScatterPlot({
  siftedAliceBits,
  siftedBobBits,
  aliceBits,
  matchingBases,
}) {
  const indices = Array.from({ length: siftedAliceBits.length }, (_, i) => i);

  // Sifted Key Comparison Chart
  const siftedKeyComparisonOptions = {
    chart: {
      type: "scatter",
      width: 600,
      height: 400,
    },
    title: {
      text: "Sifted Key Comparison",
    },
    xAxis: {
      title: {
        text: "Bit Position",
      },
      categories: indices.map(String),
    },
    yAxis: {
      title: {
        text: "Bit Value",
      },
    },
    series: [
      {
        name: "Alice",
        data: siftedAliceBits.map((bit, index) => [index, bit]),
        marker: {
          symbol: "circle",
          radius: 5,
        },
      },
      {
        name: "Bob",
        data: siftedBobBits.map((bit, index) => [index, bit]),
        marker: {
          symbol: "circle",
          radius: 5,
        },
      },
    ],
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
  };

  // Error Distribution Chart
  const errors = aliceBits.reduce((acc, _, index) => {
    if (matchingBases[index] && aliceBits[index] !== siftedBobBits[index]) {
      acc.push(index);
    }
    return acc;
  }, []);

  const errorDistributionOptions = {
    chart: {
      type: "scatter",
      width: 600,
      height: 400,
    },
    title: {
      text: "Error Distribution in Sifted Keys",
    },
    xAxis: {
      title: {
        text: "Bit Position",
      },
      categories: indices.map(String),
    },
    yAxis: {
      title: {
        text: "Bit Value",
      },
    },
    series: [
      {
        name: "Alice",
        data: aliceBits.map((bit, index) => [index, bit]),
        marker: {
          symbol: "circle",
          radius: 4,
        },
        color: "skyblue",
        zIndex: 2,
      },
      {
        name: "Bob",
        data: siftedBobBits.map((bit, index) => [index, bit]),
        marker: {
          symbol: "circle",
          radius: 4,
        },
        color: "lightcoral",
        zIndex: 2,
      },
      {
        name: "Errors",
        data: errors.map((index) => [index, siftedBobBits[index]]),
        marker: {
          symbol: "circle",
          radius: 6,
          fillColor: "red",
        },
        zIndex: 3,
      },
    ],
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="highcharts-container">
      <Stack direction="column" spacing={5}>
        <HighchartsReact
          highcharts={Highcharts}
          options={siftedKeyComparisonOptions}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={errorDistributionOptions}
        />
      </Stack>
    </div>
  );
}
