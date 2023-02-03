import React, { useState, useEffect } from 'react'
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

const EditNote =({ match })=> {
    const classes = useStyles();
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    })
    const history = useHistory()

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore')
            if (match.params.id) {
                const res = await axios.get(`/api/notes/${match.params.id}`, {
                    headers: { Authorization: token }
                })
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                })
            }
        }
        getNote()
    }, [match.params.id])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    }


    const editNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const { title, content, date, id } = note;
                const newNote = {
                    title, content, date
                }

                await axios.put(`/api/notes/${id}`, newNote, {
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
            <form onSubmit={editNote} autoComplete="off">
                <Card className={classes.root} key={note._id}>
                    <h2>Edit Note</h2>
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


export default EditNote;