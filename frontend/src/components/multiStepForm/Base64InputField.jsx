import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'
import default_image from './../../../src/assets/data/blank-profile-picture.png'

import { Button, Box, Avatar } from '@mui/material';
import AnimateButton from '../extended/AnimateButton'
import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux';


const Base64InputField = ({ label, size, ...props}) => {
    const [field, meta] = useField(props)

    const [selectedImage, setSelectedImage] = useState(field.value ? 'data:image/jpeg;base64,' + field.value : field.value)
    const [imageUrl, setImageUrl] = useState(Boolean(field.value)? selectedImage : null)
    const { setFieldValue} = useFormikContext()
    const {t, i18n} = useTranslation()
    const [modified, setModified] = useState(false)

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(modified ? URL.createObjectURL(selectedImage) : selectedImage)
            setFieldValue(field.name, selectedImage)
            setModified(true)
        }
    }, [selectedImage])

    return (
        <>
            <input
                label={label}
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={e => {if(e.target.files[0])setSelectedImage(e.target.files[0])}}
            />
            <Box mt={2} textAlign="center">
                <label htmlFor="select-image">
                    <AnimateButton>
                        <Button 
                            disableElevation
                            size="normal"
                            type="button"
                            variant="contained"
                            color="primary"
                            component="span">
                            {t('sign_up_image')}
                        </Button>
                    </AnimateButton>
                </label>
            </Box>
            {
                imageUrl && selectedImage ?
                    <Box mt={2} display="flex" alignItems={'center'} justifyContent="center">
                        <Avatar
                            alt={selectedImage.name}
                            src={imageUrl}
                            sx={{ width: size, height: size}}
                        />
                    </Box> :  <Box mt={2} display="flex" alignItems={'center'} justifyContent="center">
                        <Avatar
                            alt='blank-profile-picture.png'
                            src= {default_image} 
                            sx={{ width: size, height: size}}
                        />
                    </Box>
            }            
        </>
    );
};

export default Base64InputField;