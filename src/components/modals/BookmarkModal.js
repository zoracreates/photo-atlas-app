import React from 'react'
import Authenticate from '../../screens/authentication/Authenticate'
import Modal from './Modal'
import addToBookmarks from '../../utils/addToBookmarks'

class BookmarkModal extends React.Component {
    state = {
        isAuthenticated: false,
        modalTitle: 'Sign In',
        modalDescription: 'Sign in to add bookmark.',
        newUser: false,
        error: ''
    }

    changeUserType(newUserValue) {
        this.setState({ newUser: newUserValue }, () => {

            if (this.state.newUser) {
                this.setState(
                    {
                        modalTitle: 'Sign Up',
                        modalDescription: 'Create an account to add bookmark.'
                    }
                )
            }
        })
    }

    bookmarkTrip(user) {
        //do the bookmarking, then

        if (user) {
            this.setState({ isAuthenticated: true })
            let userId = user.uid;

            if (userId !== this.props.tripAuthor) {
                addToBookmarks(
                    userId,
                    this.props.tripId,
                    this.props.tripAuthor,
                    this.props.tripPrivacy,
                    (errorMessage) => {
                        if (!errorMessage) {
                            this.setState({
                                modalTitle: 'Bookmark',
                                modalDescription: ''
                            })

                        } else {
                            this.setState({
                                modalTitle: 'Issue Bookmarking',
                                modalDescription: '',
                                error: errorMessage
                            })
                        }
                    }
                )
            } else {
                this.setState({
                    error: 'Cannot bookmark this trip because you are its author.'
                })
            }
        }

    }

    verifyBookmark() {
        if (this.state.error) {
            return (
                <div aria-live="polite" className="modal-content-padding center-text">
                    <p className="error-font">
                        {this.state.error}
                    </p>
                </div>

            )

        } else {
            return (
                <div aria-live="polite" className="modal-content-padding center-text">
                    <h3 className="h5-font center-text">
                        Trip bookmarked!
                    </h3>
                </div>
            )
        }
    }

    renderContent() {
        if (!this.state.isAuthenticated) {
            return (
                <div className="modal-content-padding">
                    <Authenticate
                        hideTitle
                        changeUserOnParent={(newUserValue) => this.changeUserType(newUserValue)}
                        afterSignIn={(user) => this.bookmarkTrip(user)}
                        afterCreateAccount={(user) => this.bookmarkTrip(user)}
                    />
                </div>
            )
        } else {
            return this.verifyBookmark()
        }
    }

    closeModal() {
        this.setState({
            isAuthenticated: false,
            modalTitle: 'Sign In',
            modalDescription: 'Sign in to add bookmark.',
            newUser: false,
            error: ''
        }, () => {
            this.props.handleClose()
        })
    }

    render() {
        let {
            modalTitle,
            modalDescription
        } = this.state;

        return (
            <Modal
                modalId='manage-trips-modal'
                modalTitle={modalTitle}
                modalDescription={modalDescription}
                isOpen={this.props.isOpen}
                handleClose={() => this.closeModal()}
            >

                {this.renderContent()}

            </Modal>
        )
    }

}

export default BookmarkModal;