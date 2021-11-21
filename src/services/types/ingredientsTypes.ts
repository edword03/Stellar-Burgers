import { IRequestIngredientsBody } from "../../types";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions/ingredientsActions";


export interface IGetIngredientsRequestType {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IRequestIngredientsBody;
}

export interface IGetIngredientsFailedType {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type IIngredientsActions =
  | IGetIngredientsRequestType
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedType;