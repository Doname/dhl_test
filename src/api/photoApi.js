import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.API_URL + "/photos/";
const baseUrl = "https://jsonplaceholder.typicode.com/photos";

export function getPhotos() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function savePhoto(photo) {
  return fetch(baseUrl + (photo.id || ""), {
    method: photo.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(photo),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePhoto(photoId) {
  return fetch(baseUrl + photoId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
