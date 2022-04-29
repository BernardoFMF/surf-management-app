import React from 'react'
import {
    MenuItem,
    TextField
} from '@mui/material';
import { useFormikContext, useField } from 'formik'

const DropdownInputField = ({ label, options, ...props}) => {

    const [field, meta] = useField(props)
    const { setFieldValue} = useFormikContext()

    const handleChange = evt => {
        const { value } = evt.target
        setFieldValue(field.name, value)
    }

    return (
        <TextField 
            fullWidth
            label={label}
            {...field}
            {...props}
            select={true}
            onChange={handleChange}
            name={field.name}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            style={{marginTop: '10px', marginBottom: '10px'}}
        >
            {Object.entries(options).map((item) => {
                return (
                    <MenuItem name={item[0]} key={item[0]} value={item[1]}>
                        {item[1]}
                    </MenuItem>
                )
            })}
        </TextField>
        
    )
}

export default DropdownInputField
