import React, { useState } from 'react'
import { AppBar, MenuItem, Typography, Box, Link,
     Container, Toolbar, IconButton, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from '../../components/Logo'
import TranslationMenu from '../../components/TranslationMenu'
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@mui/icons-material/Facebook';



const HomeHeader = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const {t, i18n} = useTranslation()

    const pages = [{title: t('front_page_home'), ref: '/'}, {title: t('front_page_about'), ref: '/about'}, {title: t('front_page_contact_us'), ref: '/contact'}]
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null)
    }

    return (
      <AppBar position="absolute" style={{ display: 'flex', background: 'transparent', boxShadow: 'none'}}>
        <Container maxWidth="x1">
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
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    <Link key={page.title} underline= 'none' href={page.ref}>
                        <Typography textAlign="center">{page.title}</Typography>
                    </Link>
                    
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box justifyContent="flex-end" sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
              {pages.map((page) => (
                <Link
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  underline= 'none'
                  href= {page.ref}
                  sx={{ marginRight: { xs: 0, md: 5 }, my: 2, color: '#fff', fontSize: '1.5em', fontWeight: 700, display: 'block' }}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
            <Box sx={{ marginRight: { xs: 0, md: 2}}}>
              <TranslationMenu></TranslationMenu>
            </Box>            
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

export default HomeHeader