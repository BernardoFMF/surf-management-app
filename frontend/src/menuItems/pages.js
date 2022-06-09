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
                    id: 'my_profile',
                    title: 'My Profile',
                    type: 'item',
                    hasParams: true,
                    url: '/application/members/{id}',
                },
                {
                    id: 'all_users',
                    title: 'All Users',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: true,
                    url: '/application/users',
                },
                {
                    id: 'all_companies',
                    title: 'All Companies',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: true,
                    url: '/application/companies',
                }
            ]
        },
        {
            id: 'sports',
            title: 'Sports',
            type: 'collapse',
            icon: SurfingIcon,
            hideMenuIfCorporate: true,
            children: [
                {
                    id: 'my_sports',
                    title: 'My Sports',
                    type: 'item',
                    hasParams: true,
                    url: '/application/sports/members/{id}'
                },
                {
                    id: 'all_sports',
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
                    id: 'my_quotas',
                    title: 'My Quotas',
                    type: 'item',
                    hasParams: true,
                    hideIfZeroValue: true,
                    url: '/application/quotas/members/{id}'
                },
                {
                    id: 'all_quotas',
                    title: 'All Quotas',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: true,
                    url: '/application/quotas'
                },
                {
                    id: 'management_quotas',
                    title: 'Manage Quotas',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: true,
                    url: '/application/quotas/management'
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
                    id: 'my_events',
                    title: 'My Events',
                    type: 'item',
                    hasParams: true,
                    url: '/application/events/members/{id}'
                },
                {
                    id: 'all_events',
                    title: 'All Events',
                    type: 'item',
                    hasParams: false,
                    url: '/application/events'
                }
            ]
        },
        {
            id: 'candidates',
            title: 'Candidates',
            type: 'collapse',
            icon: PersonAddIcon,
            hideMenuIfNotAdmin: true,
            children: [
                {
                    id: 'all_candidates',
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