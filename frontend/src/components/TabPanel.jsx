import React from 'react'

function TabPanel(props) {
    const { children, value, index, ...others } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...others}
        >
            {value === index && children}
        </div>
    )
}

export default TabPanel