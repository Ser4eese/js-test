import { render, screen, fireEvent } from "@testing-library/react";
import { Greeting, Counter, TodoList } from "./index.jsx";

describe("Модуль 30: React", () => {
  describe("Greeting", () => {
    test("Отображает приветствие с именем", () => {
      render(<Greeting name="Ivan" />);

      expect(screen.getByText("Привет, Ivan!")).toBeInTheDocument();
    });

    test("Отображает 'мир' если имя пустое", () => {
      render(<Greeting name="" />);

      expect(screen.getByText("Привет, мир!")).toBeInTheDocument();
    });

    test("Рендерит h1", () => {
      render(<Greeting name="Test" />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Counter", () => {
    test("Показывает начальное значение 0", () => {
      render(<Counter />);

      expect(screen.getByTestId("count")).toHaveTextContent("0");
    });

    test("Показывает переданное начальное значение", () => {
      render(<Counter initial={10} />);

      expect(screen.getByTestId("count")).toHaveTextContent("10");
    });

    test("Кнопка + увеличивает счётчик", () => {
      render(<Counter />);

      fireEvent.click(screen.getByTestId("increment"));
      fireEvent.click(screen.getByTestId("increment"));

      expect(screen.getByTestId("count")).toHaveTextContent("2");
    });

    test("Кнопка - уменьшает счётчик", () => {
      render(<Counter initial={5} />);

      fireEvent.click(screen.getByTestId("decrement"));

      expect(screen.getByTestId("count")).toHaveTextContent("4");
    });

    test("Кнопка Reset сбрасывает к initial", () => {
      render(<Counter initial={10} />);

      fireEvent.click(screen.getByTestId("increment"));
      fireEvent.click(screen.getByTestId("increment"));
      fireEvent.click(screen.getByTestId("reset"));

      expect(screen.getByTestId("count")).toHaveTextContent("10");
    });
  });

  describe("TodoList", () => {
    test("Рендерит список задач", () => {
      render(<TodoList items={["Buy milk", "Walk dog"]} />);

      expect(screen.getByText("Buy milk")).toBeInTheDocument();
      expect(screen.getByText("Walk dog")).toBeInTheDocument();
    });

    test("Рендерит элементы в <li>", () => {
      render(<TodoList items={["Task 1", "Task 2"]} />);

      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(2);
    });

    test("Пустой массив — показывает 'Нет задач'", () => {
      render(<TodoList items={[]} />);

      expect(screen.getByText("Нет задач")).toBeInTheDocument();
    });

    test("Пустой массив — нет <ul>", () => {
      render(<TodoList items={[]} />);

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });
});
