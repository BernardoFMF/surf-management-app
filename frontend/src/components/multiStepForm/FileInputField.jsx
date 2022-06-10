import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'
import default_image from './../../../src/assets/data/blank-profile-picture.png'

import { Button, Box, Avatar } from '@mui/material';
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
            console.log(selectedFile);
            setFile((selectedFile))
            setFieldValue(field.name, selectedFile)
        }
    }, [selectedFile])

    return (
        <>
            <input
                label={label}
                accept="file/*"
                type="file"
                id="select-file"
                style={{ display: 'none' }}
                onChange={e => {if(e.target.files[0])setSelectedFile(e.target.files[0])}}
            />
            <Box mt={2} textAlign="center">
                <label htmlFor="select-file">
                    <AnimateButton>
                        <Button 
                            disableElevation
                            size="normal"
                            type="button"
                            variant="contained"
                            color="primary"
                            component="span">
                            {t('file')}
                        </Button>
                    </AnimateButton>
                </label>
            </Box>         
        </>
    );
};

export default FileInputField;