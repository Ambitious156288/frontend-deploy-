import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import pencil from '../../utils/images/pencil.png';

import {StyledCenter, StyledButton, useStyles} from './noteStyles.js'

const Home = ()=> {
    const classes = useStyles();

    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) => {
        const res = await axios.get('api/notes', {
            headers: { Authorization: token }
        })
        setNotes(res.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if (token) {
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) => {
        try {
            if (token) {
                await axios.delete(`api/notes/${id}`, {
                    headers: { Authorization: token }
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <Grid container spacing={3} className={classes.center}>
            {
                notes.map(note => (
                    <Card className={classes.root} key={note._id}>
                        <CardActionArea>
                            <Typography className={classes.root} variant="body2" color="textSecondary" component="p">
                                <p className="date">{format(note.date)}</p>
                            </Typography>

                            <StyledCenter><img src={pencil} height="100px"/></StyledCenter>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {note.title}
                                </Typography>

                                <Typography variant="body2" color="textSecondary" component="p">
                                    {note.content}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.between}>
                            <StyledButton size="small" variant="contained" >
                                <Link to={`edit/${note._id}`} >Edit</Link>
                            </StyledButton>

                            <Button size="small" variant="contained" color="secondary" onClick={() => deleteNote(note._id)}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))
            }

        </Grid>
    )
}

export default Home;
