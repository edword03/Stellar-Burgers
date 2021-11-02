import { CLEAR_CONSTRUCTOR } from './constructorAction'

export const SEND_DATA = 'SEND_DATA'
export const SEND_DATA_REQUEST = 'SEND_DATA_REQUEST'
export const SEND_DATA_SUCCESS = 'SEND_DATA_SUCCESS'
export const SEND_DATA_FAILED = 'SEND_DATA_FAILED'
export const CLOSE_ORDER = 'CLOSE_ORDER'

const apiUrl = `${process.env.REACT_APP_URL}/orders`;


export const sendOrder = (data) => {
  return dispatch => {
    dispatch({
      type: SEND_DATA_REQUEST
    })

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Error')
      })
      .then(dataRes => {
        if (dataRes && dataRes.success) {
          dispatch({
            type: SEND_DATA_SUCCESS,
            order: dataRes.order.number,
            orderBody: data
          })
          dispatch({
            type: CLEAR_CONSTRUCTOR
          })
        }
      }).catch(err => {
        console.error(err)
        dispatch({
          type: SEND_DATA_FAILED
        })
      })
  };
}
