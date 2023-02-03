import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const StyledCenter = styled.div`
    text-align: center;
    padding: 20px;
`;

export const StyledButton = styled(Button)`
    textDecoration:none;
    margin: 10px 
`;

export const useStyles = makeStyles({
    root: {
        minWidth: 200,
        margin: 5,
        textAlign: 'center'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
    },
    between: {
        justifyContent: 'space-between',
    }
});

