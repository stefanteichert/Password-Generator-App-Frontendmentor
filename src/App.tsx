import { useState } from 'react'
import { ArrowIcon } from './components/icons/ArrowIcon'
import type { PasswordSettings } from './types'
import Header from './components/Header'
import PasswordDisplay from './components/PasswordDisplay'
import LengthSlider from './components/LengthSlider'
import Checkbox from './components/Checkbox'
import StrengthIndicator from './components/StrengthIndicator'
import { generatePassword } from './utils/password'
import { calculatePasswordStrength } from './utils/strength'

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

  const strengthScore = calculatePasswordStrength(settings);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <Header />
      <main>
        <section className='flex flex-col gap-4 max-w-135'>
          <PasswordDisplay password={password} onCopy={handleCopy} />
          <form className='p-4 bg-grey-800 flex flex-col gap-4 md:gap-8' onSubmit={handleGenerate}>
            <fieldset className="border-none p-0 m-0">
              <legend className="sr-only">Password Generator Settings</legend>
              <LengthSlider length={settings.length} min={min} max={max} onChange={handleSliderChange} />
              <div className='flex flex-col gap-4 mb-4'>
                <Checkbox label='Include Uppercase Letters' name='uppercase' checked={settings.uppercase} onChange={handleCheckboxChange} />
                <Checkbox label='Include Lowercase Letters' name='lowercase' checked={settings.lowercase} onChange={handleCheckboxChange} />
                <Checkbox label='Include Numbers' name='numbers' checked={settings.numbers} onChange={handleCheckboxChange} />
                <Checkbox label='Include Symbols' name='symbols' checked={settings.symbols} onChange={handleCheckboxChange} />
              </div>
            </fieldset>
            <div className='flex flex-col gap-4'>
              <StrengthIndicator score={strengthScore} />
              {strengthScore === 0 && (
                <span aria-live="polite" className="text-red-500 text-preset-4">
                  Please select at least one option
                </span>
              )}
              <button
                type='submit'
                disabled={strengthScore === 0}
                className='bg-green-200 text-grey-800 uppercase border-2 border-green-200 flex py-4 px-26 justify-center items-center gap-4 transition-colors enabled:hover:cursor-pointer enabled:hover:bg-grey-950
                enabled:hover:text-green-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale-[0.5] ' >
                Generate <ArrowIcon />
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
