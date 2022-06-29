// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const OverviewSkeleton = ({memberInfo}) => (
    <Card>
        <CardContent>
            <Grid container direction={ { xs: "column", md: "row"} } justifyContent={'center'} spacing={5}>
                <Grid item md={4}>
                    <Skeleton variant="circular" height={300} width={300}/>
                </Grid>
            </Grid>
            <Grid container mt={2} justifyContent={'center'} spacing={1}>
                <Grid item  md={3}>
                    <Skeleton variant="rectangular" height={100} width={500}/>
                </Grid>
                {memberInfo.category_ !== 'company' && 
                    <Grid item md={3}>
                        <Skeleton variant="rectangular" height={100} width={500}/>
                    </Grid>
                }
                <Grid item  md={3}>
                    <Skeleton variant="rectangular" height={100} width={500}/>
                </Grid>
                {memberInfo.quota_value_ !== 0 && 
                    <Grid item  md={3}>
                        <Skeleton variant="rectangular" height={100} width={500}/>
                    </Grid>
                }
            </Grid>
        </CardContent>
    </Card>
);

export default OverviewSkeleton;