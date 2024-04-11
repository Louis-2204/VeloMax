'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import moment from 'moment';

export function DatePicker({ date, setDate }: { date: string; setDate: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? moment(date).format('DD/MM/YYYY') : <span>Séléctionner une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date as unknown as Date}
          onSelect={setDate as unknown as React.Dispatch<React.SetStateAction<Date | undefined>>}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}