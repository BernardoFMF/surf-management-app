import UploadFileIcon from '@mui/icons-material/UploadFile';

const other = {
    id: 'otherPage',
    title: 'Other',
    type: 'group',
    hideIfNotAdmin: true,
    children: [
        {
            id: 'uploadFile',
            title: 'Upload File',
            type: 'item',
            url: '/uploadfile',
            icon: UploadFileIcon,
            hideIfNotAdmin: true
        }
    ]
}

export default other