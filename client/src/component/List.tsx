import React from 'react';
import {
    Table,
    TableCell,
    TableRow,
    makeStyles,
    Paper,
    TableContainer,
    TableBody,
    TableHead,
    Button
} from '@material-ui/core';
import moment from 'moment';
import { FC } from 'react';

const useStyles = makeStyles(theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            [theme.breakpoints.down('sm')]: {
                width: 0
            },
            width: '0.3rem',
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': ' 0 0 3px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',

        },
    },
    container: {
        height: '50vh',

    },
    table: {
        width: '100%',

        height: '100%',
        backgroundColor: 'transparent'
    },
    cursor: {
        cursor: 'pointer',
        color: 'blue'
    }
}))

interface URL{
    full:string;
    short:string;
    clicks:number;
    createdAt:Date;
}

interface Props{
    urls:URL[];
    navigateTo:(url:string)=>void;
    deleteUrl:(url:string)=>void;
    editUrl:(url:string)=>void
}

const ListUrl:FC<Props> = ({ urls, navigateTo, deleteUrl, editUrl }) => {

    const classes = useStyles()

    return (
        <div className={classes.container}>

            <TableContainer component={Paper} className={classes.table}>
                <Table >
                    <TableHead>
                        <TableRow >
                            <TableCell align='center'><strong>תאריך</strong></TableCell>
                            <TableCell align='center'><strong>URL מקורי</strong></TableCell>
                            <TableCell align='center'><strong>URL מקוצר</strong></TableCell>
                            <TableCell align='center'><strong>clicks</strong></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urls.map((url:URL, i:number) => {
                            return <TableRow key={i}>
                                <TableCell align='center'>{moment(url.createdAt).format("MM/DD/YYYY")}</TableCell>
                                <TableCell align='center'>{url.full}</TableCell>
                                <TableCell align='center' className={classes.cursor} onClick={() => navigateTo(url.short)}>{url.short}</TableCell>
                                <TableCell align='center'>{url.clicks}</TableCell>
                                <TableCell align='center'>
                                    <Button onClick={() => deleteUrl(url.full)}>מחק</Button>
                                    <Button onClick={() => editUrl(url.full)}>ערוך</Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListUrl;