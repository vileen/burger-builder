import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        };

        // componentDidMount would be enough for posts only, in case of fetching data from server
        // that are needed in render, componentDidMount was called after render which means
        // even if there is no data, error message won't be shown
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });

                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })
        }

        // needed since interceptors are being created every time hoc is used,
        // so with time there are going to be more and more zombie interceptors
        // that are still using memory and listening on requests
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({
                error: null
            })
        };

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmed}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
};

export default withErrorHandler;