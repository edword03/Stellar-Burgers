import { CLOSE_MODAL, OPEN_MODAL } from '../../actions/modalAction';
import { detailsReducer } from './detailsReducer';

describe('details reducer', () => {
  const currentIngredientInit = {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image_large: '',
    image: '',
    image_mobile: '',
    __v: 0,
  };

  const initialState = {
    isOpen: false,
    currentIngredient: { ...currentIngredientInit },
  };

  it('should have initial state', () => {
    expect(detailsReducer(undefined, {type: '', payload: {}})).toEqual(initialState)
  })

  it('should handle OPEN_MODAL', () => {
    const reducer = detailsReducer(initialState, {
      type: OPEN_MODAL,
      payload: {
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
    });

    expect(reducer).toEqual({
      isOpen: true,
      currentIngredient: {
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
    });
  });

  it('should handle CLOSE_MODAL', () => {
    const CLOSE_MODAL = 'CLOSE_MODAL'
    const reducer = detailsReducer({
      isOpen: true,
      currentIngredient: {
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
    }, {type: CLOSE_MODAL, payload: currentIngredientInit})

    expect(reducer).toEqual(initialState)
  })
});
