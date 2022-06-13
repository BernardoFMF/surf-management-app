import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress, Grid, Chip, Stack, Box, Alert, Pagination } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MainCard from '../../components/cards/MainCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteGroup, getGroups } from '../../store/actions/groupActions';
import { blue , green } from "@mui/material/colors";
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../components/multiStepForm/InputField';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';

const AllGroupsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const groupsFetch = useSelector((state) => state.groupsFetch)
    const { loading, error, groupsGet } = groupsFetch

    const [rows, setRows] = useState([]);

    const [page, setPage] = useState(1);
    const limit = 5

    const [ searchState, setSearchState ] = useState({
        name_filter: "",
        type_filter: ""
    })

    useEffect(() => {
        dispatch(getGroups(searchState.name_filter, searchState.type_filter, 0, limit))
    },[dispatch])

    useEffect(() => {
        if(groupsGet){
            setRows(groupsGet.groups.map(group => {
                let x = {
                    ...group, id: group.group_id_
                }
                return x
            }))
        }
    },[groupsGet])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getGroups(searchState.name_filter, searchState.type_filter, (value-1)*limit, limit))
    }

    const searchHandler = async(values) => {
        const type = values.type_filter === t('member_type')
        const type2 = values.type_filter === t('member_sport_type')
        setSearchState(values)
        setPage(1)
        setRows([])
        
        dispatch(getGroups(values.name_filter, type ? 'member_type' : type2 ? 'member_sport_type' : '', 0, limit))
    }

    const deleteHandler = (id) => {
        dispatch(deleteGroup(id))
        setPage(1)
        setRows([])
        dispatch(getGroups(searchState.name_filter, searchState.type_filter, 0, limit))
    }

    function getChipProps(params) {
        return {
            label: t(params.row.group_type_),
            style: {
                borderColor:params.row.group_type_ === "member_type" ? blue[500] : green[500]
            }
        }
    }

    const columns = [
        { field: 'group_id_', headerName: 'ID', width: 100 },
        { field: 'name_', headerName: t('name'), width: 180 },
        {
            field: "type_",
            headerName: t('group_type'),
            width: 160,
            description: "Types",
            headerAlign: "left",
            renderCell: (params) => {
              return <Chip variant="outlined" size="small" {...getChipProps(params)} />;
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 110,
            headerName: t('actions'),
            getActions: (params) => [
                <GridActionsCellItem
                icon={<GroupIcon />}
                label="View Group"
                onClick={() => navigate(`/application/groups/${params.id}`)}
                />,
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete Group"
                onClick={() => deleteHandler(params.id)}
                />
            ],
        },
    ];

    return (
        <>
            <MainCard title={t('all_groups')} sx={{height: '100%'}}>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                <Box
                    sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `". . . ."
                    "search search search create"
                    ". . . ."`,
                    }}
                >
                    <Box gridArea={'search'}>
                        <Formik
                            initialValues={searchState}
                            enableReinitialize={true}
                            onSubmit={values => searchHandler(values)}
                        >
                        {formik => (
                            <Form>
                                <Grid container spacing={2} direction="row" alignItems={'center'} >
                                    <Grid item>
                                        <InputField name='name_filter' label={t('name')} type='text'></InputField>
                                    </Grid>
                                    <Grid sx={{ width: { md: 200 }}} item>
                                        <DropdownInputField name='type_filter' label={t('group_type')} options={{ member_type: t('member_type'), member_sport_type: t('member_sport_type'), none: t('none') }}></DropdownInputField>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <LoadingButton
                                                disableElevation
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                loading = {loading}
                                                startIcon={<SearchIcon></SearchIcon>}
                                            >
                                                {t('search')}
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Grid>    
                                </Grid>
                            </Form>
                        )}
                        </Formik>
                    </Box>
                </Box>
                { loading ? 
                    <Stack alignItems="center">
                        <CircularProgress size='4rem'/>
                    </Stack> : (
                    <>
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={limit}
                            hideFooter={true}
                            onPageChange={changePageHandler}
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "rgba(219, 219, 219, 0.5)"
                                }
                            }}
                        />
                        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(groupsGet.number_of_groups / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                    </>
                )}
            </MainCard>
        </>
    )
}

export default AllGroupsPage