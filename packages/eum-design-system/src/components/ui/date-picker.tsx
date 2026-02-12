'use client';

import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { format, setMonth, setYear, addMonths, subMonths, isAfter, isBefore, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface DatePickerBaseProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
}

interface SingleDatePickerProps extends DatePickerBaseProps {
  mode: 'single';
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  dateRange?: never;
  onDateRangeChange?: never;
}

interface RangeDatePickerProps extends DatePickerBaseProps {
  mode: 'range';
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  date?: never;
  onDateChange?: never;
}

export type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

/** @deprecated Use DatePicker with mode="single" instead */
interface LegacyDatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
  rangeStart?: Date;
  rangeEnd?: Date;
  minDate?: Date;
  maxDate?: Date;
}

const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export function DatePicker(props: DatePickerProps) {
  const { mode, placeholder = '날짜 선택', className, disabled = false, fromYear = 1900, toYear = 2100 } = props;

  // Single mode
  if (mode === 'single') {
    const { date, onDateChange } = props;
    return <SingleDatePickerInternal date={date} onSelect={onDateChange} placeholder={placeholder} className={className} disabled={disabled} fromYear={fromYear} toYear={toYear} />;
  }

  // Range mode
  const { dateRange, onDateRangeChange } = props;

  const handleSelectFrom = (date: Date | undefined) => {
    const newRange: DateRange = {
      from: date,
      to: dateRange?.to,
    };
    if (date && dateRange?.to && isAfter(date, dateRange.to)) {
      newRange.to = undefined;
    }
    onDateRangeChange?.(newRange);
  };

  const handleSelectTo = (date: Date | undefined) => {
    const newRange: DateRange = {
      from: dateRange?.from,
      to: date,
    };
    if (date && dateRange?.from && isBefore(date, dateRange.from)) {
      newRange.from = undefined;
    }
    onDateRangeChange?.(newRange);
  };

  return (
    <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-center gap-2', className)}>
      <SingleDatePickerInternal
        date={dateRange?.from}
        onSelect={handleSelectFrom}
        placeholder="시작일"
        className="w-full sm:w-auto"
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
        rangeStart={dateRange?.from}
        rangeEnd={dateRange?.to}
        maxDate={dateRange?.to}
      />
      <span className="text-muted-foreground text-center sm:text-left">~</span>
      <SingleDatePickerInternal
        date={dateRange?.to}
        onSelect={handleSelectTo}
        placeholder="종료일"
        className="w-full sm:w-auto"
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
        rangeStart={dateRange?.from}
        rangeEnd={dateRange?.to}
        minDate={dateRange?.from}
      />
    </div>
  );
}

/** 내부용 Single DatePicker */
function SingleDatePickerInternal({
  date,
  onSelect,
  placeholder = '날짜 선택',
  className,
  disabled = false,
  fromYear = 1900,
  toYear = 2100,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
}: LegacyDatePickerProps) {
  const [month, setCurrentMonth] = React.useState<Date>(date || new Date());
  const [open, setOpen] = React.useState(false);

  const isRangeMode = rangeStart !== undefined || rangeEnd !== undefined;

  const years = React.useMemo(() => {
    const yearList = [];
    for (let i = toYear; i >= fromYear; i--) {
      yearList.push(i);
    }
    return yearList;
  }, [fromYear, toYear]);

  const handleMonthChange = (value: string) => {
    const newDate = setMonth(month, parseInt(value));
    setCurrentMonth(newDate);
  };

  const handleYearChange = (value: string) => {
    const newDate = setYear(month, parseInt(value));
    setCurrentMonth(newDate);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(month, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(month, 1));
  };

  const rangeModifiers = React.useMemo(() => {
    if (!rangeStart && !rangeEnd) return {};

    const modifiers: Record<string, Date | ((day: Date) => boolean)> = {};

    if (rangeStart) {
      modifiers.range_start = rangeStart;
    }
    if (rangeEnd) {
      modifiers.range_end = rangeEnd;
    }
    if (rangeStart && rangeEnd) {
      modifiers.range_middle = (day: Date) => {
        return isAfter(day, rangeStart) && isBefore(day, rangeEnd);
      };
    }

    return modifiers;
  }, [rangeStart, rangeEnd]);

  const modifiersClassNames = React.useMemo(() => {
    return {
      range_start: '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-l-md [&>button]:rounded-r-none',
      range_end: '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-r-md [&>button]:rounded-l-none',
      range_middle: '[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:rounded-none',
    };
  }, []);

  const disabledMatcher = React.useMemo(() => {
    const matchers: Array<Date | ((date: Date) => boolean)> = [];
    if (minDate) {
      matchers.push((day: Date) => isBefore(day, minDate) && !isSameDay(day, minDate));
    }
    if (maxDate) {
      matchers.push((day: Date) => isAfter(day, maxDate) && !isSameDay(day, maxDate));
    }
    return matchers.length > 0 ? matchers : undefined;
  }, [minDate, maxDate]);

  const handleSelect = (selectedDate: Date | undefined) => {
    onSelect?.(selectedDate);
    if (!isRangeMode && selectedDate) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="neutral-line" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', className)} disabled={disabled}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP', { locale: ko }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between gap-1 border-b p-3">
          <Button variant="neutral-line" size="icon" className="h-8 w-8" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Select value={month.getMonth().toString()} onValueChange={handleMonthChange}>
              <SelectTrigger className="h-8 w-[80px]">
                <SelectValue placeholder="월" />
              </SelectTrigger>
              <SelectContent>
                {months.map((monthName, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={month.getFullYear().toString()} onValueChange={handleYearChange}>
              <SelectTrigger className="h-8 w-[90px]">
                <SelectValue placeholder="년" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="neutral-line" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setCurrentMonth}
          modifiers={rangeModifiers}
          modifiersClassNames={modifiersClassNames}
          disabled={disabledMatcher}
        />
      </PopoverContent>
    </Popover>
  );
}

interface DateRangePickerProps {
  dateFrom?: Date;
  dateTo?: Date;
  onSelectFrom?: (date: Date | undefined) => void;
  onSelectTo?: (date: Date | undefined) => void;
  placeholderFrom?: string;
  placeholderTo?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
}

/** @deprecated Use DatePicker with mode="range" instead */
export function DateRangePicker({
  dateFrom,
  dateTo,
  onSelectFrom,
  onSelectTo,
  placeholderFrom = '시작일',
  placeholderTo = '종료일',
  className,
  disabled = false,
  fromYear,
  toYear,
}: DateRangePickerProps) {
  const handleSelectFrom = (date: Date | undefined) => {
    onSelectFrom?.(date);
    if (date && dateTo && isAfter(date, dateTo)) {
      onSelectTo?.(undefined);
    }
  };

  const handleSelectTo = (date: Date | undefined) => {
    onSelectTo?.(date);
    if (date && dateFrom && isBefore(date, dateFrom)) {
      onSelectFrom?.(undefined);
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <SingleDatePickerInternal
        date={dateFrom}
        onSelect={handleSelectFrom}
        placeholder={placeholderFrom}
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
        rangeStart={dateFrom}
        rangeEnd={dateTo}
        maxDate={dateTo}
      />
      <span className="text-muted-foreground">~</span>
      <SingleDatePickerInternal
        date={dateTo}
        onSelect={handleSelectTo}
        placeholder={placeholderTo}
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
        rangeStart={dateFrom}
        rangeEnd={dateTo}
        minDate={dateFrom}
      />
    </div>
  );
}
