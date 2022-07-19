import React, { useState } from 'react'
import { Box, Avatar, Menu, MenuItem, Typography, Button } from '@mui/material';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import useLang from '../hooks/useLang'

import i18n from '../i18n'

const languages = [{abbreviation: 'en', name: 'English'}, {abbreviation: 'pt', name: 'Português'}]

const TranslationMenu = ({sx}) => {
    const [anchorTranslationNav, setAnchorTranslationNav] = useState(null);
    const open = Boolean(anchorTranslationNav)
    const { changeLang } = useLang()
    
    const handleTranslationMenu = (event) => {
        setAnchorTranslationNav(event.currentTarget)
    }
  
    const handleChangeTranslationMenu = (lang) => {
        return () => {
          setAnchorTranslationNav(null)
          localStorage.setItem('i18n-lang', lang)
          i18n.changeLanguage(lang)
          changeLang(lang)
        }
    }

    const handleClose = () => {
      setAnchorTranslationNav(null)
    }

    return (
    <>
        
            <Box display="flex" alignItems={'center'} justifyContent="center" sx={sx}>
                <Button onClick={handleTranslationMenu} aria-controls={open ? "translation-appbar" : undefined} aria-expanded={open ? "true" : undefined}>
                    <Avatar variant="rounded" sx={{ bgcolor: 'white' }} >
                        <GTranslateIcon />
                    </Avatar>
                </Button>
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
                open={open}
                onClose={handleClose}
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