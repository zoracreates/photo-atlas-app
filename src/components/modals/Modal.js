import PropTypes from 'prop-types'

function Modal({ modalId, modalTitle, modalDescription, isOpen, handleClose, children } ) {

    let modalTitleId = `${modalId}-title`

    function closeModal() {
        handleClose(); //this should set props.isOpen to false on the parent
    }

    return (
        <>
            <div
                className={`${isOpen ? 'open' : 'closed'} modal-overlay`}

                onClick={() => closeModal()}

                tabIndex="-1">
            </div>
            <div id={modalId} className={`${isOpen ? 'open' : 'closed'} modal-wrapper ${modalId}`}>

                <div className="modal-body" role="dialog" aria-modal="true" aria-labelledby={`${modalTitleId}`}>

                    <button className={`close-button`} onClick={() => closeModal()}>Close</button>

                    <div aria-live="polite" className="modal-header">
                        <h2 id={`${modalTitleId}`}>
                            {modalTitle}
                        </h2>
                        <h3>{modalDescription}</h3>
                    </div>

                    <div className="modal-main">
                        {children}
                    </div>
                </div>

            </div>
        </>
    )
}

Modal.propTypes = {
    modalId: PropTypes.string, 
    modalTitle: PropTypes.string, 
    modalDescription: PropTypes.string,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    initiallyOpen: PropTypes.bool
}

export default Modal;