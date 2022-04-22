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
            {Object.keys(options).map((item, pos) => {
                return (
                    <MenuItem name={pos} key={pos} value={item}>
                        {options[item]}
                    </MenuItem>
                )
            })}
        </TextField>
        
    )
}

export default DropdownInputField
/*
import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const DropdownInputField = ({
  name,
  options,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        )
      })}
    </TextField>
  );
};

export default DropdownInputField*/