import React, { Fragment } from 'react';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;