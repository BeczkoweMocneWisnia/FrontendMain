import { getAccessToken, clearTokens, getRefreshToken, saveTokens } from './tokenService';

export const apiRequest = async (url, options = {}) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const response = await fetch(url, options);

  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      return await fetch(url, options);
    } else {
      clearTokens();
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }
  }

  return response;
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch('http://localhost:8000/auth/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const { refresh, access } = data;
      saveTokens(refresh, access);
      return access;
    } else {
      clearTokens();
      return null;
    }
  } catch (err) {
    clearTokens();
    return null;
  }
};
