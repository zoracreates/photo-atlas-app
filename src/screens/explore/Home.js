import React from 'react';
import SearchBar from '../../components/forms/SearchBar';


class Home extends React.Component  {
    

    state = {
        query: ''
    };

    

    handleSubmit (e) {
        e.preventDefault();

        let search = encodeURIComponent(this.state.query);
        this.props.history.push(`/explore/?q=&${search}`);
    } 

    handleInput(e) {
        this.setState({query: e.target.value })
    }
    


    render() {
        let {query} = this.state;

        return (
            <div className={`home`}>
                <div className={`dark-background`}>
                    <div className={`container mobile-padding`}>
                        <p className={`home-heading`}>Photo Atlas</p>
                        <h2 className={`h5-font`}>Find new places to capture your best work.</h2>
                        <SearchBar 
                
                            method={`get`}

                            value={query} 

                            onChange={(e) => {this.handleInput(e)}} 

                            labelText="Where do you want to go?" 

                            placeholder="Search a place"

                            onClick={(e)=> this.handleSubmit(e) }
                            />
                    </div>
                </div>
            </div>
            )

    }

}

export default Home;