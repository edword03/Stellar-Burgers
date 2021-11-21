export interface IFieldType<T> {
  [key: string]: T;
}

export interface IRegisterType {
  name: string;
  password: string;
  email: string;
}

export interface IOrderBody {
  ingredients: Array<string>;
}

export interface IOrderRequestBody {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface IGetIngredients {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IRequestIngredientsBody {
  success: boolean;
  data: Array<IGetIngredients>;
}

export interface IRegisterUser {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface IResetPass {
  success: boolean;
  message: string;
}

export interface IOrderType {
  ingredients: Array<string>;
  _id: string;
  status: 'done' | 'pending' | 'created';
  name: string
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IWSMessageBody {
  success?: boolean
  orders: Array<IOrderType>
  total: number
  totalToday: number
}

export interface IOrdersAll {
  success: boolean
  orders: Array<IOrderType>
  total: number
  totalToday: number
}