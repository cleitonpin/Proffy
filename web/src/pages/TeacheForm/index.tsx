import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/Pageheader'

import './styles.css'
import warningIcon from '../../assets/images/icons/warning.svg'

import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'


export default function TeacherForm() {

    const history = useHistory()
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')
    
    

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to:"" }
    ])
    

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to:"" }
        ]);
    }

    function handleCreateClasse(e: FormEvent) {
        e.preventDefault()

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,

        }).then(() => {
            alert('sucecs')
            history.push('/')
        }).catch(err => {
            alert('err')
        })
    }

    function setScheduleItemValue(indice: number, field: string, value: string) {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if(index === indice){
                return {
                    ...scheduleItem, 
                    [field]: value
                }
            }

            return scheduleItem
        })

        setScheduleItems(newArray)
    }

    return (
        <div id="page-techer-form" className="container">
            <PageHeader 
            title="Que íncrivel que você quer dar aulas." 
            description="O primeiro passo é preencher esse formulario de inscrição" />

            <main>
                <form onSubmit={handleCreateClasse}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)} 
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)} 
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={e => setBio(e.target.value)} 
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

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
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />

                    </fieldset>
                    <fieldset>
                        <legend>Horários disponiveis <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button></legend>
                        
                        {scheduleItems.map((scheduleItem, indice) => {
                            return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="subject" 
                                    label="Dia da semana"
                                    value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemValue(indice, 'week_day', e.target.value)}
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
                                    name="from" 
                                    label="Das" 
                                    type="time"
                                    value={scheduleItem.from}
                                    onChange={e => setScheduleItemValue(indice, 'from', e.target.value)}
                                />
                                <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={e => setScheduleItemValue(indice, 'to', e.target.value)}
                                />
                            
                            </div>
                            )
                        })}
                    </fieldset>

                    

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}