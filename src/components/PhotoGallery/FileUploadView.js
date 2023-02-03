import React, {useState, useEffect} from 'react';
import {singleFileUpload, multipleFilesUpload} from '../../api/api';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const FileUploadView = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [multipleFiles, setMultipleFiles] = useState('');
    const [title, setTitle] =  useState('');
    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }
    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
        
    }
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        },
        headers: { Authorization:  localStorage.getItem('tokenStore') }
    }
    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        },
        headers: { Authorization:  localStorage.getItem('tokenStore') }
    }
    const uploadSingleFile = async () => {
        const token = localStorage.getItem('tokenStore')
        // if (token) {
            const formData = new FormData();
            formData.append('file', singleFile);
            await singleFileUpload(formData, singleFileOptions);
            props.getsingle();
        // }
    }

    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        formData.append('title', title);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);                      
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }
    
    return (
        <Grid container spacing={3}>

            <Grid item xs={6}>
                <label>Select Single File</label>
                <br/>
                <br/>
                <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" type="file" onChange={(e) => SingleFileChange(e)} />
                <label htmlFor="raised-button-file">
                    <Button variant="contained" component="span" color="primary">
                        Choose File
                    </Button>
                </label> 
                <br/>
                <br/>
                <Button variant="contained" type="button" onClick={() => uploadSingleFile()} >Upload</Button>
                <br/>
                <br/>
                <div style={{ width: 100, height: 100 }}>
                                <CircularProgressbar
                                    value={singleProgress}
                                    text={`${singleProgress}%`}
                                    styles={buildStyles({
                                        rotation: 0.25,
                                        strokeLinecap: 'butt',
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                        textColor: '#f88',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7',
                                    })}
                                 />
                </div>
            </Grid>

            <Grid item xs={6}>
                            <label>Select Multiple Files</label>
                            <br/>
                            <br/>
                            <TextField label="enter title for your gallery" variant="outlined" type="text" onChange={(e) => setTitle(e.target.value) } />
                            <br/>
                            <br/>
                            <input accept="image/*" type="file" id="raised-button-files" style={{ display: 'none' }} onChange={(e) => MultipleFileChange(e)} multiple/>
                            <label htmlFor="raised-button-files">
                                <Button variant="contained" component="span" color="primary">
                                    Choose Files
                                </Button>
                            </label>  
                            <br/>
                            <br/>
                            <Button variant="contained" type="button" onClick={() => UploadMultipleFiles()}>Upload</Button>
                            <br/>
                            <br/>
                            <div style={{ width: 100, height: 100 }}>
                                <CircularProgressbar
                                    value={multipleProgress}
                                    text={`${multipleProgress}%`}
                                    styles={buildStyles({
                                        rotation: 0.25,
                                        strokeLinecap: 'butt',
                                        textSize: '16px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                        textColor: '#f88',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7',
                                    })}
                                />
                            </div>
                </Grid>
        </Grid>
    );
}

export default FileUploadView;