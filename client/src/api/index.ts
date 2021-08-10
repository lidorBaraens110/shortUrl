import axios from 'axios';


const instance =axios.create({
    baseURL:'http://localhost:5000/api',
})


const getAllUrls= () => instance.get('/');
const addUrl= (newUrl:string) => instance.post('/',{ full: newUrl });
const getUrl = (url:string) => instance.get(`/${url}`)
const deleteUrl= (url:string) => instance.delete(`/${url}`)
const editUrl = (url:string)=> instance.put(`/${url}`)

const defaultObject = {
    getAllUrls, addUrl, getUrl, deleteUrl,editUrl
}
export default defaultObject;