import React from 'react';
import CheckBox from './CheckBox';
import SubmitButton from './SubmitButton';

class SubjectFilters extends React.Component {

    state = {
        open: false,
        filters: {
            abandoned: false,
            architecture: false,
            astro: false,
            landscape: false,
            sunrise: false,
            sunset: false,
            transport: false,
            people: false,
            urban: false,
            water: false
        },
        formChanged: false,
        previousFilters: []
    }


    componentDidUpdate(prevProps) {
       
        if (this.props.resetFilters !== prevProps.resetFilters) {
           
            if(this.props.resetFilters) {
                this.setState(
                    {filters: 
                      {
                          abandoned: false,
                          architecture: false,
                          astro: false,
                          landscape: false,
                          sunrise: false,
                          sunset: false,
                          transport: false,
                          people: false,
                          urban: false,
                          water: false
                      }
              })
              }

            }


      }

    
    toggleDropdown() {
        this.setState({ open: !this.state.open })
    }

    closeDropdown() {

        if(this.state.formChanged && this.state.previousFilters ) {
            this.setState({filters: this.state.previousFilters})
        }
        this.setState({ open: false, formChanged: false})
       
    }

    sendData(e) {
        e.preventDefault();

        let {
            abandoned,
            architecture,
            astro,
            landscape,
            sunrise,
            sunset,
            transport,
            people,
            urban,
            water
        } = this.state.filters;


        let abandonedTags = abandoned ? 'abandoned, ruins, ghost' : false;
        let architectureTags = architecture ? 'architecture' : false;
        let astroTags = astro ? 'astrophotography, stars, moon' : false;
        let landscapeTags = landscape ? 'landscape, mountains, outdoors' : false;
        let sunriseTags = sunrise ? 'sunrise' : false;
        let sunsetTags = sunset ? 'sunset' : false;
        let transportTags = transport ? 'transport, train, bus, boat, airplane, airport' : false;
        let peopleTags = people ? 'people, portrait' : false;
        let urbanTags = urban ? 'urban, cityscape, city' : false;
        let waterTags = water ? 'water, lake, river, ocean, waterfall' : false;

    


        let filterString = '';
        let allFilterTags = [
            abandonedTags,
            architectureTags,
            astroTags,
            landscapeTags,
            sunriseTags,
            sunsetTags,
            transportTags,
            peopleTags,
            urbanTags,
            waterTags
        ];

        let activeFilters = [];

        allFilterTags.forEach(
            filter => {
                if (filter) {
                    activeFilters.push(filter)
                }
            }
        )


        activeFilters.forEach(
            (filter, index) => {
                    if (index === 0) {
                        filterString = filterString.concat(filter)
                    } else {
                        filterString = filterString.concat(`, ${filter}`)
                    }
                }
        )

        this.setState({ open: !this.state.open, formChanged: false, previousFilters: this.state.filters})




        return this.props.handleSubmit(filterString)
    }


    handleChange(e) {

        let filter = e.target.name;

        switch (filter) {
            case 'abandoned':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        abandoned: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'architecture':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        architecture: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'astro':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        astro: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'landscape':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        landscape: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'sunrise':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        sunrise: e.target.checked      // update the value of specific key
                    }
                }))
                break;
            case 'sunset':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        sunset: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'transport':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        transport: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'people':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        people: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'urban':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        urban: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            case 'water':
                this.setState(prevState => ({
                    filters: {                   // object that we want to update
                        ...prevState.filters,    // keep all other key-value pairs
                        water: e.target.checked      // update the value of specific key
                    }
                }));
                break;
            default:
                console.log('filter does not exist')
        }
    }

    render() {
        let { 
            open,
            formChanged
        } = this.state;

        let {
            abandoned,
            architecture,
            astro,
            landscape,
            sunrise,
            sunset,
            transport,
            people,
            urban,
            water
        } = this.state.filters;

        return (
            <span className={`search-filter-container ${open ? 'open' : 'closed'}`} >
                <button className={`search-filter`} onClick={(e) => { this.toggleDropdown() }}>
                    Filter by Subject
                </button>
                <div className={`search-filter-dropdown`}>
                    <button className={`close-button`} onClick={() => this.closeDropdown()}>Close</button>
                <form onChange={() => {this.setState({formChanged: true})}}>
                    <CheckBox name="abandoned" checked={abandoned}  labelText="Abandoned" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="architecture"  checked={architecture}  labelText="Architecture" onChange={(e) => { this.handleChange(e) } } />
                    <CheckBox name="astro" checked={astro} labelText="Astrophotography" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="landscape" checked={landscape} labelText="Landscape" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="sunrise" checked={sunrise} labelText="Sunrise" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="sunset" checked={sunset} labelText="Sunset" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="transport" checked={transport} labelText="Transport" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="people" checked={people} labelText="People" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="urban" checked={urban} labelText="Urban" onChange={(e) => { this.handleChange(e) }} />
                    <CheckBox name="water"  checked={water} labelText="Water" onChange={(e) => { this.handleChange(e) }} />

                    <SubmitButton onClick={(e) => { this.sendData(e) }} value="Apply Filters" />
                </form>
                </div>
            </span>
        )
    }
}

export default SubjectFilters;