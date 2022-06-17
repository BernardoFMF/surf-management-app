import React, { useEffect, useState } from 'react'
import { AppBar, MenuItem, Typography, Box, Link,
     Container, Toolbar, IconButton, Menu, ButtonBase } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../../components/Logo'
import TranslationMenu from '../../components/TranslationMenu'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@mui/icons-material/Facebook';
import AnimatedPage from '../../components/AnimatedText'
import default_video from './../../../src/assets/data/homePageVideo.mp4'
import AnimatedVideo from '../../components/AnimatedVideo'

const HomeHeader = ({index, changePage}) => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const {t, i18n} = useTranslation()

    const pages = [{title: t('front_page_home'), index: 0}, {title: t('front_page_about'), index: 1}, {title: t('front_page_contact_us'), index: 2}]
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null)
    }

    return (
      <>
        <AnimatedVideo>
              <video
              id = 'homeVideo'
              autoPlay
              muted
              loop
              >
              <source src = {default_video} type = "video/mp4" />
              </video>
          </AnimatedVideo>
        <AppBar position="absolute" style={{ display: 'flex', background: 'transparent', boxShadow: 'none'}}>
          <Container maxWidth="x1">
            <AnimatedPage>
              <Toolbar disableGutters>
                <Logo variant='default' path='/' sx={{
                    marginLeft: { xs: 0, md: 20 },
                    width: { xs: 200, md: 200 },
                    maxWidth: { xs: 500, md: 500 },
                }}></Logo>
                <Box justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="nav menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    sx={{ color: '#fff'}}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page.title} onClick={() => {handleCloseNavMenu();changePage(page.index)}}>
                          <Typography textAlign="center">{page.title}</Typography> 
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box justifyContent="flex-end" sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  
                  {pages.map((page) => (
                    <ButtonBase disableRipple key={page.title}>
                        <Typography
                          key={page.title}
                          onClick={() => {handleCloseNavMenu();changePage(page.index)}}
                          underline= 'none'
                          href='/'
                          sx={{ marginRight: { xs: 0, md: 5 }, my: 2, color: '#fff', fontSize: '1.5em', fontWeight: 700, display: 'block' }}
                        >
                          {page.title}
                        </Typography>
                    </ButtonBase>
                  ))}
                </Box>
                <Box sx={{ marginRight: { xs: 0, md: 2}}}>
                  <TranslationMenu></TranslationMenu>
                </Box>            
              </Toolbar>
            </AnimatedPage>
          </Container>
        </AppBar>
      </>
    );
  };

export default HomeHeader