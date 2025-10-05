const API_URL = import.meta.env.VITE_URL_API;

// esto es para lo del forgot password
export async function resetPassword(data: { token: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: data.token,
      new_password: data.password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || `Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

