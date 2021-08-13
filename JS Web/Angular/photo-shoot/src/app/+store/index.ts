import { ActionReducerMap } from "@ngrx/store";
import { globalReducer } from "./reducers";

export interface IState{
    readonly global,
}

export const reducers: ActionReducerMap<IState> = {
    global: globalReducer
}