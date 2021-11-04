import React, { useState, useEffect } from "react";
import { ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography, Paper, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Person from '@material-ui/icons/Person'
import {list} from './api-user';
import { Link } from 'react-router-dom';
import ArrowForward from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    }),
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    }
  }))

export default function Users(){

    const classes = useStyles()
    const [users, setUsers]  = useState([])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
              console.log(data.error)
            } else {
              setUsers(data)
            }
          })
        return function cleanup(){
            abortController.abort()
        }
    }, [])

    return ( 
        <Paper className={classes.root} elavation={4}>
            <Typography variant="h6" className={classes.title}>Lista de Usuarios</Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link to={"/user/" + item._id} key={i}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name}/>
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ArrowForward/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })}
                
            </List>
        </Paper>
    )
}