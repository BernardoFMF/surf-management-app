import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCandidate, getCandidates, getCandidateById } from '../../store/actions/candidateActions'

import {  useMediaQuery, Stack, CircularProgress} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from '../../components/cards/MainCard';

const AllCandidatesPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const candidatesFetch = useSelector((state) => state.candidatesFetch)
    const { loading, error, candidatesGet } = candidatesFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        dispatch(getCandidates())
    },[])

    useEffect(() => {
        if(candidatesGet){
            setRows(candidatesGet.map(candidate => {
                let x = {
                    ...candidate, id: candidate.id_
                }
                return x
            }))
        }
    },[candidatesGet])

    
    const deleteCandidateHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteCandidate(id))
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
    { field: 'id_', headerName: 'ID', width: 70 },
    { field: 'username_', headerName: t('candidates_username'), width: 140 },
    { field: 'full_name_', headerName: t('candidates_full_name'), width: 250, headerAlign: 'center' },
    { field: 'email_', headerName: 'Email', width: 170 , headerAlign: 'center' },
    { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150},
    { field: 'gender_', headerName: t('candidates_gender'), width: 130 },
    { field: 'birth_date_', headerName: t('candidates_birth_date'), width: 160, type: 'date' },
    { field: 'location_', headerName: t('candidates_location'), width: 100 },
    { field: 'address_', headerName: t('candidates_address'), width: 180, headerAlign: 'center'  },
    { field: 'postal_code_', headerName: t('candidates_postal_code'), width: 110 },
    { field: 'cc_', headerName: 'CC', width: 110 },
    { field: 'nif_', headerName: 'NIF', width: 110 },

    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<HowToRegIcon />}
            label="Show Profile"
            onClick={showProfileHandle(params.id)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCandidateHandle(params.id)}
            />
        ],
    },
];


  return (
    <>
      <MainCard title='Candidates'sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> :
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      }
      </MainCard> 
    </>
  )
}

export default AllCandidatesPage