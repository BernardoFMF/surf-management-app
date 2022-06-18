import React, { useEffect } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useFormikContext, useField } from 'formik'
import FormLabel from '@mui/material/FormLabel';

const renderOptions = (options) => {
    return options.map((option) => (
        <FormControlLabel
            key={option.label}
            value={option.label}
            control={<Radio />}
            label={option.value}
        />
    ));
};
  
const RadioGroupInputField = ({ label, options, dependent, ...props}) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(props)

    useEffect(() => {
      if (dependent) setFieldValue(dependent, [])
    }, [field.value])
  
    return (
        <>
            <RadioGroup row {...field} {...props} name={field.name}>
              {renderOptions(options)}
            </RadioGroup>
            {meta.touched && meta.error && (
                <FormHelperText error id="standard-weight-helper-text-radio-input">
                    {meta.error}
                </FormHelperText>
            )}
        </>
    );
};

export default RadioGroupInputField