
import { createReducer, on } from "@ngrx/store"
import { clearGlobalState, loadPhotosSuccess, deletePhoto } from "./actions";

export interface PhotoState {
    photos: { message: string, photos: any, count: number }
}
   
const initialState: PhotoState = {
    photos: null
}
export const globalReducer = createReducer(
    initialState,
    on(loadPhotosSuccess, (state, { photos }) => ({...state, photos })),
    on(deletePhoto, (state, { id }) => {
        console.log('state Before: ', state);
        console.log(state.photos.photos = state.photos.photos.filter(photo => photo._id !== id));
        console.log('state After: ', state);
        console.log('test');
        return {...state}
    }),
    // if we call it on destroy method 
    on(clearGlobalState, () => initialState),
);