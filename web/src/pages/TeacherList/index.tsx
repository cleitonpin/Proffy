import React, { useState, FormEvent, useEffect } from 'react'

import './styles.css'

import PageHeader from '../../components/Pageheader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'



export default function TeacherList() {

    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
    }

    return (
        <div id="page-techer-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Biologia', label: 'Artes' },
                            { value: 'História', label: 'História' },
                        ]}
                    />

                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Quarta-feira' },
                            { value: '3', label: 'Quinta-feira' },
                            { value: '4', label: 'Sexta-feita' },
                            { value: '5', label: 'Sábado' },
                        ]}
                    />          
                    
                    <Input 
                        name="time" 
                        label="Hora" 
                        type="time"                         
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} />
                    )
                })}
                
            </main>

        </div>
    )
}