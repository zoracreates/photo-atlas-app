import PropTypes from 'prop-types';
import React from 'react'


class PasswordInput extends React.Component {
    state = {
        type: "password"
    }

    changeType(e) {
        e.preventDefault();
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

        let { className, ...rest } = this.props;


        return (
            <>
                <input type={this.state.type} className={`text-bar ${className ? className : ''}`} {...rest} />
                <button className="secondary-button"
                    onClick={(e) => { this.changeType(e) }}
                >Show password</button>
            </>
        )
    }

}

PasswordInput.propTypes = {
    className: PropTypes.string
}


export default PasswordInput;