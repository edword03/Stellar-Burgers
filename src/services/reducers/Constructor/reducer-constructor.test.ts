import { counstructorReducer } from './counstructorReducer';
import { ADD_BUN, ADD_ITEM, CLEAR_CONSTRUCTOR, MOVE_ITEM, REMOVE_ITEM } from '../../actions/constructorAction';

describe('constructor reducer', () => {
  const initialState = {
    ingredientsConstructor: [],
    bunItems: {
      price: 0,
      _id: '',
      isLocked: false,
      name: '',
      index: 0,
      type: '',
      image: '',
      image_large: '',
      image_mobile: '',
      __v: 0,
      itemId: '',
    },
    draggedItem: {},
  };

  const addItem = {
    _id: '123',
    name: 'Burger',
    type: 'bun',
    proteins: 155,
    fat: 55,
    carbohydrates: 35,
    calories: 190,
    price: 500,
    image: '/g',
    image_mobile: '/da/d',
    image_large: 'cdn/da',
    itemId: 'dad-2r-wa',
    __v: 0,
  };
  const addItem2 = {
    _id: '11111',
    name: 'Котлета',
    type: 'main',
    proteins: 190,
    fat: 100,
    carbohydrates: 55,
    calories: 300,
    price: 1500,
    image: '/cotlet',
    image_mobile: '/mobile/cotlet',
    image_large: '/large/cotlet',
    itemId: 'ct2-1f2-sd2',
    __v: 0,
  };

  const addBunItem = {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    itemId: 'c0438209-ab94-4271-898a-b961718a2be3',
  };

  it('should have initial state', () => {
    const action = { type: '', payload: null };
    const reducer = counstructorReducer(undefined, action);
    expect(reducer).toEqual(initialState);
  });

  it('should handle ADD_ITEM', () => {
    const reducer = counstructorReducer(initialState, { type: ADD_ITEM, payload: addItem });
    const reducer2 = counstructorReducer(
      {
        ingredientsConstructor: [addItem],
        bunItems: {
          price: 0,
          _id: '',
          isLocked: false,
          name: '',
          index: 0,
          type: '',
          image: '',
          image_large: '',
          image_mobile: '',
          __v: 0,
          itemId: '',
        },
        draggedItem: {},
      },
      { type: ADD_ITEM, payload: addItem2 },
    );

    expect(reducer).toEqual({
      ingredientsConstructor: [addItem],
      bunItems: {
        price: 0,
        _id: '',
        isLocked: false,
        name: '',
        index: 0,
        type: '',
        image: '',
        image_large: '',
        image_mobile: '',
        __v: 0,
        itemId: '',
      },
      draggedItem: {},
    });

    expect(reducer2).toEqual({
      ingredientsConstructor: [addItem, addItem2],
      bunItems: {
        price: 0,
        _id: '',
        isLocked: false,
        name: '',
        index: 0,
        type: '',
        image: '',
        image_large: '',
        image_mobile: '',
        __v: 0,
        itemId: '',
      },
      draggedItem: {},
    });
  });

  it('should handle ADD_BUN', () => {
    

    const reducer = counstructorReducer(initialState, {type: ADD_BUN, payload: addBunItem, isLocked: true}) 

    expect(reducer).toEqual({
      ingredientsConstructor: [],
      bunItems: {...addBunItem, isLocked: true},
      draggedItem: {},
    })
  });

  it('should handle REMOVE_ITEM', () => {
    const reducer = counstructorReducer({
      ingredientsConstructor: [addItem, addItem2],
      bunItems: {...addBunItem, isLocked: true, index: 0},
      draggedItem: {},
    }, {type: REMOVE_ITEM, payload: 'dad-2r-wa'})

    expect(reducer).toEqual({
      ingredientsConstructor: [addItem2],
      bunItems: {...addBunItem, isLocked: true, index: 0},
      draggedItem: {},
    })
  })

  it('should handle MOVE_ITEM', () => {
    const reducer = counstructorReducer({
      ingredientsConstructor: [addItem, addItem2],
      bunItems: {...addBunItem, isLocked: true, index: 0},
      draggedItem: {},
    }, {type: MOVE_ITEM, payload: [addItem2, addItem]}) 

    expect(reducer).toEqual({
      ingredientsConstructor: [addItem2, addItem],
      bunItems: {...addBunItem, isLocked: true, index: 0},
      draggedItem: {},
    })
  })

  it('should CLEAR_CONSTRUCTOR', () => {
    const reducer = counstructorReducer({
      ingredientsConstructor: [addItem2, addItem],
      bunItems: {...addBunItem, isLocked: true, index: 0},
      draggedItem: {},
    }, {type: CLEAR_CONSTRUCTOR})
    
    expect(reducer).toEqual(initialState)
  })

});