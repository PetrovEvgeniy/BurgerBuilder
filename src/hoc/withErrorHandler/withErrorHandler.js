import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        constructor(props) {
            super(props);
            this.state = { error: null }

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            });
        }
    
        componentWillUnmount() {
            axios.interceptors.eject(this.reqInterceptor);
            axios.interceptors.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error:null})
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} closeModal={this.errorConfirmHandler}>
                        <h3>ERROR!</h3>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}
 
export default withErrorHandler;