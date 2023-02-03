import React from 'react';
import classes from './FileUploader.module.scss'
import UploadingFile from "./UploadingFile";
import { toggleVisible } from "../../../redux/uploader-reducer";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, getIsVisible } from "../../../redux/uploader-selector";

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Message from './Message'

const UploaderContainer = () => {
  const dispatch = useDispatch()
  const isVisible = useSelector(getIsVisible)
  const files = useSelector(getFiles)

  const fileBlock = files.map((file) => {
    return <UploadingFile file={file} key={file.id} />
  })

  return (isVisible &&
      <Message>
          <div>
            <p>sending files: </p>
          </div>
          <div className={classes.fileList}>
            {fileBlock}
          </div>
      </Message>
  );
};

export default UploaderContainer;

