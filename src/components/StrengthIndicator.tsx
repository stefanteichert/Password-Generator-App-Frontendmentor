type StrengthScore = 0 | 1 | 2 | 3 | 4;

interface StrengthIndicatorProps {
  score: StrengthScore;
}

const STRENGTH_CONFIG = {
  0: { label: '', color: 'transparent', borderColor: 'border-white' },
  1: { label: 'TOO WEAK!', color: 'bg-red-500', borderColor: 'border-red-500' },
  2: { label: 'WEAK', color: 'bg-orange-400', borderColor: 'border-orange-400' },
  3: { label: 'MEDIUM', color: 'bg-yellow-300', borderColor: 'border-yellow-300' },
  4: { label: 'STRONG', color: 'bg-green-200', borderColor: 'border-green-200' },
};

const StrengthIndicator = ({ score }: StrengthIndicatorProps) => {
  const bars = [1, 2, 3, 4];
  const config = STRENGTH_CONFIG[score];
  return (

    <div className="flex items-center justify-between bg-grey-950 p-4">
      <span className="text-grey-600 uppercase text-preset-4 md:text-preset-3">Strength</span>
      <div className="flex gap-2">
        <span className={`text-preset-3 text-grey-200 uppercase md:text-preset-2`}>
          {config.label}
        </span>
        {bars.map((barValue) => {
          const isFilled = barValue <= score;
          return (
            <div
              key={barValue}
              className={`h-7 w-2.5 border-2 transition-colors ${isFilled
                ? `${config.color} ${config.borderColor}`
                : 'border-grey-200 bg-transparent'
                }`}
            />
          );
        })}
      </div>
    </div>

  )
}

export default StrengthIndicator