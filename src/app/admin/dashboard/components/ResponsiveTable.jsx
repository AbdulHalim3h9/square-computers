'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from '@/components/ui/Button';

export function ResponsiveTable({ columns, data, keyField = 'id', className = '' }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (rowId) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        {data.map((item, index) => (
          <div 
            key={item[keyField] || index}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleRow(item[keyField] || index)}
            >
              <div className="flex-1 min-w-0">
                {columns[0]?.renderMobileTitle ? (
                  columns[0].renderMobileTitle(item)
                ) : (
                  <div className="font-medium text-gray-900 truncate">
                    {item[columns[0]?.key] || 'Item'}
                  </div>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRow(item[keyField] || index);
                }}
              >
                {expandedRows[item[keyField] || index] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {expandedRows[item[keyField] || index] && (
              <div className="p-4 pt-0 border-t border-gray-100">
                <div className="space-y-2">
                  {columns.map((column, colIndex) => (
                    <div key={column.key || colIndex} className="grid grid-cols-2 gap-4">
                      <div className="text-sm font-medium text-gray-500">
                        {column.header}
                      </div>
                      <div className="text-sm text-gray-900 text-right">
                        {column.renderCell 
                          ? column.renderCell(item) 
                          : String(item[column.key] || '-')
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Desktop view
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={item[keyField] || rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td
                  key={column.key || colIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${column.cellClassName || 'text-gray-900'}`}
                >
                  {column.renderCell 
                    ? column.renderCell(item) 
                    : String(item[column.key] || '-')
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
