import React from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import ProfileView from './view';

const Profile = () => {
    let bodyStyles = '';
    bodyStyles += '--kt-toolbar-height: 5px;';
    bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;';
    document.body.setAttribute('style', bodyStyles);    

    return (
        <>
            <PageTitle >Profile</PageTitle>
            <ProfileView />
        </>
    );
};

export default Profile;