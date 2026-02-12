import * as React from "react";
import type { DateRange } from "react-day-picker";
import {
  setMonth,
  setYear,
  addMonths,
  subMonths,
  addDays,
  subDays,
  isAfter,
  isBefore,
  isSameDay,
  isValid,
  getDaysInMonth,
} from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CustomCalendarBaseProps {
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
}

interface SingleCustomCalendarProps extends CustomCalendarBaseProps {
  mode: "single";
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  dateRange?: never;
  onDateRangeChange?: never;
}

interface RangeCustomCalendarProps extends CustomCalendarBaseProps {
  mode: "range";
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  date?: never;
  onDateChange?: never;
}

export type CustomCalendarProps =
  | SingleCustomCalendarProps
  | RangeCustomCalendarProps;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

// ---------------------------------------------------------------------------
// Date‑input helpers
// ---------------------------------------------------------------------------

function clampStr(
  value: string,
  min: number,
  max: number,
  padLen: number,
): string {
  if (value === "") return "";
  const num = parseInt(value, 10);
  if (Number.isNaN(num)) return "";
  const clamped = Math.min(Math.max(num, min), max);
  return String(clamped).padStart(padLen, "0");
}

function parseDateParts(
  year: string,
  month: string,
  day: string,
  fromYear: number,
  toYear: number,
): Date | null {
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return null;
  if (y < fromYear || y > toYear) return null;
  if (m < 1 || m > 12) return null;
  const maxDay = getDaysInMonth(new Date(y, m - 1));
  if (d < 1 || d > maxDay) return null;
  const date = new Date(y, m - 1, d);
  return isValid(date) ? date : null;
}

// ---------------------------------------------------------------------------
// DateInput – three small text fields (YYYY / MM / DD)
// ---------------------------------------------------------------------------

interface DateInputProps {
  date?: Date;
  onDateParsed: (date: Date | undefined) => void;
  disabled?: boolean;
  fromYear: number;
  toYear: number;
}

