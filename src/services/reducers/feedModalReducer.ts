import { IOrderType } from '../../types';

export const OPEN_FEED_MODAL: 'OPEN_FEED_MODAL' = 'OPEN_FEED_MODAL';
export const CLOSE_FEED_MODAL: 'CLOSE_FEED_MODAL' = 'CLOSE_FEED_MODAL';

interface IFeedType {
  ingredients: Array<string>;
  _id?: string;
  status: 'done' | 'pending' | 'created' | '';
  name: string;
  number: number;
  createdAt: string;
  updatedAt?: string;
}

interface IOpenFeed {
  type: typeof OPEN_FEED_MODAL;
  payload: IFeedType;
}

interface ICloseFeed {
  type: typeof CLOSE_FEED_MODAL;
}

type TActionFeedModal = IOpenFeed | ICloseFeed;

interface IInitialState {
  currentFeed: IFeedType;
}

const initialOrder: IFeedType = {
  ingredients: [],
  status: '',
  name: '',
  number: 0,
  createdAt: '',
};

const initialState: IInitialState = {
  currentFeed: initialOrder
};

export const feedModalReducer = (state = initialState, action: TActionFeedModal): IInitialState => {
  switch (action.type) {
    case OPEN_FEED_MODAL:
      return { ...state, currentFeed: action.payload };
    case CLOSE_FEED_MODAL:
      return { ...state, currentFeed: initialOrder };
    default:
      return state;
  }
};
