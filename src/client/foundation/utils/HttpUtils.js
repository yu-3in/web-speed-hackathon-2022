export const jsonFetcher = async (/** @type {string} */ url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch: ", error);
    throw error;
  }
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  try {
    const response = await fetch(url, {
      headers: { "x-app-userid": userId },
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch with authorization: ", error);
    throw error;
  }
};
