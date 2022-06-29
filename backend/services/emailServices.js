'use strict'

import error from '../utils/error.js'
import { contact } from '../utils/email/mailSender.js'

const emailServices = () => {
    const sendContactEmailServices = async (from, name, topic, content) => {
        if (!from) throw error(400, 'Parameter not found: from', 'MESSAGE_CODE_14')
        if (!name) throw error(400, 'Parameter not found: name', 'MESSAGE_CODE_14')
        if (!topic) throw error(400, 'Parameter not found: topic', 'MESSAGE_CODE_14')
        if (!content) throw error(400, 'Parameter not found: content', 'MESSAGE_CODE_14')

        await contact(from, name, topic, content)
    }

    return {
        sendContactEmailServices
    }
}

export default emailServices