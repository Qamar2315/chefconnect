"use client"

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Page() {
    const initialValues = {
        title: '',
        description: '',
        ingredients: [],
        instructions: [],
        cookingTime: '',
        servings: '',
        author: '',
        category: '',
        tags: [],
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string("cannot be empty"),
        ingredients: Yup.string().required("cannot be empty"),
        instructions: Yup.string().required(),
        cookingTime: Yup.number().required('Cooking Time is required').min(0, 'Cooking Time must be greater than or equal to 0').max(120,"Cooking Time must be less than or equal to 120 minutes"),
        servings: Yup.number().required('Servings is required').min(1, 'Servings must be greater than 0').max(8,"Servings must be greater than 8"),
        author: Yup.string().required('Author is required'),
        category: Yup.string(),
        tags: Yup.string().required()
    });

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        // You can handle form submission here, e.g., send data to server
        // resetForm(); // Reset form after submission
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <Field type="text" id="title" name="title" className="form-input w-full border border-black p-1" placeholder="write title" />
                        <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <Field as="textarea" id="description" name="description" className="form-textarea w-full border border-black p-1" placeholder="write description" />
                        <ErrorMessage name="description" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Ingredients */}
                    <div className="mb-4">
                        <label htmlFor="ingredients" className="block text-gray-700 font-bold mb-2">Ingredients</label>
                        <Field type="text" id="ingredients" name="ingredients" className="form-input w-full border border-black p-1" placeholder="write ingredients seperated by comma" />
                        <ErrorMessage name="ingredients" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Instructions */}
                    <div className="mb-4">
                        <label htmlFor="instructions" className="block text-gray-700 font-bold mb-2">Instructions</label>
                        <Field type="text" id="instructions" name="instructions" className="form-input w-full border border-black p-1" placeholder="enter instructions seperated by comma" />
                        <ErrorMessage name="instructions" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Cooking Time */}
                    <div className="mb-4">
                        <label htmlFor="cookingTime" className="block text-gray-700 font-bold mb-2">Cooking Time</label>
                        <Field type="number" id="cookingTime" name="cookingTime" className="form-input w-full border border-black p-1" placeholder="enter cooking time" />
                        <ErrorMessage name="cookingTime" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Servings */}
                    <div className="mb-4">
                        <label htmlFor="servings" className="block text-gray-700 font-bold mb-2">Servings</label>
                        <Field type="number" id="servings" name="servings" className="form-input w-full border border-black p-1" placeholder="enter number of servings" />
                        <ErrorMessage name="servings" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Author */}
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
                        <Field type="text" id="author" name="author" className="form-input w-full border border-black p-1" placeholder="your name" />
                        <ErrorMessage name="author" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                        <Field type="text" id="category" name="category" className="form-input w-full border border-black p-1" placeholder="write catagory" />
                        <ErrorMessage name="category" component="div" className="text-red-500 mt-1" />
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                        <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags</label>
                        <Field type="text" id="tags" name="tags" className="form-input w-full border border-black p-1" placeholder="write associated tags seperated by comma" />
                        <ErrorMessage name="tags" component="div" className="text-red-500 mt-1" />
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>

    );
}

export default Page;
