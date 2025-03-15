import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';
import { useCart } from '../../context/CartContext';
import { useModal } from '../../context/ModalContext';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// Mock the context hooks
vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

vi.mock('../../context/ModalContext', () => ({
  useModal: vi.fn(),
}));

describe('Testing BookCard Component', () => {
  test('clicking "Add to Cart" button calls updateCartQuantity', async () => {
    const user = userEvent.setup();
    const mockUpdateCartQuantity = vi.fn();
    const mockShowModal = vi.fn();

    useCart.mockReturnValue({ updateCartQuantity: mockUpdateCartQuantity });
    useModal.mockReturnValue({ showModal: mockShowModal });

    // Sample book data
    const book = {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      image: '/gatsby.jpg',
      price: 10.99,
    };

    // Render BookCard inside MemoryRouter
    render(
      <MemoryRouter>
        <BookCard book={book} />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    expect(mockUpdateCartQuantity).toHaveBeenCalledWith(book, 1, true);
    expect(mockShowModal).toHaveBeenCalledWith('Item added to your cart');
  });
});
