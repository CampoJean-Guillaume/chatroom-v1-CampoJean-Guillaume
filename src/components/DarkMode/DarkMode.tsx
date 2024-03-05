import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

const DarkModeToggle = () => {
  // Détermine si le mode sombre est activé au chargement initial
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark'));

  useEffect(() => {
    // Met à jour l'état si la classe 'dark' est présente sur le body
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className='text-black dark:text-white p-2 rounded'>
      {isDarkMode ? <LuSun size={30} /> : <LuMoon size={30} />}
    </button>
  );
};

export default DarkModeToggle;
