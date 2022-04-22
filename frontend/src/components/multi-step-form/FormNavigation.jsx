import React from 'react'
import {
    Box,
    Button
} from '@mui/material';
import AnimateButton from '../extended/AnimateButton'

const FormNavigation = (props) => {
  return (
    <Box sx={{ mt: 2 }}>
        {props.hasPrevious &&
            <AnimateButton>
                <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="button"
                    onClick={props.onBackClick}
                    variant="contained"
                    color="secondary"
                >
                    Submit
                </Button>
            </AnimateButton>}
        <AnimateButton>
            <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                onClick={props.onBackClick}
                variant="contained"
                color="secondary"
            >
                {props.isLastStep ? 'Submit' : 'Next'}
            </Button>
        </AnimateButton>
    </Box>
  )
}

export default FormNavigation