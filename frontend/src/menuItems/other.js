import { IconBrandChrome, IconHelp } from '@tabler/icons'

const icons = { IconBrandChrome, IconHelp }

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'about',
            title: 'About Us',
            type: 'item',
            url: '/about',
            icon: icons.IconHelp,
        }
    ]
}

export default other