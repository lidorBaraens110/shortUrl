import { Router } from 'express';
import { getAllUrls, addUrl, editUrl, deleteUrl, getUrl } from '../controller/ShortUrl';

const router = Router();

router.get('/', getAllUrls)
router.get('/:url', getUrl);
router.post('/', addUrl)
router.put('/:url', editUrl)
router.delete('/:url', deleteUrl)

export default router;
