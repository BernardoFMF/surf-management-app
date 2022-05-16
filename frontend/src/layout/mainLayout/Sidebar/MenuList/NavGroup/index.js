import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';


const NavGroup = ({ item }) => {
    const theme = useTheme();
    const { t } = useTranslation()

    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin

    const items = item.children?.filter((menu) => {
        if (menu.hideMenuIfCorporate && memberInfo.member_type_ === 'corporate') return false
        if (menu.hideMenuIfNotAdmin && memberInfo.is_admin_ === false) return false
        return true
    }).map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
                            {t(item.id)}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;