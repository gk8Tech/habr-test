export interface HttpRequestOptions<T = unknown> {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: T;
    params?: Record<string, string | number | boolean>;
    headers?: HeadersInit;
}

export async function httpClient<T = unknown, B = unknown>(
    endpoint: string,
    options: HttpRequestOptions<B> = {}
): Promise<T | null> {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = new URL(`${BASE_URL}/${endpoint}`);

    if (options.params) {
        Object.entries(options.params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const config: RequestInit = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url.toString(), config);

        if (!response.ok) {
            console.error(`Ошибка запроса: ${response.status} ${response.statusText}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка сети:", (error as Error).message);
        return null;
    }
}
