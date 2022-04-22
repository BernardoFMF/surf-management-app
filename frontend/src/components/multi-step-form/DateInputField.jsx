import React, { useState } from 'react'
import {
    TextField
} from '@mui/material';
import { FieldConfig, useField } from 'formik'
import { useTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DateInputField = ({ label, ...props}) => {
    const theme = useTheme();
    const [value, setValue] = useState(null);

    const [field, meta] = useField(props)

    console.log(field);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                value={value}
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField 
                {...params}
                fullWidth
                margin="normal"
                name={meta.name}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                sx={{ ...theme.typography.customInput }}/>}
            />
        </LocalizationProvider>
    )
}

export default DateInputField