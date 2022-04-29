import { ButtonBase, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import default_logo from '../assets/data/logo.svg';
import blue_logo from '../assets/data/logo-blue.svg';

const Logo = ({variant, path, sx}) => {
    return (<ButtonBase disableRipple component={Link} to={path}>
        <Box
            component="img"
            sx={sx}
            alt={variant === 'default' ? 'logo.svg' : 'blue-logo.svg'}
            src={variant === 'default' ? default_logo : blue_logo}
        />
    </ButtonBase>)
};

export default Logo;