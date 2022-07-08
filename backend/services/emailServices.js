'use strict'

import error from '../utils/error.js'
import { contact, notify } from '../utils/email/mailSender.js'
import { contactUsTemplate, notifyTemplate } from '../utils/email/mailTemplates.js'
import quotaData from '../data/quotaData.js'

const emailServices = (db) => {
	const data = quotaData(db)

    const sendContactEmailServices = async (from, name, topic, content) => {
        if (!from) throw error(400, 'Parameter not found: from', 'MESSAGE_CODE_14')
        if (!name) throw error(400, 'Parameter not found: name', 'MESSAGE_CODE_14')
        if (!topic) throw error(400, 'Parameter not found: topic', 'MESSAGE_CODE_14')
        if (!content) throw error(400, 'Parameter not found: content', 'MESSAGE_CODE_14')

        return await contact(from, name, contactUsTemplate(from, name, topic, content))
    }

    const sendNotifyEmailServices = async () => {
        const quotas = await data.getQuotas(undefined, undefined, undefined, 0, -1)
        const receivers = []
        quotas.quotas.map(row => {
            if (!receivers.includes(row.email_)) {
                receivers.push(row.email_)
            }
        })
        for (const row of receivers) {
            const quotasByEmail = await data.getQuotasByEmail(row)
            await notify(row, `Quotas em atraso`, notifyTemplate(quotasByEmail))
          }
        return true
    }

    return {
        sendContactEmailServices,
        sendNotifyEmailServices
    }
}

export default emailServices