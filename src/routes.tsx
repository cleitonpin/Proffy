import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'
import TeacherForm from './pages/TeacheForm'

export default function Routes(){

    return (
        <BrowserRouter>

            
            <Route exact path="/" component={Landing}/>
            <Route exact path="/study" component={TeacherList}/>
            <Route exact path="/give-classes" component={TeacherForm}/>
            
        </BrowserRouter>
    )

}