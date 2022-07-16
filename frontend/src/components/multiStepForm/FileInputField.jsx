import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'
import default_image from './../../../src/assets/data/blank-profile-picture.png'

import { Button, Box, Avatar, Stack, Typography, Grid } from '@mui/material';
import AnimateButton from '../extended/AnimateButton'
import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux';


const FileInputField = ({ label, size, ...props}) => {
    const [field, meta] = useField(props)

    const [selectedFile, setSelectedFile] = useState(field.value)
    const [file, setFile] = useState(field.value)
    const { setFieldValue} = useFormikContext()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        if (selectedFile) {
            setFieldValue(field.name, selectedFile)
        }
    }, [selectedFile])

    return (
        <>
            <input
                label={label}
                accept="file/*"
                type="file"
                id={label}
                name={field.name}
                style={{ display: 'none' }}
                align="left"
                onChange={e => {if(e.target.files[0])setSelectedFile(e.target.files[0])}}
            />
            <Box mt={2} textAlign="left" width={'fit-content'}>
                <Grid mt={2} textAlign="left" rowSpacing={4} container direction={'row'}>
                <label htmlFor={label}>
                    <AnimateButton>
                        <Button 
                            disableElevation
                            fullWidth
                            size="normal"
                            type="button"
                            variant="contained"
                            color="primary"
                            component="span">
                            {label}
                        </Button>
                    </AnimateButton>
                </label>
                <Typography  sx={{ml: 2 }}>{selectedFile ? selectedFile.name : t("no_file_selected")}</Typography>
                </Grid>
            </Box>         
        </>
    );
};

export default FileInputField;