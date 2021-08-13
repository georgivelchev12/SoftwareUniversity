import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, takeUntil } from "rxjs/operators";
import { PhotoService } from "../core/services/photo.service";
import { loadPhotos, loadPhotosCancel, loadPhotosFailure, loadPhotosSuccess } from "./actions";

@Injectable()
export class GlobalEffects {

    loadPhotos = createEffect(() => this.actions$.pipe(
        ofType(loadPhotos),
        switchMap(
            () => this.photoService.getPhotos('', '', 8, 0).pipe(
                takeUntil(this.actions$.pipe(ofType(loadPhotosCancel))),
                map((photos) => loadPhotosSuccess({ photos })),
                catchError(error => [loadPhotosFailure({ error })])
            )
        )
    ))
    constructor(private actions$: Actions, private photoService: PhotoService) {}
}