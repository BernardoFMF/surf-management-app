import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import Background from '../../assets/data/membership_card_bg.jpeg'

import Logo from '../../assets/data/logo.svg'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useTranslation } from 'react-i18next'
import { Avatar, Box, Typography, Grid, Stack, CircularProgress, useMediaQuery } from '@mui/material';

const MembershipCardTab = () => {
  const memberFetch = useSelector((state) => state.memberFetch)
  const { memberGet } = memberFetch
  const mediumViewport = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(true);
  const {t, i18n} = useTranslation()

  const imageLoaded = () => {
      setLoading(false);
  }

  return (
      <>
          <Box sx={{ display: loading ? 'flex' : 'none' }}>
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
                                          <Avatar variant="rounded" src={memberGet.img_value_} sx={{ ml: 1, mt: 1, width: 150, height: 150 }}/>
                                          <Stack sx={{ ml: 1, mt: 1.5 }}>
                                                <Typography component="span" variant="h2" sx={{ fontWeight: 400, color: 'white' }}>{memberGet.full_name_}</Typography>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 0, color: 'white' }}>{memberGet.member_type_}</Typography>
                                                <Typography component="span" variant="h5" sx={{ fontWeight: 0, color: 'white' }}>{t("associate_number")+ ": " + memberGet.member_id_}</Typography>
                                                <Typography component="span" variant="h5" sx={{ fontWeight: 0, color: 'white' }}>{t("member_since") + memberGet.enrollment_date_.slice(0,10)}</Typography>
                                          </Stack>
                                  </Grid>
                                  <Grid item>
                                      <Grid container direction="row" spacing={1}>
                                          <Grid item position={'absolute'} right={0} justifyContent={'flex-end'} sx={{ mr: 1 }} >
                                              <Box>  
                                                  <img src={Logo} height='100px' alt='logo' onLoad={imageLoaded}/>
                                              </Box>
                                          </Grid>
                                          <Grid item position={'absolute'} right={0} bottom={0} justifyContent={'flex-end'} sx={{ mr: 2, mb: -2}}>
                                              <Box>
                                                  <Avatar variant="rounded" src={memberGet.qrcode_} sx={{ width: 150, height: 150 }}/>
                                              </Box>
                                          </Grid>      
                                      </Grid>
                                  </Grid>
                              </>   
                              ) : ( 
                              <>
                                  <Grid item display={'flex'} flexDirection='column' justifyContent={'center'}>
                                      <Avatar variant="rounded" src={memberGet.img_value_} sx={{ mt: 1, width: 150, height: 150 }}/>
                                  </Grid>
                                  <Grid item>
                                      <Stack sx={{ mt: 3 }}>
                                            <Typography component="span" variant="h2" sx={{ fontWeight: 400, color: 'white' }}>{memberGet.full_name_}</Typography>
                                            <Typography component="span" variant="h4" sx={{ fontWeight: 0, color: 'white' }}>{memberGet.member_type_}</Typography>
                                            <Typography component="span" variant="h5" sx={{ fontWeight: 0, color: 'white' }}>{t("associate_number")+ ": " + memberGet.member_id_}</Typography>
                                            <Typography component="span" variant="h5" sx={{ fontWeight: 0, color: 'white' }}>{t("member_since") + memberGet.enrollment_date_.slice(0,10)}</Typography>
                                      </Stack>
                                  </Grid>
                                  <Grid item sx={{ mt: 4 }}>
                                      <Box>
                                          <Avatar variant="rounded" src={memberGet.qrcode_} sx={{ width: 150, height: 150 }}/>
                                      </Box>
                                  </Grid>
                                      
                                  <Grid item sx={{ mt: 4 }}>
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

export default MembershipCardTab