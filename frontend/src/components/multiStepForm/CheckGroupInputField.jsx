import React, { useEffect } from 'react'
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { FieldArray, useField, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

const CheckGroupInputField = ({ options, ...props}) => {
    const [field, meta, helpers] = useField({ ...props, type: "checkbox" });

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.label}</FormLabel>
            <FormGroup row={true}>
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
            {meta.touched && meta.error && (
                <span style={{ color: "red", fontFamily: "sans-serif" }}>
                    {meta.error}
                </span>
            )}
        </FormControl>
    )
}

export default CheckGroupInputField
