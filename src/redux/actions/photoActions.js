import * as types from "./actionTypes";
import * as photoApi from "../../api/photoApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadPhotoSuccess(photos) {
  return { type: types.LOAD_PHOTOS_SUCCESS, photos };
}

export function loadPhotos() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return photoApi
      .getPhotos()
      .then((photos) => {
        dispatch(loadPhotoSuccess(photos));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function filterByAlbum(albumId) {
  return { type: types.FILTER_BY_ALBUM, albumId };
}

export function selectFavourite(photoId) {
  return { type: types.SELECT_FAVOURITE, photoId };
}
export function unSelectFavourite(photoId) {
  return { type: types.UNSELECT_FAVOURITE, photoId };
}

export function viewFavourites() {
  return { type: types.VIEW_FAVOURITES };
}
