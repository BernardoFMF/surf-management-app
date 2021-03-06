import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberGroups }  from '../../store/actions/groupActions'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress, Grid, Chip, Stack, Box, Alert, Pagination } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import MainCard from '../../components/cards/MainCard';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import { blue , green } from "@mui/material/colors";
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../components/multiStepForm/InputField';
import { getTypes } from '../../store/actions/typeActions'
import { getUserSportsTypes } from '../../store/actions/sportActions'
import CheckGroupInputField from '../../components/multiStepForm/CheckGroupInputField';
import Meta from '../../components/Meta';
import { MEMBER_GROUPS_FETCH_RESET } from '../../store/constants/groupConstants';
import { TYPES_FETCH_RESET } from '../../store/constants/typeConstants';
import { USER_SPORT_TYPES_FETCH_RESET } from '../../store/constants/sportConstants';
import useLang from '../../hooks/useLang'

const MyGroupsPage = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { lang } = useLang()
    const memberGroupsFetch = useSelector((state) => state.memberGroupsFetch)
    const { loading, error, memberGroupsGet } = memberGroupsFetch

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingMemberTypes, error: errorMemberTypes, typesGet } = typesFetch

    const userSportsTypesFetch = useSelector((state) => state.userSportsTypesFetch)
    const { loading: loadingSportTypes, error: errorSportTypes, userSportsTypesGet } = userSportsTypesFetch

    const [rows, setRows] = useState([]);
    let { id } = useParams()

    const [page, setPage] = useState(1);

    const [ searchState, setSearchState ] = useState({
        name_filter: "",
        group_type_filter: "",
        types_filter: [],
        limit: 10
    })

    useEffect(() => {
        dispatch(getMemberGroups(id, searchState.name_filter, searchState.group_type_filter, searchState.types_filter, 0, searchState.limit))
        dispatch(getTypes())
        dispatch(getUserSportsTypes())
        return () => {
            dispatch({ type: MEMBER_GROUPS_FETCH_RESET })
            dispatch({ type: TYPES_FETCH_RESET })
            dispatch({ type: USER_SPORT_TYPES_FETCH_RESET })
        }
    }, [])

    useEffect(() => {
        if (memberGroupsGet) {
            setRows(memberGroupsGet.groups.map(memberGroup => {
                let x = {
                    ...memberGroup, id: memberGroup.group_id_
                }
                return x
            }))
        }
    },[memberGroupsGet])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getMemberGroups(id,searchState.name_filter, searchState.group_type_filter, searchState.types_filter, (value-1)*searchState.limit, searchState.limit))
    }

    const searchHandler = async(values) => {
        const type = values.group_type_filter === t('member_type')
        const type2 = values.group_type_filter === t('member_sport_type')
        setSearchState(values)
        setPage(1)
        setRows([])
        
        dispatch(getMemberGroups(id, values.name_filter, type ? 'member_type' : type2 ? 'member_sport_type' : '', values.types_filter, 0, values.limit))
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
        { field: 'group_id_', headerName: 'ID', width: 100 ,headerAlign: "center",align:'center'},
        { field: 'name_', headerName: t('name'), width: 250 ,headerAlign: "center",align:'center'},
        {
            field: "type_",
            headerName: t('group_type'),
            width: 225,
            description: "Types",
            headerAlign: "center",
            align: 'center',
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
                />
            ],
        },
    ];

    return (
        <>
            <Meta title={t('my_groups_page_title')}/>
            <MainCard title={t('member_groups')} sx={{height: '100%'}}>
                {
                    loading || loadingMemberTypes || loadingSportTypes ? 
                        <Stack alignItems="center">
                            <CircularProgress size='4rem'/>
                        </Stack> : (
                        <>
                            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: MEMBER_GROUPS_FETCH_RESET })}>{t(error)}</Alert></Box> }
                            { errorSportTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: USER_SPORT_TYPES_FETCH_RESET })}>{t(errorSportTypes)}</Alert></Box> }
                            { errorMemberTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: TYPES_FETCH_RESET })}>{t(error)}</Alert></Box> }
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
                                                    <DropdownInputField name='group_type_filter' label={t('group_type')} options={{ member_type: t('member_type'), member_sport_type: t('member_sport_type'), none: t('none') }}></DropdownInputField>
                                                </Grid>
                                                {
                                                    (formik.values.group_type_filter !== '' && formik.values.group_type_filter !== t('none')) &&
                                                    <Grid item>
                                                        <CheckGroupInputField
                                                            name="types_filter"
                                                            label={t("types")}
                                                            options={
                                                                formik.values.group_type_filter === t('member_type') ? typesGet.map(type => { let obj = {name: type.type_, label: type.type_}; return obj}) : userSportsTypesGet
                                                            }
                                                        />
                                                    </Grid>
                                                }
                                                <Grid item>
                                                    <DropdownInputField name='limit' label={t('rows')} options={[10, 15, 20]} ></DropdownInputField>
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
                                        pageSize={searchState.limit}
                                        hideFooter={true}
                                        onPageChange={changePageHandler}
                                        localeText={lang}
                                        sx={{
                                            "& .MuiDataGrid-columnHeaders": {
                                                backgroundColor: "rgba(219, 219, 219, 0.5)"
                                            }
                                        }}
                                    />
                                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(memberGroupsGet.number_of_groups / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                                </>
                            )}
                        </>
                        )
                }
                
            </MainCard>
        </>
    )
}

export default MyGroupsPage