function DateInput({
  date,
  onDateParsed,
  disabled,
  fromYear,
  toYear,
}: DateInputProps) {
  const [yearStr, setYearStr] = React.useState("");
  const [monthStr, setMonthStr] = React.useState("");
  const [dayStr, setDayStr] = React.useState("");

  // Keep text inputs synchronised when the date prop changes externally
  // (e.g. via picker selection or auto‑adjust).
  const prevDateRef = React.useRef<Date | undefined>(undefined);
  React.useEffect(() => {
    if (
      date &&
      (!prevDateRef.current || !isSameDay(date, prevDateRef.current))
    ) {
      setYearStr(String(date.getFullYear()));
      setMonthStr(String(date.getMonth() + 1).padStart(2, "0"));
      setDayStr(String(date.getDate()).padStart(2, "0"));
    } else if (!date && prevDateRef.current) {
      setYearStr("");
      setMonthStr("");
      setDayStr("");
    }
    prevDateRef.current = date;
  }, [date]);

  const tryParse = React.useCallback(
    (y: string, m: string, d: string) => {
      const parsed = parseDateParts(y, m, d, fromYear, toYear);
      if (parsed) {
        onDateParsed(parsed);
      }
    },
    [fromYear, toYear, onDateParsed],
  );

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYearStr(raw);
    if (raw.length === 4) tryParse(raw, monthStr, dayStr);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonthStr(raw);
    if (raw.length === 2) tryParse(yearStr, raw, dayStr);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDayStr(raw);
    if (raw.length === 2) tryParse(yearStr, monthStr, raw);
  };

  const handleYearBlur = () => {
    if (yearStr) {
      const clamped = clampStr(yearStr, fromYear, toYear, 4);
      setYearStr(clamped);
      tryParse(clamped, monthStr, dayStr);
    }
  };

  const handleMonthBlur = () => {
    if (monthStr) {
      const clamped = clampStr(monthStr, 1, 12, 2);
      setMonthStr(clamped);
      tryParse(yearStr, clamped, dayStr);
    }
  };

  const handleDayBlur = () => {
    if (dayStr && monthStr && yearStr) {
      const y = parseInt(yearStr, 10);
      const m = parseInt(monthStr, 10);
      const maxDay =
        !Number.isNaN(y) && !Number.isNaN(m)
          ? getDaysInMonth(new Date(y, m - 1))
          : 31;
      const clamped = clampStr(dayStr, 1, maxDay, 2);
      setDayStr(clamped);
      tryParse(yearStr, monthStr, clamped);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <Input
        type="text"
        inputMode="numeric"
        placeholder="YYYY"
        value={yearStr}
        onChange={handleYearChange}
        onBlur={handleYearBlur}
        disabled={disabled}
        className="h-8 w-[60px] px-1.5 text-center text-sm tabular-nums"
      />
      <span className="text-muted-foreground text-xs">/</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="MM"
        value={monthStr}
        onChange={handleMonthChange}
        onBlur={handleMonthBlur}
        disabled={disabled}
        className="h-8 w-[40px] px-1 text-center text-sm tabular-nums"
      />
      <span className="text-muted-foreground text-xs">/</span>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="DD"
        value={dayStr}
        onChange={handleDayChange}
        onBlur={handleDayBlur}
        disabled={disabled}
        className="h-8 w-[40px] px-1 text-center text-sm tabular-nums"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Internal single picker (picker button + text inputs + popover calendar)
// ---------------------------------------------------------------------------

interface SinglePickerInternalProps {
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

function SinglePickerInternal({
  date,
  onSelect,
  placeholder: _placeholder = "날짜 선택",
  className,
  disabled = false,
  fromYear = 1900,
  toYear = 2100,
  rangeStart,
  rangeEnd,
  minDate,
  maxDate,
}: SinglePickerInternalProps) {
  const [month, setCurrentMonth] = React.useState<Date>(date || new Date());
  const [open, setOpen] = React.useState(false);

  const isRangeMode = rangeStart !== undefined || rangeEnd !== undefined;

  const years = React.useMemo(() => {
    const yearList: number[] = [];
    for (let i = toYear; i >= fromYear; i--) {
      yearList.push(i);
    }
    return yearList;
  }, [fromYear, toYear]);

  const handleMonthChange = (value: string) => {
    setCurrentMonth(setMonth(month, parseInt(value)));
  };

  const handleYearChange = (value: string) => {
    setCurrentMonth(setYear(month, parseInt(value)));
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

    if (rangeStart) modifiers.range_start = rangeStart;
    if (rangeEnd) modifiers.range_end = rangeEnd;
    if (rangeStart && rangeEnd) {
      modifiers.range_middle = (day: Date) =>
        isAfter(day, rangeStart) && isBefore(day, rangeEnd);
    }

    return modifiers;
  }, [rangeStart, rangeEnd]);

  const modifiersClassNames = React.useMemo(
    () => ({
      range_start:
        "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-l-md [&>button]:rounded-r-none",
      range_end:
        "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-r-md [&>button]:rounded-l-none",
      range_middle:
        "[&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:rounded-none",
    }),
    [],
  );

  const disabledMatcher = React.useMemo(() => {
    const matchers: Array<Date | ((date: Date) => boolean)> = [];
    if (minDate)
      matchers.push(
        (day: Date) => isBefore(day, minDate) && !isSameDay(day, minDate),
      );
    if (maxDate)
      matchers.push(
        (day: Date) => isAfter(day, maxDate) && !isSameDay(day, maxDate),
      );
    return matchers.length > 0 ? matchers : undefined;
  }, [minDate, maxDate]);

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    onSelect?.(selectedDate);
    if (!isRangeMode && selectedDate) {
      setOpen(false);
    }
  };

  const handleTextInput = (parsed: Date | undefined) => {
    onSelect?.(parsed);
    if (parsed) setCurrentMonth(parsed);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Text input fields */}
      <DateInput
        date={date}
        onDateParsed={handleTextInput}
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
      />

      {/* Calendar popover picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="neutral-line"
            size="icon"
            className={cn("h-8 w-8 shrink-0", !date && "text-muted-foreground")}
            disabled={disabled}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex items-center justify-between gap-1 border-b p-3">
            <Button
              variant="neutral-line"
              size="icon"
              className="h-8 w-8"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <Select
                value={month.getMonth().toString()}
                onValueChange={handleMonthChange}
              >
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
              <Select
                value={month.getFullYear().toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="h-8 w-[90px]">
                  <SelectValue placeholder="년" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="neutral-line"
              size="icon"
              className="h-8 w-8"
              onClick={handleNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalendarSelect}
            month={month}
            onMonthChange={setCurrentMonth}
            modifiers={rangeModifiers}
            modifiersClassNames={modifiersClassNames}
            disabled={disabledMatcher}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CustomCalendar – main export
// ---------------------------------------------------------------------------

export function CustomCalendar(props: CustomCalendarProps) {
  const {
    mode,
    placeholder = "날짜 선택",
    className,
    disabled = false,
    fromYear = 1900,
    toYear = 2100,
  } = props;

  // ---- Single mode ----
  if (mode === "single") {
    const { date, onDateChange } = props;
    return (
      <SinglePickerInternal
        date={date}
        onSelect={onDateChange}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
      />
    );
  }

  // ---- Range mode ----
  const { dateRange, onDateRangeChange } = props;

  /**
   * Change 1 & 2: Auto‑adjust logic.
   *
   * handleSelectFrom – if the chosen startDate is AFTER the current endDate,
   *   set endDate = startDate + 1 day.
   *
   * handleSelectTo – if the chosen endDate is BEFORE the current startDate,
   *   set startDate = endDate - 1 day.
   */
  const handleSelectFrom = (date: Date | undefined) => {
    const newRange: DateRange = {
      from: date,
      to: dateRange?.to,
    };
    if (date && dateRange?.to && isAfter(date, dateRange.to)) {
      newRange.to = addDays(date, 1);
    }
    onDateRangeChange?.(newRange);
  };

  const handleSelectTo = (date: Date | undefined) => {
    const newRange: DateRange = {
      from: dateRange?.from,
      to: date,
    };
    if (date && dateRange?.from && isBefore(date, dateRange.from)) {
      newRange.from = subDays(date, 1);
    }
    onDateRangeChange?.(newRange);
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center gap-2",
        className,
      )}
    >
      <SinglePickerInternal
        date={dateRange?.from}
        onSelect={handleSelectFrom}
        placeholder="시작일"
        className="w-full sm:w-auto"
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
        rangeStart={dateRange?.from}
        rangeEnd={dateRange?.to}
      />
      <span className="text-muted-foreground text-center sm:text-left">~</span>
      <SinglePickerInternal
        date={dateRange?.to}
        onSelect={handleSelectTo}
        placeholder="종료일"
        className="w-full sm:w-auto"
        disabled={disabled}
        fromYear={fromYear}
        toYear={toYear}
        rangeStart={dateRange?.from}
        rangeEnd={dateRange?.to}
      />
    </div>
  );
}
