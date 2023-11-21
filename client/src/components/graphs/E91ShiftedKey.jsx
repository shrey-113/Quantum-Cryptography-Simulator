import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function E91ShiftedKey({ shiftedKey }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (shiftedKey.length > 0 && chartRef.current) {
      const uniqueValues = Array.from(new Set(shiftedKey));
      const counts = uniqueValues.map(value =>
        shiftedKey.filter(key => key === value).length
      );

      const options = {
        chart: {
          type: 'scatter'
        },
        title: {
          text: 'Sifted Key Distribution'
        },
        xAxis: {
          title: {
            text: 'Bit Value'
          }
        },
        yAxis: {
          title: {
            text: 'Count'
          }
        },
        series: [{
          name: 'Sifted Key Distribution',
          data: uniqueValues.map((value, index) => [value, counts[index]])
        }],
        credits: {
          enabled: false
        }
      };

      const chart = Highcharts.chart(chartRef.current, options);

      return () => {
        chart.destroy();
      };
    }
  }, [shiftedKey]);

  return <div ref={chartRef} />;
}
