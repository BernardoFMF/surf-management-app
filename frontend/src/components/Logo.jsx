import { ButtonBase, Link, Box } from '@mui/material';

import default_logo from '../assets/data/logo.svg';
import blue_logo from '../assets/data/logo-blue.svg';

const Logo = ({variant, path}) => {
    return (<><ButtonBase disableRipple component={Link} to={path}>
        <Box
            component="img"
            sx={{
                marginLeft: { xs: 0, md: 20 },
                width: { xs: 200, md: 200 },
                maxWidth: { xs: 500, md: 500 },
            }}
            alt={variant === 'default' ? 'logo.svg' : 'blue-logo.svg'}
            src={variant === 'default' ? default_logo : blue_logo}
        > 
            <Logo variant={variant === 'default' ? default_logo : blue_logo}/>
        </Box>
    </ButtonBase></>)
};

export default Logo;