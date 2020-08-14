import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'

import styles from './styles'
import { PageHeader } from '../../components/PageHeader'
import {TeacherItem, Teacher} from '../../components/TeacherItem'
import AsyncStorage from '@react-native-community/async-storage'

export default function TeacherList() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        loadFavorite()
    }, [])

    function loadFavorite() {
        AsyncStorage.getItem('favorites').then(res => {
            if(res) {
                const favorited = JSON.parse(res)

                setFavorites(favorited)
            }
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}


            </ScrollView>
        </View>
    )
}