export const baseUrl = "https://job-tracker-365423.uc.r.appspot.com";

interface ApiOptions {
  url: string;
  getAccessTokenSilently: () => Promise<string>;
  includeBase?: boolean;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
}

export interface ApiResponse<DataType> {
  ok: boolean;
  data: DataType;
  status: number;
}

export const makeApiCall = async ({
  url,
  getAccessTokenSilently,
  includeBase = true,
  method,
  body
}: ApiOptions) => {
  const accessToken = await getAccessTokenSilently();

  const formattedUrl = includeBase ? `${baseUrl}${url}` : url;

  return fetch(formattedUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    method,
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      if (method === "DELETE") {
        return { ok: response.ok, status: response.status, data: null };
      }
      return response.json().then((data) => {
        return { ok: response.ok, status: response.status, data: data };
      });
    }
    // Bad Requests
    throw new Error("Something went wrong");
  });
};
