"use client"

import React, { useState } from 'react';
import Axios from 'axios';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EditProfileForm({ user }) {
    const router = useRouter();

    const initialValues = {
        name: user.name || '',
        email: user.email || '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await Axios.put(`/api/users/${user._id}`, values);
            if (res.data) {
                router.push(`/profile/${user._id}`);
                alert('User profile updated')
            } else {
                alert('Error:', res.error);
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">Name:</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1">Email:</label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1">Password:</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Save Changes</button>
                </Form>
            </Formik>
        </div>
    );
}

export default EditProfileForm;