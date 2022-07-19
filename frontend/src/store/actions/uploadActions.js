import {
    UPLOAD_REQUEST,
    UPLOAD_SUCCESS,
    UPLOAD_FAIL
  } from '../constants/uploadConstants'

  export const uploadFile = (file) => async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_REQUEST,
      })
      const request = await fetch(`/api/uploadfile`, {
          method: 'POST',
          body: file
      })
      const response = await request.json()
      if(request.status !== 201) throw Error(response.message_code || "MESSAGE_CODE_2")
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: response,
      })
  
    } catch (error) {
      dispatch({
        type: UPLOAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }