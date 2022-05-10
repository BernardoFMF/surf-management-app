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
                    hasParams: true,
                    url: '/application/members/{id}',
                },
                {
                    id: 'allUsers',
                    title: 'All Users',
                    type: 'item',
                    hasParams: false,
                    url: '/application/users',
                },
                {
                    id: 'allCompanies',
                    title: 'All Companies',
                    type: 'item',
                    hasParams: false,
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
                    hasParams: false,
                    url: '/profile'
                },
                {
                    id: 'allSports',
                    title: 'All Sports',
                    type: 'item',
                    hasParams: false,
                    url: '/application/sports'
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
                    hasParams: true,
                    url: '/application/myquotas/{id}'
                },
                {
                    id: 'allQuotas',
                    title: 'All Quotas',
                    type: 'item',
                    hasParams: false,
                    url: '/application/quotas'
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
                    hasParams: false,
                    url: '/profile'
                },
                {
                    id: 'allEvents',
                    title: 'All Events',
                    type: 'item',
                    hasParams: false,
                    url: '/events'
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
                    hasParams: false,
                    url: '/application/candidates'
                }
            ]
        }
    ]
}

export default pages