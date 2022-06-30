import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Ericeira Surf Club Management Application',
    description: 'We manage our members as well as allow each member to interact with the community',
    keywords: 'Ericeira, Ericeira Surf Club, Management Application, Surf, Surf Community, Water Sports',
}

export default Meta