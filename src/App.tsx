import { useState } from 'react'
import IconArrowRight from './assets/images/icon-arrow-right.svg'
import IconCopy from './assets/images/icon-copy.svg'

function App() {


  return (
    <div>
      <header><h1>Password Generator</h1></header>
      <main>
        <section>
          <div><input type='text' readOnly aria-label="Generated Password" placeholder='P4$5W0rD!' /><button type='button' aria-label="Copy password to clipboard"><img src={IconCopy} alt="" aria-hidden='true' /></button></div>
          <form>
            <div><div><label htmlFor="length-slider">Character Length</label><p>0</p></div><input type='range' id="length-slider" min={0} max={20} ></input></div>
            <div>
              <div>
                <input type="checkbox" id='uppercase' />
                <label htmlFor="uppercase">Include Uppercase Letters</label>
              </div>
              <div>
                <input type="checkbox" id='lowercase' />
                <label htmlFor="lowercase">Include Lowercase Letters</label>
              </div>
              <div>
                <input type="checkbox" id='numbers' />
                <label htmlFor="numbers">Include Numbers</label>
              </div>
              <div>
                <input type="checkbox" id='symbols' />
                <label htmlFor="symbols">Include Symbols</label>
              </div>
            </div>
            <div>
              <div><label>Strength</label>Strength Indicator</div>
              <button type='submit'>Generate <img src={IconArrowRight} alt="" aria-hidden='true' /></button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
