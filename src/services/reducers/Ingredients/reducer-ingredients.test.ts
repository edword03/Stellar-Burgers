import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../../actions/ingredientsActions';
import { ingredientsReducer } from './ingredientReducer';

describe('ingredients reducer', () => {
  const initialState = {
    ingredientItems: [],

    ingredientsRequest: false,
    ingredientsSuccess: false,
    ingredientsFaled: false,
  };

  it('should have initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handler GET_INGREDIENTS_REQUEST', () => {
    const reducer = ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST });

    expect(reducer).toEqual({
      ingredientItems: [],

      ingredientsRequest: true,
      ingredientsSuccess: false,
      ingredientsFaled: false,
    });
  });

  it('should handler GET_INGREDIENTS_SUCCESS', () => {
    const reducer = ingredientsReducer(
      {
        ingredientItems: [],

        ingredientsRequest: true,
        ingredientsSuccess: false,
        ingredientsFaled: false,
      },
      {
        type: GET_INGREDIENTS_SUCCESS,
        payload: {
          success: true,
          data: [
            {
              _id: '112113',
              name: 'Фл. булка',
              type: 'bun',
              proteins: 100,
              fat: 100,
              carbohydrates: 120,
              calories: 190,
              price: 1000,
              image_large: '/image_large',
              image: '/image',
              image_mobile: '/image_mobile',
              __v: 0,
            },
          ],
        },
      },
    );

    expect(reducer).toEqual({
      ingredientItems: [
        {
          _id: '112113',
          name: 'Фл. булка',
          type: 'bun',
          proteins: 100,
          fat: 100,
          carbohydrates: 120,
          calories: 190,
          price: 1000,
          image_large: '/image_large',
          image: '/image',
          image_mobile: '/image_mobile',
          __v: 0,
        },
      ],

      ingredientsRequest: false,
      ingredientsSuccess: true,
      ingredientsFaled: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const reducer = ingredientsReducer(
      {
        ingredientItems: [],
  
        ingredientsRequest: true,
        ingredientsSuccess: false,
        ingredientsFaled: false,
      },
      { type: GET_INGREDIENTS_FAILED },
    );
    
    expect(reducer).toEqual({
      ingredientItems: [],

      ingredientsRequest: false,
      ingredientsSuccess: false,
      ingredientsFaled: true,
    })
  });
});
