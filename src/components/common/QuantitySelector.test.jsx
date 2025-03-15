import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantitySelector from './QuantitySelector';
import { useState } from 'react';

// Helper component to test QuantitySelector
const Wrapper = () => {
  const [quantity, setQuantity] = useState(1);
  return <QuantitySelector quantity={quantity} setQuantity={setQuantity} />;
};

describe('Testing QuantitySelector Component', () => {
  test('Decrement button decreases quantity but not below 0', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const decrementButton = screen.getByRole('button', {
      name: 'Decrease quantity',
    });
    const quantityInput = screen.getByLabelText('Quantity');

    await user.clear(quantityInput);
    await user.type(quantityInput, '2'); // Set input value to 2

    // Click decrement three times (starting at value 2)
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue('1'); // Decrements to 1

    await user.click(decrementButton);
    expect(quantityInput).toHaveValue('0'); // Decrements to 0

    await user.click(decrementButton);
    expect(quantityInput).toHaveValue('0'); // Should not go below 0
  });

  test('Increment button increases quantity', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const incrementButton = screen.getByRole('button', {
      name: 'Increase quantity',
    });
    const quantityInput = screen.getByLabelText('Quantity');

    await user.click(incrementButton);
    expect(quantityInput).toHaveValue('2');

    await user.click(incrementButton);
    expect(quantityInput).toHaveValue('3');
  });

  test('User can type only numbers in the input field', async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const quantityInput = screen.getByLabelText('Quantity');

    await user.clear(quantityInput); // Sets input to 0
    await user.type(quantityInput, 'abc');
    expect(quantityInput).toHaveValue('0'); // Input does not accept non-numeric inputs, so remains 0

    await user.clear(quantityInput); // Sets input to 0
    await user.type(quantityInput, '123');
    expect(quantityInput).toHaveValue('123'); // Numeric input should be accepted

    await user.clear(quantityInput);
    await user.type(quantityInput, '12a!@#');
    expect(quantityInput).toHaveValue('12'); // Only numbers should remain
  });
});
