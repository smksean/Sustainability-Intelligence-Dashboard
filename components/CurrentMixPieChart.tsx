"use client";

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

  // Calculate percentages
  const hydroPercent = (hydro_mw / total) * 100;
  const windPercent = (wind_mw / total) * 100;
  const solarPercent = (solar_mw / total) * 100;
  const nuclearPercent = (nuclear_mw / total) * 100;
  const fossilPercent = (fossil_mw / total) * 100;

  // Calculate cumulative percentages for CSS conic-gradient
  let cumulative = 0;
  const hydroStart = cumulative;
  cumulative += hydroPercent;
  const windStart = cumulative;
  cumulative += windPercent;
  const solarStart = cumulative;
  cumulative += solarPercent;
  const nuclearStart = cumulative;
  cumulative += nuclearPercent;
  const fossilStart = cumulative;

  const pieStyle = {
    background: `conic-gradient(
      #3B82F6 0deg ${hydroStart * 3.6}deg,
      #10B981 ${hydroStart * 3.6}deg ${windStart * 3.6}deg,
      #F59E0B ${windStart * 3.6}deg ${solarStart * 3.6}deg,
      #8B5CF6 ${solarStart * 3.6}deg ${nuclearStart * 3.6}deg,
      #EF4444 ${nuclearStart * 3.6}deg ${fossilStart * 3.6}deg
    )`
  };

  const legendItems = [
    { label: 'Hydro', value: hydro_mw, percent: hydroPercent, color: '#3B82F6' },
    { label: 'Wind', value: wind_mw, percent: windPercent, color: '#10B981' },
    { label: 'Solar', value: solar_mw, percent: solarPercent, color: '#F59E0B' },
    { label: 'Nuclear', value: nuclear_mw, percent: nuclearPercent, color: '#8B5CF6' },
    { label: 'Fossil', value: fossil_mw, percent: fossilPercent, color: '#EF4444' }
  ];

  return (
    <div className="w-full">
      {/* Pie Chart */}
      <div className="flex justify-center mb-6">
        <div 
          className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
          style={pieStyle}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-3"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {item.value.toFixed(1)} MW
              </div>
              <div className="text-xs text-gray-500">
                {item.percent.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
        <div className="text-sm text-blue-600 font-medium">
          Total Generation
        </div>
        <div className="text-lg font-bold text-blue-900">
          {total.toFixed(1)} MW
        </div>
      </div>
    </div>
  );
}