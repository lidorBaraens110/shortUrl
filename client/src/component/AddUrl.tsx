import React, { FC, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles(theme => ({
    container: {
        height: '50vh',
        display: 'flex',
        flexDirection: 'column'
    },
    error: {
        fontWeight: 'bold',
        color: 'red',
    },
    button: { 
        padding: '0.5rem',
         width: '5rem' 
        }
}))

interface Url{
    full:string;
    short:string;
    clicks:number;
    createdAt:Date;
}

interface Props{
    addToList:(url:Url)=>void
}


const AddUrl:FC<Props> = ({ addToList }) => {

    const classes = useStyles();
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [newUrl, setNewUrl] = useState<string>('')

    const handleChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        setUrl(value);
    }

    const addNewUrl = async (e:React.FormEvent<HTMLFormElement>) => {   
        e.preventDefault();
 
        try{
            const { data } = await api.addUrl(url);
            if(data.newUrl){
                setErrorMessage('')
                setNewUrl(data.newUrl.full);
                addToList(data.newUrl);
                alert('new url added');
            }else{
                setNewUrl('');
                setErrorMessage(data.message)
            }
           
        }catch(err){
            console.log(err)
        }    
    }

    return (
        <div className={classes.container}>
            <form onSubmit={addNewUrl}>
            <TextField
                required
                variant='outlined'
                label='url'
                size='small'
                type='text'
                value={url}
                onChange={handleChange}
            />
            <Button
                className={classes.button}
                variant='contained'
                type='submit'
            >
                קצר
            </Button>
            </form>
            {errorMessage &&
                <Typography className={classes.error}>
                    {errorMessage}
                </Typography>
            }
            <Typography>{newUrl}</Typography>
        </div>
    );
}

export default AddUrl;