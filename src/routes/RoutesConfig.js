import Home from '../pages/Home';
import Login from '../pages/Login';
import * as R from './Constants';


export const Routes = [
    { path: R.ROOT, name: "Home", Component: Home },
    { path: R.LOGIN, name: "Login", Component: Login },
]