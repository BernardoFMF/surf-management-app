import InfoIcon from '@mui/icons-material/Info'

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
        }
    ]
}

export default other