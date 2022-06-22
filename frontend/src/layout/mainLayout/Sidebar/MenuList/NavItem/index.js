import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

import { MENU_OPEN, SET_MENU } from '../../../../../store/constants/customizationConstants';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const parameterize = (path, parameter) => {
    return path.replace(/{.*}/, parameter)
}

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.hasParams ? parameterize(item.url, memberInfo.id_) : item.url} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
    }, []);

    return (
        <>
            {
                (item.hideIfNotAdmin === false || (item.hideIfNotAdmin === true && memberInfo.is_admin_ === true)) && (
                <ListItemButton
                    {...listItemProps}
                    disabled={item.disabled}
                    sx={{
                        borderRadius: `${customization.borderRadius}px`,
                        mb: 0.5,
                        alignItems: 'flex-start',
                        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                        py: level > 1 ? 1 : 1.25,
                        pl: `${level * 24}px`
                    }}
                    selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
                    onClick={() => itemHandler(item.id)}
                >
                    <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                                {t(item.id)}
                            </Typography>
                        }
                        secondary={
                            item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )
                        }
                    />
                    {item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                        />
                    )}
                </ListItemButton>
                )
            }
        </>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;