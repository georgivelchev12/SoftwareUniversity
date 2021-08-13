import { createSelector } from "@ngrx/store";
import { IState } from ".";


export const selectGlobal = (state: IState) => state.global;
 
export const selectGlobalPhotos = createSelector(
  selectGlobal,
  (state: any) => state.photos
);
