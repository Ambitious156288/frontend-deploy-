import React, { useState } from 'react';
import classes from './File.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, downloadFile, pushToFileStack, setCurrentDir } from "../../../../redux/file-reducer";
import { getCurrentDir, getModeFileView } from "../../../../redux/file-selector";
import Fade from 'react-reveal/Fade';

import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import anotherClasses from '../FileList.module.scss'

import {formatBytes} from './FormatBytes.js'

const File = (props) => {
  const dispatch = useDispatch()
  const { name, date, size, type } = props.file
  const currentDir = useSelector(getCurrentDir)
  const fileModeView = useSelector(getModeFileView)
  const [isErrorModal, setErrorModal] = useState(false)


  const openDirHandler = () => {
    if (props.file.type === 'dir') {
      dispatch(setCurrentDir(props.file._id))
      dispatch(pushToFileStack(currentDir))
    }
  }

  const downloadFileHandler = (event) => {
    event.stopPropagation()
    dispatch(downloadFile(props.file))
  }

  const deleteFileHandler = (event) => {
    event.stopPropagation()
    if (props.file.type === 'dir' && props.file.children.length !== 0) {
      setErrorModal(true)
      return
    }
    dispatch(deleteFile(props.file))
  }

  if (fileModeView === 'list') {
    return (
      <>
        <Fade top>
          <div className={classes.fileContainer} onClick={() => openDirHandler()}>
            <div className={classes.fileNumber}>
              {type === 'dir'
                ? <FolderIcon />
                : <InsertDriveFileIcon />}
            </div>
            <div className={classes.title}>{name}</div>
            <div className={classes.date}>{date.slice(0, 10)}</div>
            <div className={classes.size}>{formatBytes(size)}</div>
            <div className={classes.deleteFile}
              onClick={(event) => deleteFileHandler(event)}>
              <DeleteIcon />
            </div>
            {type !== 'dir'
              &&
              <div
                className={classes.downloadBtn}
                onClick={(event) => downloadFileHandler(event)}
              >
                <GetAppIcon />
              </div>
            }

          </div>
        </Fade>
      </>
    );
  }

  if (fileModeView === 'block') {
    return (
      <Fade bottom>
        <div className={classes.fileContainerBlock} onClick={() => openDirHandler()}>
          <div className={classes.fileIconBlock}>
            {type === 'dir'
              ? <FolderIcon />
              : <InsertDriveFileIcon />}</div>
          <div className={classes.fileInfoBlock}>
            <div className={classes.title}>{name}</div>
            <div className={classes.date}>{date.slice(0, 10)}</div>
            <div className={classes.size}>{formatBytes(size)}</div>
          </div>
          <div className={classes.fileActions}>
            <div className={classes.deleteFileBlock}
              onClick={(event) => deleteFileHandler(event)}>
              <DeleteIcon />
            </div>
            {type !== 'dir'
              &&
              <div
                className={classes.downloadBtnBlock}
                onClick={(event) => downloadFileHandler(event)}
              >
                <GetAppIcon />
              </div>
            }
          </div>
        </div>
      </Fade>
    )
  }
};

export default File;