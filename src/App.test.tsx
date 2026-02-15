import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Password Generator Integration', () => {

  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
      configurable: true,
    });
  });

  it('should toggle the generate button state based on options', async () => {
    const user = userEvent.setup();
    render(<App />);

    const generateBtn = screen.getByRole('button', { name: /generate/i });
    const uppercaseCheckbox = screen.getByLabelText(/include uppercase letters/i);

    expect(generateBtn).toBeEnabled();

    await user.click(uppercaseCheckbox);

    expect(generateBtn).toBeDisabled();

    const numbersCheckbox = screen.getByLabelText(/include numbers/i);
    await user.click(numbersCheckbox);

    expect(generateBtn).toBeEnabled();
  });

  it('should toggle the validation message when no options are selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    const uppercaseCheckbox = screen.getByLabelText(/include uppercase letters/i);

    expect(screen.queryByText(/please select/i)).not.toBeInTheDocument();

    await user.click(uppercaseCheckbox);

    expect(screen.getByText(/please select/i)).toBeInTheDocument();

    await user.click(uppercaseCheckbox);

    expect(screen.queryByText(/please select/i)).not.toBeInTheDocument();
  })

  it('should toggle the copied message when copy button gets clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const generateBtn = screen.getByRole('button', { name: /generate/i });

    const copyBtn = screen.getByRole('button', { name: /copy password to clipboard/i });

    expect(screen.queryByText(/copied/i)).not.toBeInTheDocument();

    await user.click(generateBtn);

    expect(screen.queryByText(/copied/i)).not.toBeInTheDocument();

    await user.click(copyBtn);

    expect(screen.getByText(/copied/i)).toBeInTheDocument();

  })
});