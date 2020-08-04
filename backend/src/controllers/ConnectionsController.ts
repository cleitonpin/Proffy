import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/ConvertAllToMinutes';


interface SchaduleItem {
    week_day: number,
    from: string,
    to: string,
}

export default class ConnectionControllers {

    async index(req: Request, res: Response){

    }

    async create(req: Request, res: Response){
        const { user_id } = req.body

        await db('connections').insert({
            user_id
        })

        return res.status(201).send()
    }

}