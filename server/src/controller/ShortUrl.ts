import ShortUrl from '../model/ShortUrl';
import {Request,Response} from 'express'
import {generate} from 'shortid';
import {Validator} from "validator.ts/Validator";

const getAllUrls = async (req:Request, res:Response) => {
    const shortUrls = await ShortUrl.find();
    res.json({ shortUrls: shortUrls })
}
const addUrl = async (req:Request, res:Response) => {
    let validator=new Validator
    const paramUrl=req.body.full;
    if (validator.isURL(paramUrl,{require_tld: true})){
        const newUrl = await ShortUrl.create({ full: req.body.full })
        res.json({ message: 'new Short url added', newUrl })
    }else {
        res.json({message:'url is not valid'})
    }
}
const editUrl = async (req:Request, res:Response) => {
    const {url} = req.params
    try{
    const editedUrl = await ShortUrl.findOneAndUpdate({ full: url },{short:generate()},{new:true});
    res.json(editedUrl)
    }catch(err){
        res.json({message:'something go wrong '+err})
    }
}
const deleteUrl = async (req:Request, res:Response) => {
    const { url } = req.params
    try {
        await ShortUrl.findOneAndDelete({ full: url });
        res.json('removed success')
    }
    catch (err) {
        res.json('something go wrong ' + err)
    }

}
const getUrl = async (req:Request, res:Response) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.url })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save();

    res.json(shortUrl.full)

}

export {
    getAllUrls, addUrl, editUrl, deleteUrl, getUrl
}