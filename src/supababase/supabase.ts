import { createClient } from '@supabase/supabase-js';
import store from '../store';
import { addMessage, addUser, deleteMessage, editMessage } from '../store/actions/chat';

const supabase = createClient(
  'https://kebipcrzymgyyoqtcooi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYmlwY3J6eW1neXlvcXRjb29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MTYxMTIsImV4cCI6MjAyNDk5MjExMn0.kHZDJ_7aBJaAJ5WtXU9r4yLJbPxTTqv-Mx7i3lEv8eQ'
);

// Initialise le chat avec les messages et les utilisateurs
async function initializeChat() {
  try {
    const { data } = await supabase.from('messages').select('*').order('id', { ascending: true });
    if (data) {
      data.forEach((message) => {
        store.dispatch(addMessage(message));
      });
    }
    const { data: users } = await supabase.from('users').select('*');
    if (users) {
      users.forEach((user) => {
        store.dispatch(addUser(user));
      });
    }
  } catch (error) {
    console.error('Failed to initialize chat:', error);
  }
}

// Crer une fonction pour gérer les suppressions
const handleDeletes = (payload: { old: { id: string } }) => {
  console.log('Suppression detectée!', payload);
  store.dispatch(deleteMessage(payload.old.id));
};

// Crer une fonction pour gérer les insertions
const handleInserts = (payload: { new: void }) => {
  console.log('Insertion reçu', payload);
  store.dispatch(addMessage(payload.new));
};

// Crer une fonction pour gérer les mises à jour
const handleUpdates = (payload: { new: { id: number; content: string } }) => {
  console.log('Mise à jour reçue!', payload);
  if (payload.new) {
    store.dispatch(editMessage(payload.new.id, payload.new.content)); // Assurez-vous que `editMessage` accepte deux paramètres : id et content
  }
};

// Souscrire aux changements dans la base de donnée
supabase
  .channel('messages')
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, handleDeletes)
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleInserts)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, handleUpdates)
  .subscribe();

// Envois un message dans la base de donnée
export async function sendMessage({ content, user_id, dateMessage }: { content: string; user_id: string; dateMessage: string }) {
  await supabase.from('messages').insert([{ date: dateMessage, user_id, content }]);
}

// Supprimer un message
export async function suprimMessage(id: string) {
  await supabase.from('messages').delete().match({ id });
  store.dispatch(deleteMessage(id));
}

// Mettre à jour un message
export async function editMessageApi(id: string, content: string) {
  await supabase.from('messages').update({ content }).match({ id });
}

export default initializeChat;
