export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

const urlApi = 'https://norma.nomoreparties.space/api/ingredients';


export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    fetch(urlApi, {
      cor: 'no-cors'
    }).then(res => res.json()).then(data => {
      if (data && data.success) {
        console.log(data);
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: data.data
        })
      } else {
        throw new Error('Error')
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    })
  }
}