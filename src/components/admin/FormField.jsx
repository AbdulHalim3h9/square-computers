'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function FormField({
  label,
  name,
  children,
  className = '',
  labelClassName = '',
  error,
  description,
  required = false,
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className={cn('text-sm font-medium', labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className={cn('relative', { 'mt-1': label })}>
        {children}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {description && !error && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

export function FormFieldGroup({ children, className = '' }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {children}
    </div>
  );
}
