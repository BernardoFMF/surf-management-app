import React, { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { parse, isDate } from "date-fns";
import {
    Box,
    Grid,
    Button,
    useMediaQuery
} from '@mui/material';
import AnimateButton from '../extended/AnimateButton'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'


const MultiStepForm = ({ children, initialValues, onSubmit }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()

    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children)

    const [snapshot, setSnapshot] = useState(initialValues)

    const step = steps[stepNumber]
    const totalSteps = steps.length
    const isLastStep = stepNumber === totalSteps - 1

    const next = (values) => {
        setSnapshot(values)
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
    }
    
    const previous = (values) => {
        setSnapshot(values)
        setStepNumber(Math.max(stepNumber - 1, 0))
    }

    const handleSubmit = async (values, actions) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values, actions)
        }

        if (isLastStep) {
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }
    }

    return (
        <Formik initialValues={snapshot} validationSchema={step.props.validationSchema} onSubmit={handleSubmit}>
            {formik => (
                <Form>
                <p>
                    {t('sign_up_step')} {stepNumber + 1} {t('sign_up_of')} {totalSteps}
                </p>
                {step}

                <Grid container spacing={matchDownSM ? 0 : 2}>
                    <Grid item xs={12} sm={6} style={{marginTop: '10px'}}>
                        {stepNumber > 0 && (
                            <AnimateButton>
                                <Button 
                                disableElevation
                                fullWidth
                                size="normal"
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={() => previous(formik.values)}>
                                    {t('sign_up_back')} 
                                </Button>
                            </AnimateButton>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop: '10px'}}>
                        <AnimateButton>
                            <Button
                            disableElevation
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="normal"
                            type="submit"
                            variant="contained"
                            color="primary"
                            >
                                {isLastStep ? t('sign_up_submit')  : t('sign_up_next') }
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children }) => {
    return children
}