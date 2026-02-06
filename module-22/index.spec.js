const { fetchWithError, fetchAll, fetchSafe } = require("./index.js");

describe("Модуль 22: Продвинутый Fetch", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("fetchWithError", () => {
    test("Возвращает JSON при успешном запросе", async () => {
      const mockData = { id: 1, name: "Test" };
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      });

      const result = await fetchWithError("https://api.test/data");

      expect(result).toEqual(mockData);
    });

    test("Выбрасывает ошибку при 404", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      });

      await expect(fetchWithError("https://api.test/notfound")).rejects.toThrow(
        "HTTP 404"
      );
    });

    test("Выбрасывает ошибку при 500", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      });

      await expect(fetchWithError("https://api.test/error")).rejects.toThrow(
        "HTTP 500"
      );
    });
  });

  describe("fetchAll", () => {
    test("Загружает несколько URL параллельно", async () => {
      const mockData1 = { id: 1 };
      const mockData2 = { id: 2 };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData1),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData2),
        });

      const result = await fetchAll([
        "https://api.test/1",
        "https://api.test/2",
      ]);

      expect(result).toEqual([mockData1, mockData2]);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    test("Выбрасывает ошибку если один из запросов упал", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ id: 1 }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
        });

      await expect(
        fetchAll(["https://api.test/1", "https://api.test/notfound"])
      ).rejects.toThrow();
    });

    test("Возвращает пустой массив для пустого входа", async () => {
      const result = await fetchAll([]);
      expect(result).toEqual([]);
    });
  });

  describe("fetchSafe", () => {
    test("Разделяет успешные и неудачные запросы", async () => {
      const mockData = { id: 1, name: "Test" };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
        });

      const result = await fetchSafe([
        "https://api.test/success",
        "https://api.test/fail",
      ]);

      expect(result.succeeded).toEqual([mockData]);
      expect(result.failed).toHaveLength(1);
      expect(result.failed[0].url).toBe("https://api.test/fail");
      expect(result.failed[0].error).toContain("404");
    });

    test("Все успешные — failed пустой", async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ id: 1 }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ id: 2 }),
        });

      const result = await fetchSafe([
        "https://api.test/1",
        "https://api.test/2",
      ]);

      expect(result.succeeded).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
    });

    test("Все неудачные — succeeded пустой", async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false, status: 404 })
        .mockResolvedValueOnce({ ok: false, status: 500 });

      const result = await fetchSafe([
        "https://api.test/fail1",
        "https://api.test/fail2",
      ]);

      expect(result.succeeded).toHaveLength(0);
      expect(result.failed).toHaveLength(2);
    });
  });
});
