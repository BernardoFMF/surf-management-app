import React from 'react'
import { TextField } from '@mui/material';
import { FieldConfig, useField } from 'formik'
import { useTheme } from '@mui/material/styles';

const InputField = ({ label, endAdornment, showPassword, ...props}) => {
    const theme = useTheme();

    const [field, meta] = useField(props)

    return (
        <TextField      
            fullWidth                                 
            label={label}
            margin="normal"
            name="fname"
            type={showPassword !== undefined ? showPassword ? 'text' : 'password' : 'text'}
            {...field}
            {...props}
            InputProps={{endAdornment}}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            sx={{ ...theme.typography.customInput }}
        />
    )
}

export default InputField