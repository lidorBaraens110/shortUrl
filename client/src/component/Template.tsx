import { 
    makeStyles, 
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';
import React,{FC,ReactNode} from 'react';



const useStyles = makeStyles(theme => ({
    container: {
        overflowY: 'hidden',
        textAlign: 'center',
    },
    title: {
        textAlign: 'right',
    },
    body: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    }
}))

interface Props{
    children:ReactNode
}

const Template:FC<Props>= ({ children }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
             <AppBar position="static">
            <Toolbar className={classes.title}>
                <Typography variant="h6" className={classes.title}>
                    קיצור url
                </Typography>
            </Toolbar>
        </AppBar> 
            <div className={classes.body}>
                {children}
            </div>
            <div>
            @lidorbaranes
        </div>
        </div>
    );
}

export default Template;