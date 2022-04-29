import React from 'react'
import {
    TextField
} from '@mui/material';
import { FieldConfig, useField } from 'formik'
import { useTheme } from '@mui/material/styles';

const InputField = ({ label, type, ...props}) => {
    const theme = useTheme();

    const [field, meta] = useField(props)

    return (
        <TextField      
            fullWidth                                 
            label={label}
            margin="normal"
            name={meta.name}
            type={type}
            {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            sx={{ ...theme.typography.customInput }}
        />
    )
}

export default InputField