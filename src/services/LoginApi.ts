const API_URL = import.meta.env.VITE_URL_API;

export async function loginUser(data: { username: string; password: string }) {
  const params = new URLSearchParams();
  params.append("username", data.username);
  params.append("password", data.password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}