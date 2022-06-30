import {
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAIL
} from '../constants/emailConstants'

export const sendEmailContact = (values) => async (dispatch) => {
    try {
        dispatch({
            type: SEND_EMAIL_REQUEST
        })
        const response = await fetch(`/api/emails/contact`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" }
        })
        const emailResponse = await response.json()
        if(response.status !== 201) throw Error(emailResponse.message_code)
        dispatch({
            type: SEND_EMAIL_SUCCESS,
            payload: emailResponse,
        })
    } catch (error) {
        dispatch({
            type: SEND_EMAIL_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}