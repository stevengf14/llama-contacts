import Header from '../src/components/header'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import Link from 'next/link'

export default function AddContact() {

    const url = 'https://8nsp97gwg2.execute-api.us-east-2.amazonaws.com/prod/contacts';
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const dataProcess = (data) => {
        console.debug(data);
        setLoading(true);
        axios.post(url, data)
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    // Clean the form
                    setValue('name', '');
                    setValue('lastName', '');
                    setValue('email', '');
                    setAdded(true);
                }
            });
    }

    return (
        <div className="container">
            <Header title="Add Contact" type="is-warning" />
            <div className="columns">
                <div className="column is-half">
                    <form onSubmit={handleSubmit(dataProcess)}>
                        <div className="field">
                            <label className="label">Name: </label>
                            <div className="control">
                                <input type="text" {...register('name', { required: true })}></input>
                            </div>
                            {errors.name && <span>Name required</span>}
                        </div>
                        <div className="field">
                            <label className="label">Last Name: </label>
                            <div className="control">
                                <input type="text" {...register('lastName')}></input>
                            </div>
                            {errors.lastName && <span>Last Name required</span>}
                        </div>
                        <div className="field">
                            <label className="label">Email: </label>
                            <div className="control">
                                <input type="text" {...register('email', { required: true })}></input>
                            </div>
                            {errors.email && <span>Email required</span>}
                        </div>
                        {!loading && <button type="submit" className="button is-primary">Add</button>}
                        <Link href="/">
                            <a className="button is-info"  >Home</a>
                        </Link>
                    </form>
                </div>
            </div>
            {added &&
                <span>Contact Added</span>
            }

        </div>
    );
}