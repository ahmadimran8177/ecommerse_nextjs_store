import { StripeApiKey, DevUrl } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
  const url = `${DevUrl}${endpoint}`;
  let isLoading = true;
  let error = null;

  try {
    const response = await fetch(url, {
      method: "GET", // Set the method to "GET" by default
      headers: {
        Authorization: `Bearer ${StripeApiKey}`,
      },
    });

    if (!response.ok) {
      error = `Request failed with status ${response.status}`;
    } else {
      const data = await response.json();
      return { isLoading: false, data, error };
    }
  } catch (err) {
    error = `Failed to fetch data from ${url}: ${err.message}`;
  }

  isLoading = false;
  return { isLoading, data: null, error };
};

export const staticFetchDataFromApi = async (endpoint) => {
  const url = `${DevUrl}${endpoint}`;
  let isLoading = true;
  let error = null;

  try {
    const response = await fetch(
      url,
      {
        method: "GET", // Set the method to "GET" by default
        headers: {
          Authorization: `Bearer ${StripeApiKey}`,
        },
      },
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      error = `Request failed with status ${response.status}`;
    } else {
      const data = await response.json();
      return { isLoading: false, data, error };
    }
  } catch (err) {
    error = `Failed to fetch data from ${url}: ${err.message}`;
  }

  isLoading = false;
  return { isLoading, data: null, error };
};

export const serverFetchDataFromApi = async (endpoint) => {
  const url = `${DevUrl}${endpoint}`;
  let isLoading = true;
  let error = null;

  try {
    const response = await fetch(
      url,
      {
        method: "GET", // Set the method to "GET" by default
        headers: {
          Authorization: `Bearer ${StripeApiKey}`,
        },
      },
      { cache: "no-cache" }
    );

    if (!response.ok) {
      error = `Request failed with status ${response.status}`;
    } else {
      const data = await response.json();
      return { isLoading: false, data, error };
    }
  } catch (err) {
    error = `Failed to fetch data from ${url}: ${err.message}`;
  }

  isLoading = false;
  return { isLoading, data: null, error };
};

export const makePaymentRequest = async (endpoint, payload) => {
  const res = await fetch(`${DevUrl}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + StripeApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
