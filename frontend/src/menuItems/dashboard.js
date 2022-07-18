import { IconDashboard } from '@tabler/icons'
import AssessmentIcon from '@mui/icons-material/Assessment';
const icons = { IconDashboard }

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    hideIfNotAdmin: false,
    children: [
        {
            id: 'overview',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/overview',
            icon: icons.IconDashboard,
            hideIfNotAdmin: false
        },
        {
            id: 'analytics',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/analytics',
            icon: AssessmentIcon,
            hideIfNotAdmin: true
        }
    ]
}

export default dashboard