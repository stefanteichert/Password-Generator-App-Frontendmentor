
interface LengthSliderProps {
  length: number,
  min: number,
  max: number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const LengthSlider = ({ length, min, max, onChange }: LengthSliderProps) => {

  const progress = ((length - min) / (max - min)) * 100;
  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <label htmlFor="length-slider" className='text-preset-4 text-grey-200 md:text-preset-3'>Character Length</label>
        <p className='text-preset-2 text-green-200 md:text-preset-1'>{length}</p>
      </div>
      <input
        type="range"
        id="length-slider"
        min={min}
        max={max}
        value={length}
        onChange={onChange}
        className="custom-slider"
        style={{
          background: `linear-gradient(to right, var(--color-green-200) ${progress}%, var(--color-grey-950) ${progress}%)`
        }}
      />
    </div>
  )
}

export default LengthSlider