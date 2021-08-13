import { createAction, props } from "@ngrx/store"


const namespace = '[GLOBAL]';

export const loadPhotos = createAction(
    `${namespace} load photos`,
)

export const loadPhotosSuccess = createAction(
    `${namespace} load photos success`,
    props<any>()
)

export const loadPhotosFailure = createAction(
    `${namespace} load photos failure`,
    props<any>()

)

export const loadPhotosCancel = createAction(
    `${namespace} load photos cancel`,
)

export const clearGlobalState = createAction(
    `${namespace} clear global state`,
)

export const deletePhoto = createAction(
    `${namespace} delete photo`,
    props<any>()
);
   
  