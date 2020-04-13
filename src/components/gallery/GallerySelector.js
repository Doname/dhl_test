import React from "react";

const GallerySelector = ({ albums, onFilterByAlbum }) =>
  albums.map((album) => {
    return (
      <button key={album} onClick={() => onFilterByAlbum(album)}>
        {album}
      </button>
    );
  });

export default GallerySelector;
