import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PostList, AddPostForm } from "./index.jsx";

describe("Модуль 31: React + Fetch", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("PostList", () => {
    test("Показывает 'Загрузка...' при монтировании", () => {
      global.fetch = vi.fn(() => new Promise(() => {})); // Никогда не resolve

      render(<PostList url="http://test" />);

      expect(screen.getByTestId("loading")).toHaveTextContent("Загрузка...");
    });

    test("Загружает и отображает посты", async () => {
      const posts = [
        { id: 1, title: "First post" },
        { id: 2, title: "Second post" },
      ];

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(posts),
        })
      );

      render(<PostList url="http://test" />);

      await waitFor(() => {
        expect(screen.getByTestId("posts")).toBeInTheDocument();
      });

      expect(screen.getByText("First post")).toBeInTheDocument();
      expect(screen.getByText("Second post")).toBeInTheDocument();
    });

    test("Делает запрос на правильный URL", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      );

      render(<PostList url="http://localhost:3000" />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "http://localhost:3000/api/posts"
        );
      });
    });

    test("Показывает ошибку при неудачном запросе", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      );

      render(<PostList url="http://test" />);

      await waitFor(() => {
        expect(screen.getByTestId("error")).toBeInTheDocument();
      });
    });

    test("Рендерит посты как <li>", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { id: 1, title: "A" },
              { id: 2, title: "B" },
            ]),
        })
      );

      render(<PostList url="http://test" />);

      await waitFor(() => {
        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(2);
      });
    });
  });

  describe("AddPostForm", () => {
    test("Рендерит input и кнопку", () => {
      render(<AddPostForm url="http://test" onAdd={() => {}} />);

      expect(
        screen.getByPlaceholderText("Заголовок поста")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /добавить/i })
      ).toBeInTheDocument();
    });

    test("Отправляет POST запрос при сабмите", async () => {
      const mockPost = { id: 1, title: "New post" };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPost),
        })
      );
      const onAdd = vi.fn();

      render(<AddPostForm url="http://test" onAdd={onAdd} />);

      const input = screen.getByPlaceholderText("Заголовок поста");
      fireEvent.change(input, { target: { value: "New post" } });
      fireEvent.submit(input.closest("form"));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "http://test/api/posts",
          expect.objectContaining({
            method: "POST",
            headers: expect.objectContaining({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({ title: "New post" }),
          })
        );
      });
    });

    test("Вызывает onAdd с ответом сервера", async () => {
      const mockPost = { id: 1, title: "Test" };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPost),
        })
      );
      const onAdd = vi.fn();

      render(<AddPostForm url="http://test" onAdd={onAdd} />);

      const input = screen.getByPlaceholderText("Заголовок поста");
      fireEvent.change(input, { target: { value: "Test" } });
      fireEvent.submit(input.closest("form"));

      await waitFor(() => {
        expect(onAdd).toHaveBeenCalledWith(mockPost);
      });
    });

    test("Очищает input после сабмита", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ id: 1, title: "X" }),
        })
      );

      render(<AddPostForm url="http://test" onAdd={() => {}} />);

      const input = screen.getByPlaceholderText("Заголовок поста");
      fireEvent.change(input, { target: { value: "Hello" } });
      fireEvent.submit(input.closest("form"));

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });
  });
});
