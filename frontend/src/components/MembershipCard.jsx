import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Background from '../assets/data/membership_card_bg.jpeg'
import { Avatar, Box, Container, Typography, Grid, Stack } from '@mui/material';
import Logo from '../assets/data/logo.svg'

const MembershipCard = ({ user }) => {
    return (
        <Box sx={{ width: '100%', position: 'relative', ml: { md: 4} }}>
            <Card>
                <CardMedia
                        component="img"
                        height="300"
                        image={Background}
                        style={{
                            filter: "brightness(50%)"
                        }}
                        alt="background image"
                />
                <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '10px',
                }}
                >
                    <Grid container direction="row" spacing={1}>
                        <Grid item>
                            <Avatar variant="rounded" src={user.img_value_} sx={{ ml: 1, mt: 1, width: 150, height: 150 }}/>
                            <Stack sx={{ ml: 1, mt: 3 }}>
                                <Typography component="span" variant="h2" sx={{ fontWeight: 400, color: 'white' }}>{user.full_name_}</Typography>
                                <Typography variant="h4" sx={{ color: 'white' }}>{user.member_type_}</Typography>
                            </Stack>
                            
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={1}>
                                <Grid item position={'absolute'} right={0} justifyContent={'flex-end'} sx={{ mr: 1 }} >
                                    <Box>  
                                        <img src={Logo} height='100px' alt='logo'/>
                                    </Box>
                                </Grid>
                                <Grid item position={'absolute'} right={0} bottom={0} justifyContent={'flex-end'} sx={{ mr: 2, mb: -4}}>
                                    <Box> 
                                        <Avatar variant="rounded" src={user.qrcode_} sx={{ width: 150, height: 150 }}/> 
                                    </Box>
                                </Grid>
                                
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Box>
    )
}

export default MembershipCard