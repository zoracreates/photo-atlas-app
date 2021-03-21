import PropTypes from 'prop-types';
import React from 'react'
import CheckBox from './CheckBox'


class PasswordInput extends React.Component {
    state = {
        type: "password"
    }

    changeType() {
        if (this.state.type === "password") {
            this.setState(
                { type: "text" }
            )
        }
        else {
            this.setState(
                { type: "password" }
            )

        }
    }

    render() {

        let { className, checkName, ...rest } = this.props;


        return (
            <>
                <input type={this.state.type} 
                    className={`text-bar ${className ? className : ''}`} 
                    {...rest} 
                  /><br/>
                

            <CheckBox className="show-pass" name={checkName ?  checkName : 'show-pass'} onChange={() => { this.changeType()}} labelText="Show password" />

            </>
        )
    }

}

PasswordInput.propTypes = {
    className: PropTypes.string
}


export default PasswordInput;