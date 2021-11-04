import React, {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-user.js'
import auth from './../auth/auth-helper';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'

export default function Profile({match}){

    const [user, SetUser] = useState({})
    const [redirectToSignin, setRedirectToSignin ] = setState(false);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal
        const jwt = auth.isAuthenticated();

        read({ 
            userId: match.params.userId
        }, {T: jwt.token})
    })
}