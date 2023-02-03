import React, {useState, useEffect} from 'react';
import classes from './FileList.module.scss'
import File from "./File/File";
import { useSelector } from "react-redux";
import { getFiles, getModeFileView } from "../../../redux/file-selector";
import styled from "styled-components";
import Button from '@material-ui/core/Button';


const NoFilesLabel = styled.div`
  font-size: 40px;
  text-decoration: wavy;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  text-align: center;
`


const FileList = () => {
  const files = useSelector(getFiles)
  const fileModeView = useSelector(getModeFileView)

  const filesBlock = files.map((file) => {
    return (
      <File key={file._id} file={file} />
    )
  })

  return (
      <div className={fileModeView === 'block' ? classes.fileBlock : ''}>
        {files.length > 0
          ? filesBlock
          : <NoFilesLabel>No files</NoFilesLabel>
        }
      </div>
  );
};

export default FileList;

