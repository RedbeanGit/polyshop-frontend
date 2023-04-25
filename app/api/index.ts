const GATEWAY_URL = process.env["GATEWAY_API"] || "http://localhost:8080";

enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface QueryParams {
  [key: string]: string | number | boolean;
}

export interface ApiResponse<T> {
  data?: T;
  status: number;
  error?: string;
}

export async function makeRequest<T>(
  route: string,
  method: HTTP_METHODS,
  body?: any,
  baseUrl?: string
): Promise<ApiResponse<T>> {
  baseUrl = baseUrl || GATEWAY_URL;

  console.debug(
    `Making ${method} request to ${baseUrl}${route} with body ${body}...`
  );

  return fetch(`${baseUrl}${route}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json().then((data) => {
          return {
            data,
            status: response.status,
          } as ApiResponse<T>;
        });
      } else {
        return response.json().then((error) => {
          return {
            error,
            status: response.status,
          } as ApiResponse<T>;
        });
      }
    })
    .catch((error) => {
      return {
        error,
        status: -1,
      } as ApiResponse<T>;
    });
}

export async function makeGetRequest<T>(
  route: string,
  queryParams?: QueryParams,
  baseUrl?: string
) {
  if (queryParams) {
    const query = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");
    route = `${route}?${query}`;
  }
  return makeRequest<T>(route, HTTP_METHODS.GET, undefined, baseUrl);
}

export async function makePostRequest<T>(
  route: string,
  body: any,
  baseUrl?: string
) {
  return makeRequest<T>(route, HTTP_METHODS.POST, body, baseUrl);
}

export async function makePutRequest<T>(
  route: string,
  body: any,
  baseUrl?: string
) {
  return makeRequest<T>(route, HTTP_METHODS.PUT, body, baseUrl);
}

export async function makePatchRequest<T>(
  route: string,
  body: any,
  baseUrl?: string
) {
  return makeRequest<T>(route, HTTP_METHODS.PATCH, body, baseUrl);
}

export async function makeDeleteRequest<T>(
  route: string,
  body: any,
  baseUrl?: string
) {
  return makeRequest<T>(route, HTTP_METHODS.DELETE, body, baseUrl);
}
