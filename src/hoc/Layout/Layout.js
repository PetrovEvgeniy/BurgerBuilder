import React, {useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

   const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }
        return (
            <Aux>
                <Toolbar
                isAuth={props.isAuthenticated}
                toggleSideDrawer={sideDrawerToggleHandler}/>
                <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible} 
                closed={sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {props.children}
                </main>
            </Aux>
        );
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);