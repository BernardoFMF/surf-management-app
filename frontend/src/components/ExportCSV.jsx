import * as React from 'react';

import AnimateButton from './extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { CSVLink } from "react-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const ExportCSV = ({csvreport, exportText}) => {
    return (
        <CSVLink {...csvreport} style={{textDecoration:"none"}}>
            <AnimateButton>
                <LoadingButton
                    disableElevation
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<FileDownloadIcon></FileDownloadIcon>}
                >
                    {exportText}
                </LoadingButton>
            </AnimateButton>
        </CSVLink>
    )
}

export default ExportCSV