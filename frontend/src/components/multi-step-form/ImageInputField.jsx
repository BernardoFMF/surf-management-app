import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'

import { Button, Box, Avatar } from '@mui/material';
import AnimateButton from '../extended/AnimateButton'

const ImageInputField = ({ label, ...props}) => {
    const [field, meta] = useField(props)

    const [selectedImage, setSelectedImage] = useState(field.value)
    const [imageUrl, setImageUrl] = useState(Boolean(field.value)? URL.createObjectURL(selectedImage) : null)
    const { setFieldValue} = useFormikContext()

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage))
            setFieldValue(field.name, selectedImage)
        }
    }, [selectedImage]);


    return (
        <>
            <input
                label={label}
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={e => setSelectedImage(e.target.files[0])}
            />
            <Box mt={2} textAlign="center">
                <label htmlFor="select-image">
                    <AnimateButton>
                        <Button 
                            disableElevation
                            size="normal"
                            type="button"
                            variant="contained"
                            color="secondary"
                            component="span">
                            Upload Image
                        </Button>
                    </AnimateButton>
                </label>
            </Box>            
            {imageUrl && selectedImage && (
                <Box mt={2} display="flex" alignItems={'center'} justifyContent="center">
                    <Avatar
                        alt={selectedImage.name}
                        src={imageUrl}
                        sx={{ width: 200, height: 200}}
                    />
                </Box>
            )}
        </>
    );
};

export default ImageInputField;