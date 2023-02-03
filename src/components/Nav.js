import React from 'react';
import Home from './Notes/Home';
import CreateNote from './Notes/CreateNote';
import EditNote from './Notes/EditNote';
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import FileContainer from 'components/VariousFiles/FileContainer';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GetMetadata from './Metadata/GetMetadata';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ModalSettings from 'components/Settings/ModalSettings'

import PhotoGallery from "components/PhotoGallery/PhotoGallery";

const StyledCenter = styled.div`
    text-align: center;
    padding: 20px;
`;

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Nav({ setIsLogin }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const [noteVariable, setNoteVariable] = React.useState(true);
  const noteSettings = () => {
    setNoteVariable(!noteVariable);
  };

  const [photoVariable, setPhotoVariable] = React.useState(true);
  const photoSettings = () => {
    setPhotoVariable(!photoVariable);
  };

  const [filesVariable, setFilesVariable] = React.useState(true);
  const filesSettings = () => {
    setFilesVariable(!filesVariable);
  };

  const [metadataVariable, setMetadataVariable] = React.useState(true);
  const metadataSettings = () => {
    setMetadataVariable(!metadataVariable);
  };

  return (
    <>
      <StyledOptions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon />}
          onClick={logoutSubmit}
        >
          Log Out
        </Button>

        <ModalSettings
          noteVariable={noteVariable}
          noteSettings={noteSettings}
          photoVariable={photoVariable}
          photoSettings={photoSettings}
          filesVariable={filesVariable}
          filesSettings={filesSettings}
          metadataVariable={metadataVariable}
          metadataSettings={metadataSettings}
        />
      </StyledOptions>

      <br />

      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab style={{ display: noteVariable ? 'flex' : 'none' }} label="Notes" href="/notes" {...a11yProps(0)} />
            <LinkTab style={{ display: photoVariable ? 'flex' : 'none' }} label="Photo gallery" href="/photos" {...a11yProps(1)} />
            <LinkTab style={{ display: filesVariable ? 'flex' : 'none' }} label="Various files" href="/files" {...a11yProps(2)} />
            <LinkTab style={{ display: metadataVariable ? 'flex' : 'none' }} label="Get metadata" href="/files" {...a11yProps(3)} />
          </Tabs>
        </AppBar>



        <TabPanel style={{ display: noteVariable ? 'block' : 'none' }} value={value} index={0}>
          <BrowserRouter>
            <StyledCenter>
              <Button variant="outlined" color="primary">
                <Link to="/create">Create Note</Link>
              </Button>
            </StyledCenter>

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create" component={CreateNote} />
              <Route path="/edit/:id" component={EditNote} />
            </Switch>
          </BrowserRouter>
        </TabPanel>

        <TabPanel style={{ display: photoVariable ? 'block' : 'none' }} value={value} index={1}>
            <PhotoGallery/>
        </TabPanel>

        <TabPanel style={{ display: filesVariable ? 'block' : 'none' }} value={value} index={2}>
          <FileContainer />
        </TabPanel>

        <TabPanel style={{ display: metadataVariable ? 'block' : 'none' }} value={value} index={3}>
          <GetMetadata />
        </TabPanel>

      </div>
    </>
  );
}
