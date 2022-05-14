import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getCompanies } from '../../store/actions/companyActions'
import BusinessIcon from '@mui/icons-material/Business';
import {  Stack, CircularProgress} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from '../../components/cards/MainCard';


const AllCandidatesPage = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const companiesFetch = useSelector((state) => state.companiesFetch)
    const { loading, companiesGet } = companiesFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        dispatch(getCompanies())
    },[])

    useEffect(() => {
        if(companiesGet){
            setRows(companiesGet.map(company => {
                let x = {
                    ...company, id: company.member_id_
                }
                return x
            }))
        }
    },[companiesGet])

    
    const deleteCompanyHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteCompany(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );
  
    const showProfileHandle = React.useCallback(
      (id) => () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
          ),
        );
      },
      [],
    );

const columns = [
    { field: 'member_id_', headerName: 'ID', width: 70 },
    { field: 'username_', headerName: t('companies_username'), width: 140 },
    { field: 'name_', headerName: t('companies_name'), width: 250, headerAlign: 'center' },
    { field: 'email_', headerName: 'Email', width: 170 , headerAlign: 'center' },    
    { field: 'has_debt_', headerName: t('companies_has_debt'), type: 'boolean', width: 110 },
    { field: 'nif_', headerName: 'NIF', width: 110 },
    { field: 'is_deleted_', headerName: t('companies_is_deleted'), type: 'boolean', width: 110 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<BusinessIcon />}
            label="Show Profile"
            onClick={showProfileHandle(params.id)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCompanyHandle(params.id)}
            disabled={params.row.is_deleted_}
            />
        ],
    },
];


  return (
    <>
      <MainCard title='Companies'sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> :
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      }
      </MainCard> 
    </>
  )
}

export default AllCandidatesPage