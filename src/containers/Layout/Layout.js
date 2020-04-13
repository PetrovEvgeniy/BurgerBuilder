import React, {useState} from 'react';
import Aux from '../Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    [isSideDrawerVisible, setIsSideDrawerVisible] = setState(false)

    const sideDrawerClosedHandler = () => {
        setIsSideDrawerVisible(false);
    }

    const sideDrawerToggleHandler = () => {

        setIsSideDrawerVisible(!isSideDrawerVisible);
    }

        return (
            <Aux>
                <Toolbar toggleSideDrawer={sideDrawerToggleHandler}/>
                <SideDrawer open={isSideDrawerVisible} closed={sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {props.children}
                </main>
            </Aux>
        );
    
}

export default Layout;