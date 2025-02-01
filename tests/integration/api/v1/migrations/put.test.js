describe("PUT /api/v1/migrations", () => {
  test("Running migrations using put", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method: "PUT",
    });
    expect(response.status).toBe(405);
    const responseBody = await response.json();

    expect(responseBody).toEqual({
      name: "MethodNotAllowedError",
      message: "Método não permitio para esse endpoint.",
      action: "Verifique se o método HTTP enviado é válido para este endpoint",
      status_code: 405,
    });
  });
});
