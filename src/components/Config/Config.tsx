import { useState } from 'react';
import { LuSettings } from 'react-icons/lu';
import { formVisibility, login, logout } from '../../store/actions/login';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';

const Config = () => {
  // Verifier si l'utilisateur est connecté
  const isLogin = useAppSelector((state) => state.login);
  // Verifier si le formulaire est visible
  const isFormVisible = useAppSelector((state) => state.login.isVisible);

  // Etats pour les champs de formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dispatch pour les actions
  const dispatch = useAppDispatch();

  // Fonction pour basculer la visibilité
  const toggleFormVisibility = () => {
    dispatch(formVisibility());
  };

  // Fonction pour gérer la soumission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Soumission avec email:', email, password);
    dispatch(login(email, password));
    dispatch(formVisibility());
  };

  // Fonction pour gérer la déconnexion
  const handleDeco = () => {
    dispatch(logout());
    console.log('Déconnexion');
    dispatch(formVisibility());
  };

  return (
    <div className='text-black dark:text-white relative'>
      <button onClick={toggleFormVisibility}>
        <LuSettings size={30} />
      </button>
      {isFormVisible && !isLogin.isLogged && (
        <form className='absolute right-0 top-16 bg-sky-500 dark:bg-white text-white p-3 rounded z-10 form-control'>
          <label className='input input-bordered flex items-center gap-2 mb-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70'>
              <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
              <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
            </svg>
            <input type='text' className='grow' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className='input input-bordered flex items-center gap-2 mb-2'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70'>
              <path
                fillRule='evenodd'
                d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                clipRule='evenodd'
              />
            </svg>
            <input type='password' className='grow' placeholder='***' value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Se connecter
          </button>
        </form>
      )}
      {isFormVisible && isLogin.isLogged && (
        <div className='absolute right-0 top-16 bg-sky-500 dark:bg-white text-white p-3 rounded z-10 form-control min-w-80'>
          <p className='btn mb-2'>BIENVENUE</p>
          <p className='btn mb-2'>{isLogin.email}</p>
          <button className='btn btn-primary' onClick={handleDeco}>
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
};

export default Config;
