import React from 'react'
import { FormControlLabel } from '@mui/material';
import { useFormikContext, useField } from 'formik'
import SwitchButton from '../SwitchButton';

const CheckInputField = ({ label, options, ...props}) => {

    const [field, meta] = useField(props)
    const { setFieldValue } = useFormikContext()

    const handleChange = evt => {
        setFieldValue(field.name, !field.value)
    }

    return (
        <FormControlLabel 
            onChange={handleChange} 
            control={<SwitchButton sx={{ m: 1 }} checked={field.value} />}
            label={label} 
            name={field.name} 
            labelPlacement='start'
        />
    )
}

export default CheckInputField
