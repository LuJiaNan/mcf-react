import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux'
import {ModuleRouter} from 'mcf-module'
import store,{persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react'
import AppLayout from './AppLayout'
import './locales'
import "./index.less"

console.log(persistor)
const {ConnectedRouter} = ModuleRouter
const App = () => (
    <Provider store={store} >
        <Router basename="/">
          <AppLayout />
        </Router>
    </Provider>
)

export default App
