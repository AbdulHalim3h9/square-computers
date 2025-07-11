'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ResponsiveTable({
  columns,
  data,
  renderRow,
  keyField = 'id',
  className = '',
  emptyState = 'No data available',
  onRowClick,
}) {
  const [expandedRows, setExpandedRows] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleRow = (rowId) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const visibleColumns = useMemo(() => {
    return isMobile ? columns.filter(col => !col.hideOnMobile) : columns;
  }, [columns, isMobile]);

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyState}</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-2">
        {data.map((item, index) => (
          <div 
            key={item[keyField] || index}
            className="border rounded-lg overflow-hidden bg-white"
          >
            <div 
              className={`p-4 flex items-center justify-between cursor-pointer ${onRowClick ? 'hover:bg-gray-50' : ''}`}
              onClick={() => onRowClick ? onRowClick(item) : toggleRow(item[keyField])}
            >
              <div className="flex-1 min-w-0">
                {visibleColumns.map((column, colIndex) => {
                  if (column.renderMobileTitle) {
                    return (
                      <div key={column.key} className="truncate">
                        {column.renderMobileTitle(item)}
                      </div>
                    );
                  }
                  return null;
                }) || <div>{item[visibleColumns[0]?.key] || 'Item'}</div>}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRow(item[keyField]);
                }}
              >
                {expandedRows[item[keyField]] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {expandedRows[item[keyField]] && (
              <div className="p-4 pt-0 border-t border-gray-100">
                <div className="space-y-2">
                  {visibleColumns.map((column) => (
                    <div key={column.key} className="grid grid-cols-2 gap-4">
                      <div className="text-sm font-medium text-gray-500">
                        {column.header}
                      </div>
                      <div className="text-sm text-gray-900">
                        {column.renderCell 
                          ? column.renderCell(item) 
                          : String(item[column.key] || '-')
                        }
                      </div>
                    </div>
                  ))}
                  
                  {renderRow && (
                    <div className="pt-2 flex justify-end">
                      {renderRow(item, { isMobile: true })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column) => (
              <TableHead 
                key={column.key}
                className={column.className}
                style={column.style}
              >
                {column.header}
              </TableHead>
            ))}
            {renderRow && <TableHead className="w-10" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow 
              key={item[keyField] || index}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {visibleColumns.map((column) => (
                <TableCell 
                  key={column.key}
                  className={column.cellClassName}
                >
                  {column.renderCell 
                    ? column.renderCell(item) 
                    : String(item[column.key] || '-')
                  }
                </TableCell>
              ))}
              
              {renderRow && (
                <TableCell className="text-right">
                  {renderRow(item, { isMobile: false })}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
