import React from 'react'
import { Autocomplete, TextField } from '@mui/material';
import { useFormikContext, useField } from 'formik'

const ChipSelectorInputField = ({ label, placeholder, options, type, disable, ...props}) => {

    const [field, meta] = useField(props)
    const { setFieldValue } = useFormikContext()

    const handleChange = (e, value) => {
        setFieldValue(field.name, value)
    }

    return (
        <Autocomplete
            multiple
            id="tags-outlined"
            name='groups'
            filterSelectedOptions
            options={options}
            disabled={disable}
            onChange={handleChange}
            getOptionLabel={(option) => option.name_}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label={label}
                    type={type}
                    sx={{mb: 1, mt: 0.5}}
                />
            )}
        />
        
    )
}

export default ChipSelectorInputField
