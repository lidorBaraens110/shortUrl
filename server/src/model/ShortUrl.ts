// import pkg from 'mongoose';
import {generate} from 'shortid';
import { Schema, model, connect } from 'mongoose';



// const { Schema, model } = pkg;
interface Url {
    full: string;
    short: string;
    clicks: number;

  }


const shortUrlSchema = new Schema<Url>({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true
    })

export default model('ShortUrl', shortUrlSchema)
