export const RESET_PASSWORD = 'RESET_PASSWORD'

export function resetPassword(body, payload, url = '') {
  return dispatch => {
    console.log('url: ', url);
    fetch(`${process.env.REACT_APP_URL}/password-reset${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
  
      throw new Error('Network error')
    }).then(data => {
      if (data.success) {
        dispatch({
          type: RESET_PASSWORD,
          payload: payload
        })
      }
    }).catch(err => console.error(err))
  }
}