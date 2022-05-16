import { IconDashboard } from '@tabler/icons'

const icons = { IconDashboard }

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'overview',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/overview',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
}

export default dashboard