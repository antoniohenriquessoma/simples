import React, {useState} from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import  auth  from './auth-helper'
import { signin } from './api-auth'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
      },
      error: {
        verticalAlign: 'middle'
      },
      title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
      },
      submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
      }, 
      cardcontent: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
      }
})) 

export default function Signin(props){

    const classes = useStyles();
    const [values, setValues] =useState({

        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const clickSubmit = () =>{

        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        signin(user).then((data) => {
            if(data.error){
                setValues({ ...values, error: data.error})
            }else{
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true}) 
                })               
            }
        })
    }

    const handleChange = name => event =>{
        setValues({ ...values, [name]: event.target.value })
    }

    const {from} = props.location.state || {
        from: {
            pathname: '/'
        }
    }

    const { redirectToReferrer } = values
    if(redirectToReferrer){
        return (<Redirect to={from}/>)
    }

    return( <div>
        <Card classeName={classes.card}>
            <CardContent className={classes.cardcontent}>
                <Typography variant="h6" classeName={classes.title}>
                    Cadastra-se
                </Typography>
                {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error">className={classes.error}error</Icon>
                        {values.error}
                    </Typography>)
                }
                <TextField id="email" label="Email" classeName={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/>
                <br/>
                <TextField id="password" label="Senha" classeName={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                <br/>
                
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" classeName={classes.submit} onClick={clickSubmit}>Entrar</Button>
            </CardActions>
        </Card>
    </div>)
}