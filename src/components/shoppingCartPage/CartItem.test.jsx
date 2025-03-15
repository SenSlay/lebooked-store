import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, beforeEach, vi } from "vitest";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext"; 
import { MemoryRouter } from "react-router-dom";

vi.mock("../../context/CartContext", () => ({
  useCart: vi.fn(),
}));

const mockBook = {
  id: 1,
  title: "Test Book",
  author: "Test Author",
  image: "test.jpg",
  price: 20,
  quantity: 2,
};

describe("CartItem Component", () => {
  let updateCartQuantityMock, removeFromCartMock;

  beforeEach(() => {
    updateCartQuantityMock = vi.fn();
    removeFromCartMock = vi.fn();

    useCart.mockReturnValue({
      updateCartQuantity: updateCartQuantityMock,
      removeFromCart: removeFromCartMock,
    });

    render(
      <MemoryRouter>
        <CartItem book={mockBook} />
      </MemoryRouter>
    );
  });

  test("renders book details correctly", () => {
    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByAltText("Test Book")).toHaveAttribute("src", "test.jpg");
    expect(screen.getByText("$40.00")).toBeInTheDocument(); // 20 * 2
  });

  test("calls updateCartQuantity when quantity changes", async () => {
    const user = userEvent.setup();
    const incrementButton = screen.getByRole("button", { name: "+" });

    await user.click(incrementButton);

    expect(updateCartQuantityMock).toHaveBeenCalledWith(mockBook, 3);
  });

  test("calls removeFromCart when clicking remove button", async () => {
    const user = userEvent.setup();
    const removeButton = screen.getAllByRole("button", { name: /remove/i })[0];

    await user.click(removeButton);

    expect(removeFromCartMock).toHaveBeenCalledWith(mockBook.id);
  });
});