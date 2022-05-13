import Background from '../assets/data/membership_card_bg.jpeg'
import Logo from '../assets/data/logo.svg'
import React, { useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, Box, Typography, Grid, Stack, CircularProgress, useMediaQuery } from '@mui/material';

const MembershipCard = ({ user }) => {
    const mediumViewport = useMediaQuery('(min-width:600px)');
    const [loading, setLoading] = useState(true);

    const imageLoaded = () => {
        setLoading(false);
    }

    return (
        <>
            <Box sx={{ display: loading ? 'flex' : 'none', ml: { md: 5} }}>
                <Stack>
                    <CircularProgress size='4rem'/>
                </Stack>
            </Box>
            <Box sx={{ display: loading ? 'none' : 'block', width: '100%', position: 'relative', ml: { md: 4}, mt: { xs: 4, md: 0 } }}>
                <Card>
                    <CardMedia
                            component="img"
                            height={ mediumViewport ? "300" : "600"}
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
                        <Grid container direction="row" spacing={1} justifyContent={mediumViewport ? 'flex-start' : 'center'}>
                            {
                                mediumViewport ? (
                                <>
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
                                                    <img src={Logo} height='100px' alt='logo' onLoad={imageLoaded}/>
                                                </Box>
                                            </Grid>
                                            <Grid item position={'absolute'} right={0} bottom={0} justifyContent={'flex-end'} sx={{ mr: 2, mb: -4}}>
                                                <Box>
                                                    <Avatar variant="rounded" src={user.qrcode_} sx={{ width: 150, height: 150 }}/>
                                                </Box>
                                            </Grid>      
                                        </Grid>
                                    </Grid>
                                </>   
                                ) : ( 
                                <>
                                    <Grid item display={'flex'} flexDirection='column' justifyContent={'center'}>
                                        <Avatar variant="rounded" src={user.img_value_} sx={{ mt: 1, width: 150, height: 150 }}/>
                                    </Grid>
                                    <Grid item>
                                        <Stack sx={{ mt: 3 }}>
                                            <Typography component="span" variant="h2" sx={{ fontWeight: 400, color: 'white' }}>{user.full_name_}</Typography>
                                            <Typography variant="h4" sx={{ color: 'white' }}>{user.member_type_}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item sx={{ mt: 5 }}>
                                        <Box>
                                            <Avatar variant="rounded" src={user.qrcode_} sx={{ width: 150, height: 150 }}/>
                                        </Box>
                                    </Grid>
                                        
                                    <Grid item sx={{ mt: 5 }}>
                                        <Box>  
                                            <img src={Logo} height='80px' alt='logo' onLoad={imageLoaded}/>
                                        </Box>
                                        
                                    </Grid>
                                </>
                                )
                            }
                        </Grid>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default MembershipCard