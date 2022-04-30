import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'
import default_image from './../../../src/assets/data/blank-profile-picture.png'

import { Button, Box, Avatar } from '@mui/material';
import AnimateButton from '../extended/AnimateButton'
import { useTranslation } from 'react-i18next'


const ImageInputField = ({ label, ...props}) => {
    const [field, meta] = useField(props)

    const [selectedImage, setSelectedImage] = useState(field.value)
    const [imageUrl, setImageUrl] = useState(Boolean(field.value)? URL.createObjectURL(selectedImage) : null)
    const { setFieldValue} = useFormikContext()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage))
            setFieldValue(field.name, selectedImage)
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
            {imageUrl && selectedImage ?
                <Box mt={2} display="flex" alignItems={'center'} justifyContent="center">
                    <Avatar
                        alt={selectedImage.name}
                        src={imageUrl}
                        sx={{ width: 200, height: 200}}
                    />
                </Box> :  <Box mt={2} display="flex" alignItems={'center'} justifyContent="center">
                    <Avatar
                        alt='blank-profile-picture.png'
                        src= {default_image} 
                        sx={{ width: 200, height: 200}}
                    />
                </Box>
            }
        </>
    );
};

export default ImageInputField;