import {
  addFile,
  changeLoadingProgress,
  toggleVisible,
} from "../redux/uploader-reducer";

import axios from "axios";

const SERVER_HOST = "https://backend-praca-inz.herokuapp.com/";

const userInfoAuth =  { headers: { Authorization:  localStorage.getItem('tokenStore') }};

export const instanceAxios = axios.create({
  baseURL: `${SERVER_HOST}api/`,
});

export const fileAPI = {
  getFiles(dirId, sort) {
    if (dirId) {
      return instanceAxios
        .get(`/files?parent=${dirId}`, userInfoAuth)
        .then((data) => data.data);
    }
    if (sort) {
      return instanceAxios.get(`/files?sort=${sort}`, userInfoAuth).then((data) => data.data);
    }
    if (dirId && sort) {
      return instanceAxios
        .get(`/files?parent=${dirId}&sort=${sort}`, userInfoAuth)
        .then((data) => data.data);
    }
    return instanceAxios.get(`/files`, userInfoAuth).then((data) => data.data);
  },

  createDir(dirId, name) {
    return instanceAxios
      .post("/files/", {
        name,
        parent: dirId,
        type: "dir",
      }, userInfoAuth)
      .then((data) => data.data);
  },

  uploadFile(file, dirId, dispatch) {
    const formData = new FormData();
    formData.append("file", file);
    if (dirId) {
      formData.append("parent", dirId);
    }

    let uploadingFile = { name: file.name, progress: 0, id: Date.now() };
    dispatch(toggleVisible(true));
    dispatch(addFile(uploadingFile));

    return instanceAxios
      .post("/files/upload/", formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader("content-length") ||
              progressEvent.target.getResponseHeader(
                "x-decompressed-content-length"
              );
          if (totalLength) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            dispatch(
              changeLoadingProgress({ file: uploadingFile, progress: progress })
            );
          }
        },
        headers: { Authorization:  localStorage.getItem('tokenStore') }
      })
      .then((data) => data.data);
  },

  downloadFile(fileId) {
    const fileBlob = instanceAxios
      .get(`/files/download/?id=${fileId}`, {
        responseType: "blob",
      })
      .then((data) => data.data);
    return fileBlob;
  },

  deleteFile(fileId) {
    return instanceAxios
      .delete(`/files/?id=${fileId}`)
      .then((data) => data.data);
  },

  searchFile(searchString) {
    return instanceAxios
      .get(`/files/search?search=${searchString}`)
      .then((data) => data.data);
  },
};
