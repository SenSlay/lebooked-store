import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';
import { useCart } from '../../context/CartContext';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
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

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Testing BookCard Component', () => {
  test('clicking "Add to Cart" adds book and shows modal', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    const mockShowModal = vi.fn();

    useCart.mockReturnValue({ addToCart: mockAddToCart });
    useModal.mockReturnValue({ showModal: mockShowModal });
    useAuth.mockReturnValue({ isLoggedIn: true }); // Simulate logged in

    const book = {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      imageUrl: '/gatsby.jpg',
      price: 10.99,
    };

    render(
      <MemoryRouter>
        <BookCard book={book} />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(book);
    expect(mockShowModal).toHaveBeenCalledWith(expect.stringContaining('Item added'), expect.anything());
  });
});