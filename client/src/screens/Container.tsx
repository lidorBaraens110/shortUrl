import React, { useEffect, useState ,FC} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddUrl from '../component/AddUrl';
import List from '../component/List';
import api from '../api';
import Template from '../component/Template';
import { useHistory } from 'react-router-dom';
// import EditUrl from '../Modals/EditUrl';


interface TabPanell{
    children:React.ReactNode;
    value:number; 
    index:number; 
    className:string;
}

interface Urls{
    full:string;
    short:string;
    clicks:number;
    createdAt:Date;
}
const TabPanel:FC<TabPanell>=({ children, value, index, className, ...other }) =>{
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className={className} p={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index:number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'transparent',
        width: '80vw',
        margin: '3rem'
    },
    tab: {
        padding: '2rem 0'
    }
}));



const Container:FC=()=> {

    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [urls, setUrls] = useState<Urls[]|[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.getAllUrls()
                setUrls(data.shortUrls)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])

    const handleChange = (event:React.ChangeEvent<{}>, newValue:number) => setValue(newValue);

    const addToList = (url:Urls) => {
        setUrls((pre:Urls[]) => [...pre, url]);
    }

    const handleClickUrl = (url:string) => history.push(`/${url}`);

    const handleDelete = async (url:string) => {
        try {
            await api.deleteUrl(url)
            setUrls(pre => pre.filter(item => item.full !== url))
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async (url:string) => {
        try {
            const {data} = await api.editUrl(url);
            setUrls(pre => pre.map(item => {
                if (item.full === url) {
                    return { ...item, short: data.short }
                } return item
            }))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Template>
            <div className={classes.root}>
                <AppBar color='transparent' position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Url מקוצר" {...a11yProps(0)} />
                        <Tab label="דוחות" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel className={classes.tab} value={value} index={0}>
                    <AddUrl addToList={addToList} />
                </TabPanel>
                <TabPanel className={classes.tab} value={value} index={1}>
                 {urls!==[]&&
                    <List 
                    navigateTo={handleClickUrl} 
                    urls={urls} 
                    deleteUrl={handleDelete} 
                    editUrl={handleEdit} 
                    />
                 }
                    </TabPanel>
            </div>
        </Template>
    );
}

export default Container
