import { describe, expect, test, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Header from "./Header";
import { useBooksContext } from "../../context/BooksContext";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

vi.mock("../../context/BooksContext", () => ({
  useBooksContext: vi.fn(),
}));

describe("Testing Header Component", () => {
  test("cart count is hidden when cart is empty", () => {
    useCart.mockReturnValue({ cart: [] }); // Empty cart
    useBooksContext.mockReturnValue({ books: [] });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // The badge should not exist in the DOM
    expect(screen.queryByTestId("cart-count")).not.toBeInTheDocument();
  });

  test("cart count displays correct count when items are in cart", () => {
    useCart.mockReturnValue({ cart: [{ id: 1 }, { id: 2 }] });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // The badge should be visible
    expect(screen.getByTestId("cart-count")).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
  });
});