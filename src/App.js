import Navbar from './components/navigation/Navbar';
import AddLocation from './screens/AddLocation';
import Explore from './screens/explore/Explore';
import Profile from './screens/Profile';
import Trips from './screens/trips/Trips';
import './styles/main.scss';
import {Switch, Route} from 'react-router-dom';

function App(props) {
  return (
    <>
      <Navbar />  {/* need to figure out how to set icons to active maybe with match param*/}

      <main>
        <div className={`container`}>
          <Switch>
            <Route exact path="/" component={Explore}/>
            <Route path="/trips" component={Trips}/> {/* will become an auth required route*/}
            <Route path="/add" component={AddLocation}/> {/* will become an auth required route*/}
            <Route path="/profile" component={Profile}/> {/* will become an auth required route*/}
          </Switch>
        </div>
      </main>
      
      <footer>
        <div className={`container`}>
          <p>&copy; PhotoAtlas 2021</p>
          <p className={`caption`}>
            All photographs and their titles/metadata on PhotoAtlas are copyrighted and owned by 
            their respective owners (the photographers) and not by PhotoAtlas. As such Photo Atlas does 
            not grant any licenses to any copyrights, patents or any other intellectual property rights.
          </p>
        </div>
      </footer>
      
    </>
  );
}

export default App;
