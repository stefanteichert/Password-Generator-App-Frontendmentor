import { CopyIcon } from '../components/icons/CopyIcon'
import { useState, useEffect } from 'react';

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
    <div className='p-4 bg-grey-800 flex flex-row justify-between items-center gap-4'>
      <input type='text' readOnly aria-label="Generated Password" placeholder='P4$5W0rD!' className='text-preset-2 text-grey-700 bg-transparent w-full md:text-preset-1 ' value={password} />
      <div className='relative flex items-center shrink-0'>
        {isCopy && (
          <span
            className='absolute right-full mr-4 text-green-200 uppercase text-preset-4 md:text-preset-3 whitespace-nowrap'
            aria-live="polite"
          >
            copied
          </span>
        )}
        <button
          type='button'
          onClick={handleCopyButtonClick}
          className="hover:cursor-pointer group"
        >
          <CopyIcon className='text-green-200 group-hover:text-white transition-colors' />
        </button>
      </div>
    </div>
  )
}

export default PasswordDisplay