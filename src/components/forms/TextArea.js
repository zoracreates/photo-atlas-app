
import PropTypes from 'prop-types';

function TextArea(props) {

    let { className, ...rest } = props;

    return <textarea className={`text-bar ${className ? className : ''}`} {...rest} > </textarea>
}

TextArea.propTypes = {
    className: PropTypes.string
}


export default TextArea;