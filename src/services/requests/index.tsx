export const makeApiCall = async (
  getAccessTokenSilently: () => Promise<string>,
  customUrl?: string
) => {
  const accessToken = await getAccessTokenSilently();
  const url = customUrl || "http://localhost:4000/jobs";

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return { ok: response.ok, status: response.status, data: data };
      });
    }
    // Bad Requests
    throw new Error("Something went wrong");
  });
};
