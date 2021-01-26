import Home from './Home';
import SearchResults from './SearchResults';

import {Switch, Route} from 'react-router-dom';

function Explore() {
    return (
        <Switch>
      
          <Route exact path="/" component={Home}/>
          <Route path="/search" component={SearchResults}/> 


         {/*
        
           Still need to figure our how routing works for search
        
        */}

        </Switch>
    )
}

export default Explore;