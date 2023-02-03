import React, {useState, useEffect} from 'react';
import './PhotoGallery.css';
import FileUploadView from './FileUploadView';
import {getSingleFiles, getMultipleFiles} from '../../api/api';
import axios from 'axios'

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { ImageGroup, Image } from 'react-fullscreen-image';

const StyledTitle = styled.h4`
    color:red;
    text-decoration: underline;
`;

const StyledMainTitle= styled.h3`
    color:green;
    text-decoration: italic;
`;

const StyledImg = styled.img`
    margin: 10px;
    border: 1px solid black;

    ${({ theme }) => theme.mq.bigTablet} {
      height: 85px;
    }

    ${({ theme }) => theme.mq.smallTablet} {
      height: 60px;
    }
`;

function PhotoGallery() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [token, setToken] = useState('')

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles({headers: { Authorization:  localStorage.getItem('tokenStore') }});
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  
  const getMultipleFilesList = async () => {
    try {
        const fileslist = await getMultipleFiles({headers: { Authorization:  localStorage.getItem('tokenStore') }});
        setMultipleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }

  const BACKEND_API = 'https://backend-praca-inz.herokuapp.com/'

const handleDeleteImage = async (id)=>{
    await axios.delete(`${BACKEND_API}api/single/` + id)
    setSingleFiles(prev=>prev.filter(file=>file._id !== id))
}

const handleDeleteGallery = async (galleryId)=>{
    await axios.delete(`${BACKEND_API}api/gallery/` + galleryId)
    setMultipleFiles(prev=>prev.filter(gallery=>gallery._id !== galleryId))
}



useEffect(() => {
  getSingleFileslist();
  getMultipleFilesList();
}, []);

  return (
    <>
       <Grid container spacing={3}>
                <FileUploadView getsingle={getSingleFileslist} getMultiple={getMultipleFilesList}/>

                <Grid item xs={6}>
                        <hr/>
                        <StyledMainTitle>Single Files Gallery:</StyledMainTitle>
                        <Box display="flex" flexWrap="wrap">
                                    {singleFiles.map((file) => 
                                                  <div className="container">
                                                          <ImageGroup >
                                                              <ul className="images">
                                                                <li key={`${BACKEND_API}${file.filePath}`}>
                                                                  <Image 
                                                                    src={`${BACKEND_API}${file.filePath}`}
                                                                    alt="nature"
                                                                  />
                                                                <Button size="small" variant="contained" color="secondary" onClick={() => handleDeleteImage(file._id)}>Delete</Button>
                                                                </li>
                                                              </ul>
                                                          </ImageGroup>
                                                  </div>
                                    )}
                        </Box>
                </Grid>

                <Grid item xs={6}>
                    <hr/>
                    <StyledMainTitle>Multiple Files Gallery:</StyledMainTitle>
                    <Box display="flex" flexWrap="wrap">
                        {multipleFiles.map((element, index) =>
                            <div key={element._id}>
                                <StyledTitle>{element.title}</StyledTitle>
                                {element.files.map((file, index) =>
                                                <div className="container">
                                                          <ImageGroup >
                                                              <ul className="images">
                                                                <li key={`${BACKEND_API}${file.filePath}`}>
                                                                  <Image 
                                                                    src={`${BACKEND_API}${file.filePath}`}
                                                                    alt="nature"
                                                                  />
                                                                </li>
                                                              </ul>
                                                          </ImageGroup>
                                                </div>
                                )}
                            <Button size="small" variant="contained" color="secondary" onClick={() => handleDeleteGallery(element._id)}>Delete gallery</Button>
                            </div>
                        )}
                    </Box>
                </Grid>
       </Grid>
    </>
  );
}

export default PhotoGallery;
