import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import pencil from '../../utils/images/pencil.png';

import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {StyledCenter, StyledButton, useStyles} from './noteStyles.js'

const CreateNote =()=> {
    const classes = useStyles();

    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const { title, content, date } = note;
                const newNote = {
                    title, content, date
                }

                await axios.post('/api/notes', newNote, {
                    headers: { Authorization: token }
                })

                return history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className={classes.center}>

            <form onSubmit={createNote} autoComplete="off">
                <Card className={classes.root} key={note._id}>
                    <h2>Create Note</h2>
                    <CardActionArea>
                        <StyledCenter><img src={pencil} height="100px"/></StyledCenter>

                        <CardContent>
                            <StyledCenter>
                                <Typography className={classes.root} variant="body2" component="h2">
                                    <h3>Date:</h3>
                                    <input type="date" id="date"
                                        name="date" onChange={onChangeInput} />
                                </Typography>

                                <Typography gutterBottom variant="body2" component="h2">
                                    <h3>Title:</h3>
                                    <input type="text" value={note.title} id="title"
                                        name="title" required onChange={onChangeInput} />
                                </Typography>

                                <Typography variant="body2" component="h2">
                                    <h3>Content:</h3>
                                    <textarea type="text" value={note.content} id="content"
                                        name="content" required rows="7" onChange={onChangeInput} />
                                </Typography>

                                <StyledButton variant="contained" size="small" color="primary" type="submit">Save</StyledButton>

                                <Link to="/">
                                    <Button variant="contained" size="small" color="secondary" >
                                        Cancel
                                    </Button>
                                </Link>

                            </StyledCenter>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </form>
        </div>
    )
}

export default CreateNote;