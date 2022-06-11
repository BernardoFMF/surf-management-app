import React from 'react'
import { Autocomplete, TextField } from '@mui/material';
import { useFormikContext, useField } from 'formik'

const ChipInputField = ({ label, placeholder, options, startingOptions, type, ...props}) => {

    const [field, meta] = useField(props)
    const { setFieldValue } = useFormikContext()

    const handleChange = (e, value) => {
        let years = value
        years[years.length - 1] = parseInt(years[years.length - 1])
        setFieldValue(field.name, years)
    }

    return (
        <Autocomplete
            multiple
            freeSolo
            name={props.name}
            id="tags-outlined"
            options={[]}
            
            value={startingOptions === undefined ? null : field.value}
            onChange={handleChange}
            renderInput={(params) => (
            <TextField
                {...params}
                variant="outlined"
                label={label}
                type={type}
                placeholder={placeholder}
            />
            )}
        />
        
    )
}

export default ChipInputField
