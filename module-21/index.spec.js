const {
  getPost,
  getPostComments,
  createPost,
  getUserPosts,
  BASE_URL,
} = require("./index.js");

describe("Модуль 21: HTTP-запросы с Fetch", () => {
  // Мокаем fetch для тестов
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getPost", () => {
    test("Делает GET-запрос на /posts/{id}", async () => {
      const mockPost = { userId: 1, id: 1, title: "Test", body: "Content" };
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockPost),
      });

      const result = await getPost(1);

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/posts/1`);
      expect(result).toEqual(mockPost);
    });

    test("Работает с разными ID", async () => {
      const mockPost = { userId: 2, id: 5, title: "Another", body: "Text" };
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockPost),
      });

      const result = await getPost(5);

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/posts/5`);
      expect(result.id).toBe(5);
    });
  });

  describe("getPostComments", () => {
    test("Делает GET-запрос на /posts/{id}/comments", async () => {
      const mockComments = [
        { postId: 1, id: 1, name: "Test", email: "test@test.com", body: "Comment" },
        { postId: 1, id: 2, name: "Test2", email: "test2@test.com", body: "Comment2" },
      ];
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockComments),
      });

      const result = await getPostComments(1);

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/posts/1/comments`);
      expect(result).toEqual(mockComments);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("createPost", () => {
    test("Делает POST-запрос на /posts с правильными параметрами", async () => {
      const newPost = { id: 101, title: "New Post", body: "Content", userId: 1 };
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(newPost),
      });

      const result = await createPost("New Post", "Content", 1);

      expect(mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/posts`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ title: "New Post", body: "Content", userId: 1 }),
        })
      );
      expect(result).toEqual(newPost);
    });

    test("Возвращает созданный пост с id", async () => {
      const newPost = { id: 101, title: "Title", body: "Body", userId: 2 };
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(newPost),
      });

      const result = await createPost("Title", "Body", 2);

      expect(result.id).toBe(101);
      expect(result.title).toBe("Title");
    });
  });

  describe("getUserPosts", () => {
    test("Делает GET-запрос на /users/{userId}/posts", async () => {
      const mockPosts = [
        { userId: 1, id: 1, title: "Post 1", body: "..." },
        { userId: 1, id: 2, title: "Post 2", body: "..." },
      ];
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockPosts),
      });

      const result = await getUserPosts(1);

      expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/users/1/posts`);
      expect(result).toEqual(mockPosts);
      expect(Array.isArray(result)).toBe(true);
    });

    test("Возвращает массив постов пользователя", async () => {
      const mockPosts = [
        { userId: 3, id: 10, title: "User 3 post", body: "..." },
      ];
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(mockPosts),
      });

      const result = await getUserPosts(3);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].userId).toBe(3);
    });
  });
});
