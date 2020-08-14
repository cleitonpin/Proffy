import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import { PageHeader } from '../../components/PageHeader'
import { TeacherItem, Teacher } from '../../components/TeacherItem'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

export default function TeacherList() {

    const [isFilterVisible, setIsFilterVisible] = useState(false)
    const [favorites, setFavorites] = useState<number[]>([])
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorite() {
        AsyncStorage.getItem('favorites').then(res => {
            if(res) {
                const favorited = JSON.parse(res)
                const favoritedTeacher = favorited.map((tacher: Teacher) => tacher.id)

                setFavorites(favoritedTeacher)
            }
        })
    }

    function handleToggleFilters(){
        setIsFilterVisible(!isFilterVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorite()
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setIsFilterVisible(false)
        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilters}>
                        <Feather name="filter" size={20} color="#fff"/>
                    </BorderlessButton>
                )}    
            >
            {isFilterVisible && (
                    <View style={styles.searchItem}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                        placeholderTextColor="#c1bccc"
                            style={styles.input}
                            placeholder="Qual a matéria"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    placeholder="Qual o dia"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Hórario</Text>
                                <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                placeholder="Qual hórario"
                                value={time}
                                onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >

            {teachers.map((teacher: Teacher) => {
                return (
                    <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)}/>
                )
            })}


            </ScrollView>
        </View>
    )
}