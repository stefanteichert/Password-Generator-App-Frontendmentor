import { useState } from 'react'
import { ArrowIcon } from './components/icons/ArrowIcon'
import type { PasswordSettings } from './types'
import Header from './components/Header'
import PasswordDisplay from './components/PasswordDisplay'
import LengthSlider from './components/LengthSlider'
import Checkbox from './components/Checkbox'
import StrengthIndicator from './components/StrengthIndicator'
import { generatePassword } from './utils/password'


function App() {

  const [settings, setSettings] = useState<PasswordSettings>({
    length: 10,
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: false
  });
  const [password, setPassword] = useState<string>("");
  const min = 1;
  const max = 20;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = e.target.name as keyof PasswordSettings;
    setSettings(prev => ({ ...prev, [option]: e.target.checked }))
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, length: Number(e.target.value) }))
  }

  const handleCopy = async () => {
    if (password.length === 0) return;

    try {
      await navigator.clipboard.writeText(password);
    } catch (err) {
      console.error("Kopieren fehlgeschlagen:", err);
    }
  };

  const handleGenerate = (e: React.SubmitEvent) => {
    e.preventDefault();
    setPassword(generatePassword(settings));
  }

  return (
    <div className='flex flex-col items-center min-h-dvh px-4 py-16'>
      <Header />
      <main>
        <section className='flex flex-col gap-4 max-w-135'>
          <PasswordDisplay password={password} onCopy={handleCopy} />
          <form className='p-4 bg-grey-800 flex flex-col gap-4' onSubmit={handleGenerate}>
            <LengthSlider length={settings.length} min={min} max={max} onChange={handleSliderChange} />
            <div className='flex flex-col gap-4'>
              <Checkbox label='Include Uppercase Letters' name='uppercase' checked={settings.uppercase} onChange={handleCheckboxChange} />
              <Checkbox label='Include Lowercase Letters' name='lowercase' checked={settings.lowercase} onChange={handleCheckboxChange} />
              <Checkbox label='Include Numbers' name='numbers' checked={settings.numbers} onChange={handleCheckboxChange} />
              <Checkbox label='Include Symbols' name='symbols' checked={settings.symbols} onChange={handleCheckboxChange} />
            </div>
            <div className='flex flex-col gap-4'>
              <StrengthIndicator score={3} />
              <button type='submit' className='bg-green-200 flex py-4 px-26 justify-center items-center gap-4 text-preset-4 text-grey-800 uppercase border-green-200 border-2 md:text-preset-3 hover:cursor-pointer hover:bg-grey-950 hover:text-green-200 transition-colors'>Generate<ArrowIcon /></button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
