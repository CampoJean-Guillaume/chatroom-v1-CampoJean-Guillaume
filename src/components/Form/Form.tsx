import { format } from 'date-fns';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useAppSelector } from '../../store/redux-hook';
import { sendMessage } from '../../supababase/supabase';

const Form = () => {
  // Etat pour le contenu du message
  const [content, setContent] = useState('');
  // Récupérer l'utilisateur actuel
  const userActuel = useAppSelector((state) => state.chat.users[0]);
  // Récupérer l'état de connexion
  const isLogin = useAppSelector((state) => state.login);

  // Fonction pour gérer la soumission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const dateMessage = format(new Date(), 'HH:mm');
    const user_id = userActuel.id;
    sendMessage({ dateMessage, user_id, content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex w-full font-bold justify-between'>
        <input
          type='text'
          placeholder='Votre message'
          disabled={!isLogin.isLogged}
          className='input input-bordered  max-w-xl bg-white text-blue-600 w-full'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit' name='Envoyer' className='btn btn-default dark:btn-ghost  p-2'>
          <FiSend size={30} />
        </button>
      </div>
    </form>
  );
};

export default Form;
