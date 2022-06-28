import { useTranslation } from 'react-i18next'
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router'
import { gridSpacing } from '../store/constants/themeConstants'

// material-ui
import { Avatar, Box, Alert, Grid, Typography, } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SurfingIcon from '@mui/icons-material/Surfing'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EventIcon from '@mui/icons-material/Event'
// project imports

import MainCard from './cards/MainCard';
import AvatarBase64 from './AvatarBase64';
// ==============================|| DEFAULT DASHBOARD ||============================== //
import CandidatesCardChart from './charts/CandidatesCardChart';
import CompaniesCardChart from './charts/CompaniesCardChart';
import UsersCardChart from './charts/UsersCardChart';
import OverviewCard from './OverviewCard';
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
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
        background: theme.palette.secondary[800],
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

const Dashboard = ({memberInfo, error}) => {
    const theme = useTheme();
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()


    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            <MainCard>
                <Grid container justifyContent={'center'} spacing={gridSpacing}>
                    <Grid item md={4}>
                        <AvatarBase64 size={300} name='img' label={t('sign_up_image') } memberInfo={memberInfo}></AvatarBase64>
                    </Grid>
                </Grid>
                <Grid container mt={2} justifyContent={'center'} spacing={gridSpacing}>
                    <Grid item  md={3}>
                        <OverviewCard label={t('my_profile')} icon={<PersonRoundedIcon sx={{width:80, height:80}} />} path={`/application/members/${memberInfo.id_}`}/>
                    </Grid>
                    {memberInfo.category_ !== 'company' && 
                        <Grid item md={3}>
                            <OverviewCard label={t('my_sports')} icon={<SurfingIcon sx={{width:80, height:80}}/>} path={`/application/sports/members/${memberInfo.id_}`}/>
                        </Grid>
                    }
                    <Grid item  md={3}>
                        <OverviewCard label={t('my_events')} icon={<EventIcon sx={{width:80, height:80}}/>} path={`/application/events/members/${memberInfo.id_}`}/>
                    </Grid>
                    {memberInfo.quota_value_ !== 0 && 
                        <Grid item  md={3}>
                            <OverviewCard label={t('my_quotas')} icon={<CreditCardIcon sx={{width:80, height:80}}/>} path={`/application/quotas/members/${memberInfo.id_}`}/>
                        </Grid>
                    }
                </Grid>
            </MainCard>
        </>
    );
};

export default Dashboard;