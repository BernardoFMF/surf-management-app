import InfoIcon from '@mui/icons-material/Info'
import UploadFileIcon from '@mui/icons-material/UploadFile';

const other = {
    id: 'otherPage',
    title: 'Other',
    type: 'group',
    children: [
        {
            id: 'about',
            title: 'About Us',
            type: 'item',
            url: '/about',
            icon: InfoIcon,
        },
        {
            id: 'uploadFile',
            title: 'Upload File',
            type: 'item',
            url: '/uploadfile',
            icon: UploadFileIcon,
        }
    ]
}

export default other