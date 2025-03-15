import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useBooksContext } from '../../context/BooksContext';
import SearchSidebar from './SearchSidebar';
import { describe, expect, test, beforeEach, vi } from 'vitest';

vi.mock('../../context/BooksContext', () => ({
  useBooksContext: vi.fn(),
}));

const mockBooks = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    image: 'img1.jpg',
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    image: 'img2.jpg',
  },
  { id: 3, title: '1984', author: 'George Orwell', image: 'img3.jpg' },
];

describe('Testing SearchSidebar Component', () => {
  beforeEach(() => {
    useBooksContext.mockReturnValue({ books: mockBooks });
  });

  test('Search Sidebar is on screen when `isOpen` is true', () => {
    render(<SearchSidebar isOpen={true} onClose={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    const sidebar = screen.getByTestId('search-sidebar');

    expect(sidebar).toHaveClass('translate-x-0'); // Ensures sidebar is on-screen
  });

  test('Search Sidebar is hidden when `isOpen` is false', () => {
    render(<SearchSidebar isOpen={false} onClose={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    const sidebar = screen.getByTestId('search-sidebar'); // Get the sidebar container

    expect(sidebar).toHaveClass('translate-x-full'); // Ensures sidebar is off-screen
  });

  test('typing updates the search input', async () => {
    const user = userEvent.setup();
    render(<SearchSidebar isOpen={true} onClose={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    const input = screen.getByPlaceholderText('Search for books...');
    await user.type(input, 'gatsby');

    expect(input).toHaveValue('gatsby');
  });

  test('filters books based on search input', async () => {
    const user = userEvent.setup();
    render(<SearchSidebar isOpen={true} onClose={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    const input = screen.getByPlaceholderText('Search for books...');
    await user.type(input, 'Mockingbird');

    expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
    expect(screen.queryByText('The Great Gatsby')).not.toBeInTheDocument();
  });

  test("displays 'No results found' when no matches", async () => {
    const user = userEvent.setup();
    render(<SearchSidebar isOpen={true} onClose={vi.fn()} />, {
      wrapper: MemoryRouter,
    });

    const input = screen.getByPlaceholderText('Search for books...');
    await user.type(input, 'Nonexistent Book');

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  test('clicking a book calls `onClose`', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();
    render(<SearchSidebar isOpen={true} onClose={onCloseMock} />, {
      wrapper: MemoryRouter,
    });

    const input = screen.getByPlaceholderText('Search for books...');
    await user.type(input, 'Gatsby');

    const bookLink = screen.getByText('The Great Gatsby');
    await user.click(bookLink);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
