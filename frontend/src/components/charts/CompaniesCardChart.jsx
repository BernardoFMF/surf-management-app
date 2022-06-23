import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from '../cards/MainCard';
import SkeletonChartCard from '../skeletons/ChartCardSkeleton';

// assets
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BusinessIcon from '@mui/icons-material/Business';
import AnimatedCard from '../AnimatedPage'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const CompaniesCardChart = ({ isLoading, total }) => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()

    return (
        <>
            {isLoading ? (
                <SkeletonChartCard />
            ) : (
                <AnimatedCard>
                    <CardWrapper border={false} content={false} >
                        <Box sx={{ p: 2.25 }} height={'100%'}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container justifyContent="space-between">
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.largeAvatar,
                                                    backgroundColor: theme.palette.primary[800],
                                                    color: theme.palette.primary.primaryLight,
                                                    mt: 1
                                                }}
                                                onClick={() => navigate(`/application/users`)}
                                            >
                                                <BusinessIcon/>
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {total}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ mb: 1.25 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: theme.palette.primary[200]
                                        }}
                                    >
                                        {t('total_companies')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardWrapper>
                </AnimatedCard>
            )}
        </>
    );
};

CompaniesCardChart.propTypes = {
    isLoading: PropTypes.bool
};

export default CompaniesCardChart;