import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SurfingIcon from '@mui/icons-material/Surfing'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EventIcon from '@mui/icons-material/Event'
import GroupIcon from '@mui/icons-material/Group';

const pages = {
    id: 'application',
    title: 'Application',
    type: 'group',
    hideIfNotAdmin: false,
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
                    hideIfNotAdmin: false,
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
                    hideIfNotAdmin: false,
                    url: '/application/sports/members/{id}'
                },
                {
                    id: 'all_sports',
                    title: 'All Sports',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: false,
                    url: '/application/sports'
                }
            ]
        },
        {
            id: 'quotas',
            title: 'Quotas',
            type: 'collapse',
            icon: CreditCardIcon,
            hideIfNotAdmin: false,
            children: [
                {
                    id: 'my_quotas',
                    title: 'My Quotas',
                    type: 'item',
                    hasParams: true,
                    hideIfZeroValue: true,
                    hideIfNotAdmin: false,
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
            hideIfNotAdmin: false,
            children: [
                {
                    id: 'my_events',
                    title: 'My Events',
                    type: 'item',
                    hasParams: true,
                    hideIfNotAdmin: false,
                    url: '/application/events/members/{id}'
                },
                {
                    id: 'all_events',
                    title: 'All Events',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: true,
                    url: '/application/events'
                }
            ]
        },
        {
            id: 'groups',
            title: 'Groups',
            type: 'collapse',
            icon: GroupIcon,
            hideMenuIfNotAdmin: true,
            children: [
                {
                    id: 'my_groups',
                    title: 'My Groups',
                    type: 'item',
                    hasParams: true,
                    hideIfNotAdmin: false,
                    url: '/application/groups/members/{id}'
                },
                {
                    id: 'all_groups',
                    title: 'All Groups',
                    type: 'item',
                    hasParams: false,
                    hideIfNotAdmin: false,
                    url: '/application/groups'
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
                    hideIfNotAdmin: true,
                    url: '/application/candidates'
                }
            ]
        }
    ]
}

export default pages