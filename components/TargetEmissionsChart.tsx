"use client";

interface TargetEmissionsChartProps {
  netZeroData: Array<{
    year: number;
    actual_emissions_mt: number;
    target_emissions_mt: number;
    alignment_pct: number;
  }>;
}

export function TargetEmissionsChart({ netZeroData }: TargetEmissionsChartProps) {
  if (!netZeroData || netZeroData.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <div className="text-gray-500 text-sm mb-2">
          No net-zero data available
        </div>
        <div className="text-xs text-gray-400">
          Waiting for annual emissions data...
        </div>
      </div>
    );
  }

  // Sort data by year
  const sortedData = [...netZeroData].sort((a, b) => a.year - b.year);
  
  // Get the range for scaling
  const allValues = [...sortedData.map(d => d.actual_emissions_mt), ...sortedData.map(d => d.target_emissions_mt)];
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue;

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Actual vs Target Emissions
        </h3>
        <p className="text-sm text-gray-600">
          Annual emissions pathway showing progress toward net-zero 2050
        </p>
      </div>
      
      {/* Simple bar chart using CSS */}
      <div className="space-y-3">
        {sortedData.map((item, index) => {
          const actualHeight = ((item.actual_emissions_mt - minValue) / range) * 100;
          const targetHeight = ((item.target_emissions_mt - minValue) / range) * 100;
          const isAhead = item.actual_emissions_mt < item.target_emissions_mt;
          
          return (
            <div key={item.year} className="flex items-end space-x-2">
              <div className="w-12 text-sm font-medium text-gray-700">
                {item.year}
              </div>
              
              <div className="flex-1 flex items-end space-x-1">
                {/* Target bar */}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Target</div>
                  <div 
                    className="bg-blue-200 rounded-t"
                    style={{ height: `${Math.max(targetHeight, 5)}px` }}
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {item.target_emissions_mt.toFixed(1)} Mt
                  </div>
                </div>
                
                {/* Actual bar */}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Actual</div>
                  <div 
                    className={`rounded-t ${isAhead ? 'bg-green-400' : 'bg-red-400'}`}
                    style={{ height: `${Math.max(actualHeight, 5)}px` }}
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {item.actual_emissions_mt.toFixed(1)} Mt
                  </div>
                </div>
              </div>
              
              {/* Alignment percentage */}
              <div className="w-16 text-right">
                <div className="text-xs text-gray-500 mb-1">Alignment</div>
                <div className={`text-sm font-semibold ${
                  item.alignment_pct >= 100 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.alignment_pct.toFixed(0)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
          <span className="text-gray-600">Target</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
          <span className="text-gray-600">Actual (Ahead)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
          <span className="text-gray-600">Actual (Behind)</span>
        </div>
      </div>
    </div>
  );
}
