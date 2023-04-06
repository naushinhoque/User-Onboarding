import './App.css';
import  React, { useState } from 'react';
import axios from 'axios';

import formSchema from './validation/formSchema';
import * as yup from 'yup';

import Form from './Components/Form';



const initialFormValues = {
  username: "",
  email: "",
  password: "",
  tos: false
}

const initialFormErrors = {
  username: "",
  email: "",
  password: "",
  tos: ""
}


function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [users, setUsers] = useState([]);

  const handleSubmit = () => {
    axios.post('http://reqres.in/api/users', formValues)
      .then(res => {
        setUsers([ res.data, ...users ])
      })
      .catch(err => console.error(err))
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .cath( err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const handleChange = (name, value) => {
    validate(name,value)
    setFormValues({...formValues, [name]: value});
  }
  return (
    <div className="App">
      <Form 
      values={formValues} 
      change={handleChange} 
      errors={formErrors} 
      submit={handleSubmit}
      />
      {users.map(user => (
        <div key={user.id}>
          <p>{user.createdAt}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
