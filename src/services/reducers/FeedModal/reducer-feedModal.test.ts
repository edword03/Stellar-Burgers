import { CLOSE_FEED_MODAL, feedModalReducer, IFeedType, OPEN_FEED_MODAL } from './feedModalReducer';

describe('feedModal reducer', () => {
  const initialOrder: IFeedType = {
    ingredients: [],
    status: '',
    name: '',
    number: 0,
    createdAt: '',
  };

  const initialState = {
    currentFeed: initialOrder,
  };

  it('should have initial state', () => {
    expect(feedModalReducer(undefined, { type: '', payload: null })).toEqual(initialState);
  });

  it('should handle OPEN_FEED_MODAL', () => {
    const reducer = feedModalReducer(initialState, {
      type: OPEN_FEED_MODAL,
      payload: {
        ingredients: ['dd2ff2', '224da', 'hh22fs'],
        _id: '12515',
        status: 'done',
        name: 'name',
        number: 2282,
        createdAt: '29/09/21',
        updatedAt: '29/09/21',
      },
    });

    expect(reducer).toEqual({
      currentFeed: {
        ingredients: ['dd2ff2', '224da', 'hh22fs'],
        _id: '12515',
        status: 'done',
        name: 'name',
        number: 2282,
        createdAt: '29/09/21',
        updatedAt: '29/09/21',
      },
    });
  });

  it('should handle CLOSE_FEED_MODAL', () => {
    expect(
      feedModalReducer(
        {
          currentFeed: {
            ingredients: ['dd2ff2', '224da', 'hh22fs'],
            _id: '12515',
            status: 'done',
            name: 'name',
            number: 2282,
            createdAt: '29/09/21',
            updatedAt: '29/09/21',
          },
        },
        { type: CLOSE_FEED_MODAL },
      ),
    ).toEqual(initialState);
  });
});
