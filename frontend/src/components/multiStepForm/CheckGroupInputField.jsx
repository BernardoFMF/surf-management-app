import React from 'react'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { FieldArray, useField } from 'formik'

const CheckGroupInputField = ({ options, ...props}) => {
    const [field, meta, helpers] = useField({ ...props, type: "checkbox" });
    
    const { setValue, setTouched } = helpers;
    console.log(field.value);
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.label}</FormLabel>
            <FormGroup>
                <FieldArray name={field.name}>
                    {({ insert, remove, push }) =>
                        options.length > 0 &&
                        options.map((option, index) => (
                            <FormControlLabel
                                {...props}
                                key={index}
                                name={field.name}
                                control={<Checkbox checked={field.value.includes(option.name)}/>}
                                label={option.label}
                                value={option.name}
                                onChange={(e, checked) => {
                                    if (checked) {
                                        push(option.name)
                                    } else {
                                        const optionIndex = field.value.indexOf(option.name)
                                        remove(optionIndex)
                                    }
                                }}
                            />
                    ))}
                </FieldArray>
            </FormGroup>
        </FormControl>
    )
}

export default CheckGroupInputField