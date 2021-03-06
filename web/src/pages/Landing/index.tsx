import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import Logo from '../../assets/images/logo.svg'
import LandingIMG from '../../assets/images/landing.svg'
import StudyICON from '../../assets/images/icons/study.svg'
import giveClasse from '../../assets/images/icons/give-classes.svg'
import purpleHeart from '../../assets/images/icons/purple-heart.svg'

import './styles.css'
import api from '../../services/api'

export default function Landing(){

    const [totalConection, setTotalConnections] = useState(0)
    
    useEffect(() => {
        api.get('/connections')
        .then(res => {
            const total = res.data.total

            setTotalConnections(total)
        })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={Logo} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={LandingIMG} alt="" className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyICON} alt=""/>
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClasse} alt=""/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConection} conexões ralizadas
                    <img src={purpleHeart} alt="Coraçãoroxo"/>
                </span>
            </div>
        </div>
    )
}