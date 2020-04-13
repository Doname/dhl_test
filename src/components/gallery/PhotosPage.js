import React from "react";
import { connect } from "react-redux";
import * as photoActions from "../../redux/actions/photoActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import PhotosList from "./PhotosList";
import Spinner from "../common/Spinner";
import GallerySelector from "./GallerySelector";

class PhotosPage extends React.Component {
  componentDidMount() {
    const { photos, actions } = this.props;

    if (Object.keys(photos.photosObj).length === 0) {
      actions.loadPhotos().catch((error) => {
        alert("Loading photos failed" + error);
      });
    }
    //debugger;
    //this.albums = groupBy(photos, "albumId") || [];
    //console.log("albumsalbumsalbumsalbumsalbums");
    //debugger;
    //console.log(this.albums);
  }

  handleFilterByAlbum = (albumId) => {
    this.props.actions.filterByAlbum(albumId);

    //this.props.actions.deletephoto(photo);
    //const filterphotos = this.props.photos.photos.filter((c) => {
    //  return c.albumid == albumidhttps://jsonplaceholder.typicode.com/photos;
    //});
    ////this.props.photos.photos = [...filterphotos];
    //this.setstate({ ...this.props.photos, photos: filterphotos });
  };

  handleSelectFavourite = (event) => {
    if (event.target.checked)
      this.props.actions.selectFavourite(event.target.value);
    else this.props.actions.unSelectFavourite(event.target.value);
  };

  handleViewFavourites = () => {
    this.props.actions.viewFavourites();
  };

  renderPhotoList = () => {
    const favs = this.props.photos.albums.Favourites.map(
      (favPhoto) => favPhoto.id
    );

    const photosToShow = this.props.photos.albums[this.props.photos.sAlbumId];
    if (photosToShow === undefined) {
      return "";
    } else
      return (
        <PhotosList
          photos={photosToShow}
          favs={favs}
          onSelectFavourite={this.handleSelectFavourite}
        />
      );
  };

  render() {
    return (
      <>
        <h2>Photos</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <GallerySelector
              onFilterByAlbum={this.handleFilterByAlbum}
              albums={Object.keys(this.props.photos.albums)}
            />
            {this.renderPhotoList()}
          </>
        )}
      </>
    );
  }
}

PhotosPage.propTypes = {
  photos: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    photos: state.photos,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadPhotos: bindActionCreators(photoActions.loadPhotos, dispatch),
      filterByAlbum: bindActionCreators(photoActions.filterByAlbum, dispatch),
      selectFavourite: bindActionCreators(
        photoActions.selectFavourite,
        dispatch
      ),
      unSelectFavourite: bindActionCreators(
        photoActions.unSelectFavourite,
        dispatch
      ),
      viewFavourites: bindActionCreators(photoActions.viewFavourites, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
