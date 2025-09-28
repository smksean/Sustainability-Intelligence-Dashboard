"use client";

interface DataChangeIndicatorProps {
  currentValue: number;
  previousValue: number;
  unit: string;
  label: string;
  isUpdating?: boolean;
}

export function DataChangeIndicator({ 
  currentValue, 
  previousValue, 
  unit, 
  label,
  isUpdating = false 
}: DataChangeIndicatorProps) {
  const change = currentValue - previousValue;
  const changePercent = previousValue !== 0 ? (change / previousValue) * 100 : 0;
  
  const isPositive = change > 0;
  const isSignificant = Math.abs(changePercent) > 1; // Only show if change > 1%
  
  if (!isSignificant && !isUpdating) return null;
  
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      isUpdating ? 'bg-blue-100 text-blue-800' :
      isPositive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
    }`}>
      {isUpdating ? (
        <>
          <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent mr-1"></div>
          Updating...
        </>
      ) : (
        <>
          <span className="mr-1">
            {isPositive ? '↗' : '↘'}
          </span>
          {Math.abs(changePercent).toFixed(1)}%
        </>
      )}
    </div>
  );
}
