import React from 'react'
import Dashboard from '../components/Dashboard'
import Database from '../components/Database'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/database" component={Database} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter