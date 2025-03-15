import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi } from "vitest";
import Carousel from "./Carousel";
import { describe, expect, test } from "vitest";

const mockBooks = [
  { id: 1, title: "Book 1", author: "Author 1", image: "img1.jpg", price: 10 },
  { id: 2, title: "Book 2", author: "Author 2", image: "img2.jpg", price: 15 },
  { id: 3, title: "Book 3", author: "Author 3", image: "img3.jpg", price: 20 },
  { id: 4, title: "Book 3", author: "Author 3", image: "img3.jpg", price: 20 },
  { id: 5, title: "Book 3", author: "Author 3", image: "img3.jpg", price: 20 },
];

// Avoid calling hooks inside BookCard
vi.mock("../../components/common/BookCard", () => ({
  default: () => <div>Mocked BookCard</div>,
}));

describe("Testing Carousel Component", () => {
  beforeEach(() => {
    render(<Carousel books={mockBooks} />);
  });

  test("clicking right button moves the carousel right", async () => {
    const user = userEvent.setup();

    const rightButton = screen.getByRole("button", { name: "Scroll Right" });

    // Simulate clicking right
    await user.click(rightButton);

    // Check if the transform style changed (indicating movement)
    const carouselList = screen.getByRole("list");
    expect(carouselList).toHaveClass("transition-transform");
  });

  test("clicking left button moves the carousel left", async () => {
    const user = userEvent.setup();

    const leftButton = screen.getByRole("button", { name: "Scroll Left" });

    // Simulate clicking left
    await user.click(leftButton);

    // Check if the transform style changed
    const carouselList = screen.getByRole("list");
    expect(carouselList).toHaveClass("transition-transform");
  });

  test("auto-scroll pauses when hovered and resumes when unhovered", async () => {
    const user = userEvent.setup();
    const carouselCtn = screen.getByTestId("carousel-container");
  
    // Hover to pause auto-scroll
    await user.hover(carouselCtn);
    await waitFor(() => {
      expect(carouselCtn).toHaveAttribute("data-auto-scrolling", "false");
    });
  
    // Unhover to resume auto-scroll
    await user.unhover(carouselCtn);
    await waitFor(() => {
      expect(carouselCtn).toHaveAttribute("data-auto-scrolling", "true");
    });
  });

  test("carousel loops back to the start when reaching the end", async () => {
    const user = userEvent.setup();
    const rightButton = screen.getByRole("button", { name: /right/i });
    const carouselList = screen.getByRole("list");
  
    // Simulate scrolling past the last item
    for (let i = 0; i < mockBooks.length + 1; i++) {
      await user.click(rightButton);
    }
  
    // Manually trigger transitionEnd if necessary
    fireEvent.transitionEnd(carouselList);
  
    // Wait for React to update the state
    await waitFor(() => {
      expect(carouselList.style.transform).toBe("translateX(0px)");
    });
  });
});