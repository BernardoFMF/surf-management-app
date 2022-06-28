// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const ChartCard = () => (
    <Card>
        <CardContent>
            <Grid container direction="column">
                <Grid item>
                    <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} width={100}/>
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" height={30} width={200}/>
                </Grid>
            </Grid>   
        </CardContent>
    </Card>
);

export default ChartCard;