import axios from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Header from '../src/components/header'
import styles from '../styles/Home.module.css'

export default function Home() {

  const url = 'https://8nsp97gwg2.execute-api.us-east-2.amazonaws.com/prod/contacts';

  const [registers, setRegisters] = useState([]);
  const [reload, setReload] = useState(0);


  useEffect(() => {
    console.debug('Getting contacts')
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          setRegisters(response.data);
        }
      });
  }, [reload]);

  let component;

  if (registers.length === 0) {
    component = <div>
      No registers yet.
    </div>
  } else {
    console.debug(registers);
    component = registers.map((contact, index) => {
      return (
        <div key={`contact-${index}`}>
          <div className="column is-quarter">{contact.name}</div>
          <div className="column is-quarter">{contact.lastName}</div>
          <div className="column is-half">{contact.email}</div>
        </div>
      );
    });
  }

  return (
    <div className="container">
      <Head>
        <title>Agenda</title>
        <meta name="description" content="Agenda" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title="Agenda" subtitle="Press the button to add contact"></Header>
        <form>
          <div className="columns is-multiline">
            {component}
          </div>
          <div>
            <Link href="/add-contact">
              <a className="button is-large is-link">Add +</a>
            </Link>
            <button className="button is-large is-danger" onClick={(event) => {
              event.preventDefault();
              setReload(reload + 1);
            }}>Reload *</button>
          </div>
        </form>
      </main>
    </div>
  )
}
