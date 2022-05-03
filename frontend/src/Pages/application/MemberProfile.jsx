import { Box, Container, Grid, Typography, Stack } from '@mui/material'
import MainCard from '../../components/cards/MainCard'
import SubCard from '../../components/cards/SubCard'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


const MemberProfile = () => {
    let { id } = useParams()
/*
    return (
        <>
            <MainCard title="Profile" >
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <SubCard>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Box sx={{ pt: 2, pl: 2, pr: 2}}>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <Typography variant="h4">{t('hello_profile')}</Typography>
                                            <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                            {user.username_} 
                                            </Typography>
                                        </Stack>
                                        <Typography variant="subtitle2">{user.member_type_}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Sub title">
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="subtitle1" gutterBottom>
                                        subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
                                    </Typography>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>
        </>
    )
    */
}

export default MemberProfile