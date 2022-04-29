import React, { useState } from 'react'
import {
    TextField
} from '@mui/material';
import { useFormikContext, useField } from 'formik'
import { useTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateInputField = ({ label, ...props}) => {
    const theme = useTheme();


    const [field, meta] = useField(props)
    const [date, setDate] = useState(field.value)

    const { setFieldValue} = useFormikContext()

    const handleDateChange = (newValue) => {
        setFieldValue(field.name, newValue)
        setDate(newValue)
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                onChange={handleDateChange}
                value={date}
                renderInput={(params) => 
                    <TextField 
                        {...params}
                        fullWidth
                        value={date}
                        name={field.name}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        sx={{ ...theme.typography.customInput }}
                    />
                }
            />
        </LocalizationProvider>
    )
}

export default DateInputField