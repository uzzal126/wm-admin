import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PageTitle } from '../../../_metronic/layout/core';
import { ErrorMessagesInPage } from '../../modules/errors/ErrorMessage';
import { Review } from './list';

const ReviewPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='/index'
                    element={
                        <>
                            <PageTitle >reviews list</PageTitle>
                            <Review />
                        </>
                    }
                />
                <Route
                    path='/*'
                    element={
                        <>
                            <PageTitle >Page not Found</PageTitle>
                            <ErrorMessagesInPage errors='' />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/reviews/index' />} />
        </Routes>
    );
};

export default ReviewPage;