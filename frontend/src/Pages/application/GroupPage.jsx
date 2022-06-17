import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupById, getGroupByIdMembers } from  '../../store/actions/groupActions'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import MainCard from '../../components/cards/MainCard'
import { Grid, Stack, CircularProgress, Box, Alert, Pagination, Chip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router'
import { Form, Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { blue } from "@mui/material/colors";
import InputField from '../../components/multiStepForm/InputField';

const GroupPage = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams()

    const groupFetch = useSelector((state) => state.groupFetch)
    const { loading, error, groupById } = groupFetch

    const groupMembersFetch = useSelector((state) => state.groupMembersFetch)
    const { loading: loadingMembers, error: errorMembers, groupByIdMembers } = groupMembersFetch

    const [rows, setRows] = useState([]);

    const [page, setPage] = useState(1);
    const limit = 5

    const [ searchState, setSearchState ] = useState({
        username_filter: ""
    })

    useEffect(() => {
        dispatch(getGroupById(id))
        dispatch(getGroupByIdMembers(id, searchState.username_filter, 0, limit))
    }, [dispatch,id])

    useEffect(() => {
        if(groupByIdMembers){
            setRows(groupByIdMembers.members.map(member => {
                let x = {
                    ...member, id: member.id_
                }
                return x
            }))
        }
    },[groupByIdMembers])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getGroupByIdMembers(id, searchState.username_filter, (value-1)*limit, limit))
    }

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        
        dispatch(getGroupByIdMembers(id, values.username_filter, 0, limit))
    }

    function getChipProps(params) {
        return {
            label: t(params.row.member_type_),
            style: {
                borderColor: blue[500]
            }
        }
    }

    const columns = [
        { field: 'id_', headerName: 'ID', width: 100 },
        { field: 'username_', headerName: t('username'), width: 250 },
        {
            field: "member_type_",
            headerName: t('member_type'),
            width: 225,
            description: "Type",
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
                icon={<AccountCircleIcon />}
                label="View Member"
                onClick={() => navigate(`/application/members/${params.id}`)}
                />
            ],
        },
    ];

    function extractTypes(types) {
        let extractedTypes = []
        for (let idx in types) {
            let elem = types[idx]
            let indexType = extractedTypes.findIndex(entry => entry === elem.type)
            if (indexType === -1) {
                extractedTypes.push(elem.type)
            }
        }
        console.log(extractedTypes);
        return extractedTypes
    }

    function extractSports(types) {
        let extractedSports = []
        for (let idx in types) {
            let elem = types[idx]
            let indexSport = extractedSports.findIndex(entry => entry.sport_ === elem.sport_)
            if (indexSport === -1) {
                let obj = {
                    sport_name_: elem.sport_name_,
                    sport_: elem.sport_
                }
                extractedSports.push(obj)
            }
        }
        console.log(extractedSports);
        return extractedSports
    }

    return (
        <>
            {
                loading ?
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                <>
                    <MainCard title={groupById ? groupById.name_ : ''} secondaryText={groupById.description_} sx={{height: '100%'}}>
                        { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                        { errorMembers && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorMembers)}</Alert></Box> }
                        {
                            groupById && groupById.types_ && (
                            <Box marginTop={2}>
                                <Typography variant={"h2"}>{t("types")}</Typography>
                                <Stack direction="row" spacing={1} marginTop={2}>
                                    {
                                        groupById.group_type_ === 'member_type' ?  
                                        groupById.types_.map(type => (
                                            <Chip label={type} key={type} color="secondary" variant="outlined" />
                                        ))
                                        :
                                        extractTypes(groupById.types_).map(entry => (
                                            <Chip label={entry} key={entry} color="secondary" variant="outlined" />
                                        ))
                                    }
                                </Stack>
                            </Box>
                            )
                        }
                        {
                            groupById && groupById.types_ && groupById.group_type_ === 'member_sport_type' && (
                            <Box marginTop={2}>
                                <Typography variant={"h2"}>{t("sports")}</Typography>
                                <Stack direction="row" spacing={1} marginTop={2}>
                                    {
                                        extractSports(groupById.types_).map(entry => (
                                            <Chip clickable label={entry.sport_name_} key={entry.sport_} color="primary" component="a"
                                            href={`/application/sports/${entry.sport_}`} />
                                        ))
                                    }
                                </Stack>
                            </Box>
                            )
                        }
                        
                        <Box
                            sx={{
                                pt: 4,
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
                                            <Grid container spacing={2} direction="row" alignItems={'center'}>
                                                <Grid item>
                                                    <InputField name='username_filter' label={t('sign_up_username')} type='text'></InputField>
                                                </Grid>
                                                <Grid item>
                                                    <AnimateButton>
                                                        <LoadingButton
                                                            disableElevation
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            loading = {loadingMembers}
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
                        { loadingMembers ?
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
                                <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(groupByIdMembers.number_of_members / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                            </>
                            )
                        }
                    </MainCard>
                </>
                )
            }
        </>
    )
}

export default GroupPage