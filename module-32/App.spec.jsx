import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NoteList, AddNoteForm, App } from "./App.jsx";

describe("Модуль 32: Финальный проект — Frontend", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("NoteList", () => {
    test("Рендерит список заметок", () => {
      const notes = [
        { id: 1, title: "Note 1", text: "Text 1" },
        { id: 2, title: "Note 2", text: "Text 2" },
      ];

      render(<NoteList notes={notes} />);

      expect(screen.getByTestId("note-list")).toBeInTheDocument();
      expect(screen.getAllByTestId("note-item")).toHaveLength(2);
    });

    test("Показывает title в h3 и text в p", () => {
      render(<NoteList notes={[{ id: 1, title: "My Title", text: "My Text" }]} />);

      expect(screen.getByText("My Title")).toBeInTheDocument();
      expect(screen.getByText("My Text")).toBeInTheDocument();
    });

    test("Пустой массив — пустой список", () => {
      render(<NoteList notes={[]} />);

      expect(screen.getByTestId("note-list")).toBeInTheDocument();
      expect(screen.queryAllByTestId("note-item")).toHaveLength(0);
    });
  });

  describe("AddNoteForm", () => {
    test("Рендерит два input и кнопку", () => {
      render(<AddNoteForm onAdd={() => {}} />);

      expect(screen.getByPlaceholderText("Заголовок")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Текст заметки")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("Вызывает onAdd с title и text", () => {
      const onAdd = vi.fn();
      render(<AddNoteForm onAdd={onAdd} />);

      fireEvent.change(screen.getByPlaceholderText("Заголовок"), {
        target: { value: "Test Title" },
      });
      fireEvent.change(screen.getByPlaceholderText("Текст заметки"), {
        target: { value: "Test Text" },
      });
      fireEvent.submit(screen.getByRole("button").closest("form"));

      expect(onAdd).toHaveBeenCalledWith({
        title: "Test Title",
        text: "Test Text",
      });
    });

    test("Очищает поля после сабмита", () => {
      render(<AddNoteForm onAdd={() => {}} />);

      const titleInput = screen.getByPlaceholderText("Заголовок");
      const textInput = screen.getByPlaceholderText("Текст заметки");

      fireEvent.change(titleInput, { target: { value: "A" } });
      fireEvent.change(textInput, { target: { value: "B" } });
      fireEvent.submit(titleInput.closest("form"));

      expect(titleInput.value).toBe("");
      expect(textInput.value).toBe("");
    });
  });

  describe("App", () => {
    test("Показывает загрузку при монтировании", () => {
      global.fetch = vi.fn(() => new Promise(() => {}));

      render(<App url="http://test" />);

      expect(screen.getByTestId("loading")).toHaveTextContent("Загрузка...");
    });

    test("Загружает и показывает заметки", async () => {
      const notes = [{ id: 1, title: "Loaded", text: "From API" }];

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(notes),
        })
      );

      render(<App url="http://test" />);

      await waitFor(() => {
        expect(screen.getByText("Loaded")).toBeInTheDocument();
        expect(screen.getByText("From API")).toBeInTheDocument();
      });
    });

    test("Добавление заметки через форму", async () => {
      const newNote = { id: 2, title: "New", text: "Note" };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([]),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(newNote),
        });

      render(<App url="http://test" />);

      await waitFor(() => {
        expect(screen.getByPlaceholderText("Заголовок")).toBeInTheDocument();
      });

      fireEvent.change(screen.getByPlaceholderText("Заголовок"), {
        target: { value: "New" },
      });
      fireEvent.change(screen.getByPlaceholderText("Текст заметки"), {
        target: { value: "Note" },
      });
      fireEvent.submit(screen.getByPlaceholderText("Заголовок").closest("form"));

      await waitFor(() => {
        expect(screen.getByText("New")).toBeInTheDocument();
      });
    });
  });
});
