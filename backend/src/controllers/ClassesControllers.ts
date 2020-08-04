import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/ConvertAllToMinutes';


interface SchaduleItem {
    week_day: number,
    from: string,
    to: string,
}

export default class ClassesControllers {

    async index(req: Request, res: Response) {
        const filters = req.query

        const subject = filters.subject as string
        const time = filters.time as string
        const week_day = filters.week_day as string

        if(!filters.subject || !filters.week_day || !filters.time) {
            return  res.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('classe_schedule.*')
                .from('classe_schedule')
                .whereRaw('`classe_schedule`.`classe_id` = `classes`.`id`')
                .whereRaw('`classe_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`classe_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`classe_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        return res.json(classes)
    }

    async create(req: Request, res: Response) {

        const { 
            name, 
            avatar, 
            whatsapp, 
            bio, 
            subject, 
            cost, 
            schedule 
        } = req.body
    
        const trx = await db.transaction()
    
        try {
            const isertedUsersId = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            })
        
            const user_id = isertedUsersId[0];
        
            const isertedClassesIds= await trx('classes').insert({
                subject,
                cost,
                user_id
            })
        
            const classe_id = isertedClassesIds[0];
        
            const classSchedule = schedule.map((schaduleItem: SchaduleItem) => {
                
                return {
                    classe_id,
                    week_day: schaduleItem.week_day,
                    from: convertHourToMinutes(schaduleItem.from),
                    to: convertHourToMinutes(schaduleItem.to),  
                }
            })
        
            await trx('classe_schedule').insert(classSchedule)
            await trx.commit()
        
        
        
            return res.status(201).send()
        } catch(err) {
            await trx.rollback()
    
            return res.status(400).json({ 
                error: 'Unexpected error while creating new class'
            })
        }
    }
}