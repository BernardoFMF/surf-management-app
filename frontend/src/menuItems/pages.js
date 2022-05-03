import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SurfingIcon from '@mui/icons-material/Surfing'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EventIcon from '@mui/icons-material/Event'

const pages = {
    id: 'application',
    title: 'Application',
    type: 'group',
    children: [
        {
            id: 'members',
            title: 'Members',
            type: 'collapse',
            icon: PersonRoundedIcon,
            children: [
                {
                    id: 'myprofile',
                    title: 'My Profile',
                    type: 'item',
                    url: '/profile',
                },
                {
                    id: 'allUsers',
                    title: 'All Users',
                    type: 'item',
                    url: '/application/users',
                },
                {
                    id: 'allCompanies',
                    title: 'All Companies',
                    type: 'item',
                    url: '/application/companies',
                }
            ]
        },
        {
            id: 'sports',
            title: 'Sports',
            type: 'collapse',
            icon: SurfingIcon,
            children: [
                {
                    id: 'mysports',
                    title: 'My Sports',
                    type: 'item',
                    url: '/profile',
                    target: true
                },
                {
                    id: 'allSports',
                    title: 'All Sports',
                    type: 'item',
                    url: '/sports',
                    target: true
                }
            ]
        },
        {
            id: 'quotas',
            title: 'Quotas',
            type: 'collapse',
            icon: CreditCardIcon,
            children: [
                {
                    id: 'myquotas',
                    title: 'My Quotas',
                    type: 'item',
                    url: '/profile',
                    target: true
                },
                {
                    id: 'allQuotas',
                    title: 'All Quotas',
                    type: 'item',
                    url: '/sports',
                    target: true
                }
            ]
        },
        {
            id: 'events',
            title: 'Events',
            type: 'collapse',
            icon: EventIcon,
            children: [
                {
                    id: 'myEvents',
                    title: 'My Events',
                    type: 'item',
                    url: '/profile',
                    target: true
                },
                {
                    id: 'allEvents',
                    title: 'All Events',
                    type: 'item',
                    url: '/events',
                    target: true
                }
            ]
        },
        {
            id: 'candidates',
            title: 'Candidates',
            type: 'collapse',
            icon: PersonAddIcon,

            children: [
                {
                    id: 'allCandidates',
                    title: 'All Candidates',
                    type: 'item',
                    url: '/candidates',
                    target: true
                }
            ]
        }
    ]
}

export default pages