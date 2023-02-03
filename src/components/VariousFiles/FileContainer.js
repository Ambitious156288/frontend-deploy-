import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileList from './FileList/FileList';
import CreateDirModal from './CreateDirModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDir, getFileStack, getModeFileView } from '../../redux/file-selector';
import {
  loadFiles,
  popFromFileStack,
  setCurrentDir,
  setFileViewMode,
  uploadFile,
} from '../../redux/file-reducer';
import UploaderContainer from './FileUploader/UploaderContainer';

import ListIcon from '@material-ui/icons/List';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const Container = styled.div`
  max-width: 900px;
  height: 100vh;
  margin: 40px auto;
`;

const Button = styled.button`
  background: black;
  padding: 15px;
  color: white;
  border-radius: 15px;
  outline: none;
  cursor: pointer;
  border: none;
  margin-right: 15px;

  &:hover {
    background: #292828;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  padding: 5px 10px;
  margin-top: 20px;
  border: 2px dashed black;
  cursor: pointer;
`;

const DropArea = styled.div`
  width: 90%;
  font-size: 50px;
  height: calc(100vh - 100px);
  margin: 20px auto 0 auto;
  border: 3px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FileViewModeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 75px;
  font-size: 30px;
  justify-content: space-between;
  transition: all 0.5s ease;

  i {
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
  }

  i:nth-child(1) {
    background-color: ${props => props.fileModeView === 'list' && 'darkgray'};
  }

  i:nth-child(2) {
    background-color: ${props => props.fileModeView === 'block' && 'darkgray'};
  }

  i:hover {
    background-color: darkgray;
  }
`;

const FileContainer = () => {
  const dispatch = useDispatch();

  const [openCreateDirModal, setOpenCreateDirModal] = useState(false);
  const [onDragEnter, setOnDragEnter] = useState(false);
  const currentFileDir = useSelector(getCurrentDir);
  let fileStack = useSelector(getFileStack);
  const fileModeView = useSelector(getModeFileView);

  useEffect(() => {
    dispatch(loadFiles(currentFileDir));
  }, [currentFileDir]);

  const backClickHandler = () => {
    const backId = fileStack[fileStack.length - 1];
    dispatch(setCurrentDir(backId));
    dispatch(popFromFileStack());
  };

  const fileHandler = event => {
    const files = [...event.target.files];

    files.forEach(file => {
      dispatch(uploadFile(file, currentFileDir));
    });
  };

  const dragEnterHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    setOnDragEnter(true);
  };

  const dragLeaveHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    setOnDragEnter(false);
  };

  const onDropHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    files.forEach(file => {
      dispatch(uploadFile(file, currentFileDir));
    });
    setOnDragEnter(false);
  };

  return (
    <>
      {!onDragEnter ? (
        <Container
          onDragLeave={dragLeaveHandler}
          onDragOver={dragEnterHandler}
          onDragEnter={dragEnterHandler}
        >
          <Button onClick={backClickHandler}>go back</Button>
          <Button onClick={() => setOpenCreateDirModal(!openCreateDirModal)}>Create folder</Button>
          <div>
            <FileLabel htmlFor={'file__input'}>Upload file</FileLabel>
            <FileInput type={'file'} id="file__input" onChange={event => fileHandler(event)} />
          </div>

          <FileViewModeContainer fileModeView={fileModeView}>
            <ListIcon onClick={() => dispatch(setFileViewMode('list'))} />
            <ViewModuleIcon onClick={() => dispatch(setFileViewMode('block'))} />
          </FileViewModeContainer>

          <FileList />

          {openCreateDirModal && (
            <CreateDirModal setIsOpenModal={setOpenCreateDirModal} isOpen={openCreateDirModal} />
          )}
        </Container>
      ) : (
        <DropArea
          onDrop={onDropHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragEnterHandler}
          onDragEnter={dragEnterHandler}
        >
          Drag files there
        </DropArea>
      )}
      <UploaderContainer />
    </>
  );
};

export default FileContainer;
