"use client";
import Plot from 'react-plotly.js';

interface CurrentMixPieChartProps {
  data: {
    hydro_mw: number;
    wind_mw: number;
    solar_mw: number;
    nuclear_mw: number;
    fossil_mw: number;
  };
}

export function CurrentMixPieChart({ data }: CurrentMixPieChartProps) {
  const { hydro_mw, wind_mw, solar_mw, nuclear_mw, fossil_mw } = data;
  
  // Calculate total for percentages
  const total = hydro_mw + wind_mw + solar_mw + nuclear_mw + fossil_mw;
  
  if (total === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-500 text-sm mb-2">
          No data available
        </div>
        <div className="text-xs text-gray-400">
          Waiting for generation data...
        </div>
      </div>
    );
  }

  const plotData = [
    {
      values: [hydro_mw, wind_mw, solar_mw, nuclear_mw, fossil_mw],
      labels: ['Hydro', 'Wind', 'Solar', 'Nuclear', 'Fossil'],
      type: 'pie' as const,
      marker: {
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444']
      },
      textinfo: 'label+percent' as const,
      textposition: 'outside' as const,
      hovertemplate: '<b>%{label}</b><br>' +
                    'Power: %{value:.1f} MW<br>' +
                    'Percentage: %{percent}<br>' +
                    '<extra></extra>'
    }
  ];

  const layout = {
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.1,
      x: 0.5,
      xanchor: 'center'
    },
    margin: { t: 20, b: 40, l: 20, r: 20 },
    height: 400,
    font: {
      family: 'Inter, system-ui, sans-serif',
      size: 12
    }
  };

  const config = {
    displayModeBar: false,
    responsive: true
  };

  return (
    <div className="w-full">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
