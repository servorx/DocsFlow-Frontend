const API_URL = import.meta.env.VITE_URL_API;

// esto es para lo del forgot password
export async function forgotPassword(data: { email: string }) {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}