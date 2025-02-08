import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MapProvider } from './Context/mapContext';
// import {EnergyTrading} from './components/EnergyTrading.jsx';



createRoot(document.getElementById('root')).render(
    <MapProvider >
    <div className="no-scrollbar overflow-y-scroll h-screen">
    <App/>
    </div>
    </MapProvider>
    )
