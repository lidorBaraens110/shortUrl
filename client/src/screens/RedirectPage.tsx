import { useEffect,FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../api';

const ShortUrl:FC = () => {

    const {id} = useParams<{id:string}>();
    const history = useHistory();

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const { data } = await api.getUrl(id)
                window.location.href = `http://${data}`;
            } catch (err) {
                console.log(err)
                if (err.request.status === 404) {
                    history.push('/Page404')
                }
            }
        }
        fetchUrl()
    }, [id])

    return null
}
export default ShortUrl;