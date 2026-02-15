import { CopyIcon } from '../components/icons/CopyIcon'
import { useState, useEffect } from 'react';
import { vi } from 'vitest';
interface PasswordDisplayProps {
  password: string,
  onCopy: () => void;
}


const PasswordDisplay = ({ password, onCopy }: PasswordDisplayProps) => {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  useEffect(() => {
    if (!isCopy) return;
    const timer = setTimeout(() => {
      setIsCopy(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isCopy]);

  const handleCopyButtonClick = () => {
    if (!password) return;
    onCopy();
    setIsCopy(true);
  };

  return (
    <div className='p-4 bg-grey-800 flex flex-row justify-between'>
      <input type='text' readOnly aria-label="Generated Password" placeholder='P4$5W0rD!' className='text-preset-2 text-grey-700 bg-transparent w-full md:text-preset-1 ' value={password} />
      {isCopy && <span className='text-green-200 uppercase text-preset-4 md:text-preset-3' aria-live="polite">copied</span>}
      <button type='button' aria-label="Copy password to clipboard" onClick={handleCopyButtonClick}><CopyIcon className='text-green-200 hover:text-white hover:cursor-pointer' /></button>
    </div>
  )
}

export default PasswordDisplay