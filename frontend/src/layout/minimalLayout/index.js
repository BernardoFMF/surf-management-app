import { Outlet } from 'react-router-dom';
import ContactFloatMenu from '../contactFloatMenu/ContactFloatMenu';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
    return (
        <>
            <Outlet />
            <ContactFloatMenu />
        </>
    );
};

export default MinimalLayout;