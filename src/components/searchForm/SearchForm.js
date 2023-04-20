import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Link } from "react-router-dom";
import * as Yup from 'yup';

import ServiceMarvel from '../../services/ServiceMarvel';

import './searchForm.css';
import { useState } from 'react';

const SearchForm = () => {
    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    const serviceMarvel = new ServiceMarvel();

    const loadSrv = () => {
        setLoad(true);
        setError(false);
    }

    const loadOk = () => {
        setLoad(false);
        setError(false);
    } 

    const loadError = () => {
        setError(true);
        setLoad(false);
    }

    const getCharacterForName = (name) => {
        loadSrv();
        serviceMarvel.getRequestCharacterForName(name)
            .then((res) => {
                loadOk();
                setData(res.data.results);
            })
            .catch(loadError);
    }

    const resoult = (data === null) ? null :  data.length ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {data[0].name} page?</div>
            <Link to={`/character/${data[0].name}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> : <div className="char__search-error"> нет такого персонажа </div> ;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{ charName: ''}}
                validationSchema={Yup.object({
                    charName: Yup.string()
                        .required('Поле не может быть пустым'),
                })}
                onSubmit={({charName}) => {
                    getCharacterForName(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                id="charName" 
                                name='charName' 
                                type='text' 
                                placeholder="Enter name"/>
                            
                            <button 
                                type='submit' 
                                className="button button__main"
                                disabled={load}
                            >
                                <div className="inner">find</div>
                            </button>
                        </div>
                    <ErrorMessage name="charName" component="div" className="char__search-error" />
                </Form>
            </Formik>
            {(error) ? <div className="char__search-error"> Произошла ошибка 404</div> : null}
            {resoult}
        </div>
    )
}

export default SearchForm;