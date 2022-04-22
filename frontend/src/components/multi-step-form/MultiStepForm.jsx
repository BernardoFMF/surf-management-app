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

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

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

    const parseDate = (value, originalValue) => {
        const parsedDate = isDate(originalValue)
          ? originalValue
          : parse(originalValue, "yyyy-MM-dd", new Date());
      
        return parsedDate;
    }

    const handleSubmit = async (values, actions) => {
        console.log(values);
        console.log(actions);
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
                    Step {stepNumber + 1} of {totalSteps}
                </p>
                {step}
                <div style={{ display: 'flex' }}>
                    <Grid container spacing={matchDownSM ? 0 : 2}>
                        <Grid item xs={12} sm={6}>
                            {stepNumber > 0 && (
                                <AnimateButton>
                                    <Button 
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => previous(formik.values)}>
                                        Back
                                    </Button>
                                </AnimateButton>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AnimateButton>
                                <Button
                                disableElevation
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                >
                                    {isLastStep ? 'Submit' : 'Next'}
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </div>
                </Form>
            )}
        </Formik>
    )
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children }) => {
    return children
}