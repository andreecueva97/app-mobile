//ACA TENGO LAS RUTAS DE STACKNAVIGATION
import perrosScreen from '../../component/screens/perrosScreen.js';
import agregarPerrosScreen from '../../component/screens/agregarPerrosScreen.js';
import ayudarScreen from '../../component/screens/ayudarScreen.js';
import perfilLoginScreen from '../../component/screens/perfilLoginScreen.js';
import inicioSesionScreen from '../../component/screens/inicioSesionScreen.js';
import registroScreen from '../../component/screens/registroScreen.js';
import homeScreen from '../../component/screens/homeScreen.js';

const Routes = {
    
    home : {screen:homeScreen},
    perros : {screen:perrosScreen},
    agregarPerro :{ screen:agregarPerrosScreen},
    ayudar :{screen:ayudarScreen},
    perfilLogin : {screenp:perfilLoginScreen},
    inicioSesion : {screen: inicioSesionScreen},
    registroo :{screen:registroScreen}
}

export default Routes;
