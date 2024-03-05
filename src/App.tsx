import { useEffect } from 'react';
import { LuLogIn } from 'react-icons/lu';
import { PiChatsCircleLight } from 'react-icons/pi';
import './App.scss';
import Config from './components/Config/Config';
import DarkMode from './components/DarkMode/DarkMode';
import Form from './components/Form/Form';
import MessageList from './components/MessageList/MessageList';
import { formVisibility } from './store/actions/login';
import { useAppDispatch, useAppSelector } from './store/redux-hook';
import { default as initializeChat } from './supababase/supabase';

function App() {
  // Initialisation de la connexion
  useEffect(() => {
    initializeChat();
  }, []);

  // Verifier si l'utilisateur est connecté
  const isLogin = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  // Fonction pour basculer la visibilité
  const handleConection = () => {
    dispatch(formVisibility());
  };

  return (
    <div className='App flex flex-col  min-w-96 w-full justify-between p-2 bg-blue-300 dark:bg-gray-950 rounded'>
      <div className='navbar text-3xl font-bold italic   text-blue-900 dark:text-white justify-between items-center bg-sky-500 dark:bg-gray-600 rounded mb-5 relative'>
        <h1>
          <PiChatsCircleLight size={38} />
          ChatRoom
        </h1>
        <div>
          <DarkMode />
          <Config />
        </div>
      </div>
      <div className='grow overflow-hidden scroll'>
        {isLogin.isLogged && <MessageList />}
        {!isLogin.isLogged && (
          <div className='flex flex-col text-center items-center font-bold justify-center text-2xl text-red-500 dark:text-red-500 h-full'>
            <p>Vous devez vous connecter pour voir les messages</p>
            <button onClick={handleConection}>
              <LuLogIn size={120} />
            </button>
          </div>
        )}
      </div>
      <div className='rounded bg-sky-500 dark:bg-gray-600 p-2'>
        <Form />
      </div>
    </div>
  );
}

export default App;
