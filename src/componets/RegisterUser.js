import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Definizione dello schema di validazione con Yup
const schema = yup.object().shape({
  name: yup.string().required('Il nome è obbligatorio'),
  email: yup.string().email('Deve essere un email valida').required('L\'email è obbligatoria'),
  password: yup.string().min(6, 'La password deve essere di almeno 6 caratteri').required('La password è obbligatoria')
});

function RegisterUser() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Utente registrato con successo');
      } else {
        alert('Errore nella registrazione dell\'utente');
      }
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  return (
    <div className="register-user">
      <h1>Registrazione Utente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default RegisterUser;
