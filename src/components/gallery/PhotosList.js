import React from "react";
import PropTypes from "prop-types";

const PhotoList = ({ photos, favs, onSelectFavourite }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Thumbnail</th>
        <th>Select as fav</th>
      </tr>
    </thead>
    <tbody>
      {photos.map((photo) => {
        return (
          <tr key={photo.id}>
            <td>{photo.title}</td>
            <td>
              <img src={photo.thumbnailUrl} />
            </td>
            <td>
              <input
                checked={favs.includes(photo.id)}
                type="checkbox"
                key={photo.id}
                value={photo.id}
                onChange={onSelectFavourite}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

PhotoList.propTypes = {
  favs: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
  onSelectFavourite: PropTypes.func.isRequired,
};

export default PhotoList;
