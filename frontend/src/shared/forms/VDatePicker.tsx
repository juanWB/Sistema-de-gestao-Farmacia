import React, { useState, useEffect } from 'react';
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useField } from '@unform/core';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';


type TVDatePickerProps = DatePickerProps & {
  name: string;
}

export const VDatePicker: React.FC<TVDatePickerProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue } = useField(name);

  const [date, setDate] = useState<Dayjs | string | null>(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => { return date },
      setValue: (_, newDate) => setDate(newDate),
    });

    console.log(date);
  }, [fieldName, registerField, date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DatePicker
        {...rest}

        value={date ? dayjs(date) : null}
        onChange={(e) => { setDate(e) }}
      />
    </LocalizationProvider>
  );
};