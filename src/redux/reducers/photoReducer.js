import * as types from "../actions/actionTypes";
import initialState from "./initialState";
//import groupBy from "lodash";

export default function photoReducer(state = initialState.photos, action) {
  //if (action.type == types.SELECT_FAVOURITE) {
  //  if (state.favs.length > 0) {
  //    const favs = [...(state.favs || []), parseInt(action.photoId, 10)];
  //  } else {
  //    const a = action.photoId;
  //    const bla = parseInt(action.photoId, 10);
  //    const favss = [].concat([a]);
  //  }
  //  debugger;
  //} else if (action.type == types.UNSELECT_FAVOURITE) {
  //  const favs = state.favs.filter(
  //    (photo) => parseInt(photo.albumId, 10) == parseInt(action.albumId, 10)
  //  );
  //  debugger;
  //}

  switch (action.type) {
    //case types.CREATE_PHOTO_SUCCESS:
    //  return [...state, { ...action.photo }];

    case types.LOAD_PHOTOS_SUCCESS:
      return {
        ...state,
        albums: { ...groupBy(action.photos, "albumId"), ...{ Favourites: [] } },
        photosObj: convertArrayToObject(action.photos, "id"),
        //albumPhotos: action.photos.filter(
        //  (photo) => parseInt(photo.albumId, 10) == parseInt(state.sAlbumId, 10)
        //),
      };

    case types.FILTER_BY_ALBUM:
      return {
        ...state,
        sAlbumId: action.albumId,
        //albumPhotos: state.photos.filter(
        //  (photo) => parseInt(photo.albumId, 10) == parseInt(action.albumId, 10)
        //),
      };

    case types.UNSELECT_FAVOURITE:
      return {
        ...state,
        albums: {
          ...state.albums,
          Favourites: state.albums.Favourites.filter(
            (photo) => photo.id != action.photoId
          ),
        },
      };
    case types.SELECT_FAVOURITE:
      if (state.albums.Favourites.length > 0) {
        return {
          ...state,
          albums: {
            ...state.albums,
            Favourites: [
              ...state.albums.Favourites,
              state.photosObj[action.photoId],
            ],
          },
        };
      } else {
        return {
          ...state,
          albums: {
            ...state.albums,
            Favourites: [state.photosObj[action.photoId]],
          },
        };
      }
    case types.VIEW_FAVOURITES:
      return {
        ...state,
        sAlbumId: "Favourites",
      };
    default:
      return state;
  }
}

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};
