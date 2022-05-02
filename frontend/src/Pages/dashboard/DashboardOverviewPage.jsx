import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from '../../store/constants/themeConstants';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <h2>Dashboard Page</h2>
        </Grid>
    );
};

export default Dashboard;