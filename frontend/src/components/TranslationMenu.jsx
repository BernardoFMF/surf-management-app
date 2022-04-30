import React, { useState } from 'react'
import { Box, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import GTranslateIcon from '@mui/icons-material/GTranslate';

import i18n from '../i18n'

const languages = [{abbreviation: 'en', name: 'English'}, {abbreviation: 'pt', name: 'Português'}]

const TranslationMenu = ({sx}) => {
    const [anchorTranslationNav, setAnchorTranslationNav] = useState(null);
    
    const handleOpenTranslationMenu = (event) => {
        setAnchorTranslationNav(event.currentTarget)
      }
  
      const handleChangeTranslationMenu = (lang) => {
          return () => {
            setAnchorTranslationNav(null)
            localStorage.setItem('i18n-lang', lang)
            i18n.changeLanguage(lang)
          }
      }

  return (
    <>
        <Box display="flex" alignItems={'center'} justifyContent="center" sx={sx}>
              <Avatar variant="rounded" sx={{ bgcolor: 'white' }} onClick={handleOpenTranslationMenu} aria-controls="translation-appbar">
                <GTranslateIcon />
              </Avatar>
            </Box>
            <Menu
                id="translation-appbar"
                anchorEl={anchorTranslationNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(anchorTranslationNav)}
                onClose={handleChangeTranslationMenu}
                sx={{
                  display: 'block',
                }}
              >
                {languages.map((language) => (
                  <MenuItem key={language.abbreviation} onClick={handleChangeTranslationMenu(language.abbreviation)}>
                    <Typography key={language.abbreviation} textAlign="center">{language.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
    </>
  )
}

export default TranslationMenu