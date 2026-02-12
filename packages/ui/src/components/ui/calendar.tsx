'use client';

import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { buttonVariants } from './button-variants';

export type CalendarProps = DayPickerProps & {
  /** 네비게이션 버튼(< >) 숨김 */
  hideNavigation?: boolean;
  /** 캡션(월/년도 텍스트) 숨김 */
  hideCaption?: boolean;
};

function Calendar({ className, classNames, showOutsideDays = true, hideNavigation = true, hideCaption = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      hideNavigation={hideNavigation}
      className={cn('w-fit p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'flex flex-col gap-4',
        month_caption: cn('flex justify-center pt-1 relative items-center', hideCaption ? 'hidden' : 'h-10'),
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center gap-1',
        button_previous: cn(buttonVariants({ variant: 'neutral-line' }), 'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        button_next: cn(buttonVariants({ variant: 'neutral-line' }), 'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
        day_button: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground [&>button]:focus:bg-primary [&>button]:focus:text-primary-foreground rounded-md',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground rounded-md',
        outside: 'text-muted-foreground opacity-50 [&.range-middle]:opacity-100 [&.range-middle]:bg-accent/50',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'range-middle [&>button]:bg-accent [&>button]:text-accent-foreground [&>button]:rounded-none',
        hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
