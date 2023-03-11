import {  Route, Routes} from 'react-router-dom'

import {Home} from './Pages/Home'
import {Poke} from './Pages/Poke'

export function Router() {
  return (
    <Routes >
        <Route path="/" Component={Home} />
        <Route path="/poke" Component={Poke} />
    </Routes>
  )
}
