import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, beforeEach, vi } from 'vitest';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

const mockBook = {
  id: 1,
  bookId: 1,
  title: 'Test Book',
  author: 'Test Author',
  description: 'Test Description',
  imageUrl: 'test.jpg',
  price: 20,
  quantity: 2,
};

describe('CartItem Component', () => {
  let incrementCartItemMock, decrementCartItemMock, updateCartItemQuantityMock, removeFromCartMock;

  beforeEach(() => {
    incrementCartItemMock = vi.fn();
    decrementCartItemMock = vi.fn();
    updateCartItemQuantityMock = vi.fn();
    removeFromCartMock = vi.fn();

    useCart.mockReturnValue({
      incrementCartItem: incrementCartItemMock,
      decrementCartItem: decrementCartItemMock,
      updateCartItemQuantity: updateCartItemQuantityMock,
      removeFromCart: removeFromCartMock,
    });

    render(
      <MemoryRouter>
        <CartItem book={mockBook} />
      </MemoryRouter>
    );
  });

  test('renders book details correctly', () => {
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getAllByText('$20')[0]).toBeInTheDocument(); // base price
    expect(screen.getByAltText('Test Book')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getAllByText('$40.00')[0]).toBeInTheDocument(); // price * quantity
  });

  test('increments quantity and calls incrementCartItem', async () => {
    const user = userEvent.setup();
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });

    await user.click(incrementBtn);

    expect(incrementCartItemMock).toHaveBeenCalledWith(mockBook.bookId);
  });

  test('decrements quantity and calls decrementCartItem', async () => {
    const user = userEvent.setup();
    const decrementBtn = screen.getByRole('button', { name: /decrease quantity/i });

    await user.click(decrementBtn);

    expect(decrementCartItemMock).toHaveBeenCalledWith(mockBook.bookId);
  });

  test('updates quantity when input is changed', async () => {
    const user = userEvent.setup();
    const input = screen.getByLabelText('Quantity');

    await user.clear(input);
    await user.type(input, '5');

    expect(updateCartItemQuantityMock).toHaveBeenCalledWith(mockBook.bookId, 5);
  });

  test('removes item when clicking remove button (mobile)', async () => {
    const user = userEvent.setup();
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });

    await user.click(removeButtons[0]);

    expect(removeFromCartMock).toHaveBeenCalledWith(mockBook.id);
  });
});