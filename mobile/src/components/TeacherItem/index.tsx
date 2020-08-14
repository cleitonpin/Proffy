import React, { useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'

import heart from '../../assets/images/icons/heart-outline.png'
import favourite from '../../assets/images/icons/unfavorite.png'
import whats from '../../assets/images/icons/whatsapp.png'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: Number,
    name: string,
    subject: string,
    whatsapp: string

}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}

export const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorite, setIsFavorite] = useState(favorited)

    function hanldleinkWatHSAPP() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray = []

        if(favorites) {
            favoritesArray = JSON.parse(favorites)

        }
        if (isFavorite) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorite(false)    
        } else {
            favoritesArray.push(teacher)
            setIsFavorite(true)    
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileIcon}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>
                        R$ {teacher.cost}
                    </Text>
                </Text>

                <View style={styles.buttonsContaier}>
                    <RectButton onPress={handleToggleFavorite} style={[styles.favoriteButon, isFavorite ? styles.favorited : {}]}>
                        {isFavorite ? <Image source={favourite}/> :  <Image source={heart}/>}
                        
                        
                    </RectButton>
                    <RectButton onPress={hanldleinkWatHSAPP} style={styles.contactButon}>
                        <Image source={whats}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>

        </View> 
    )
}