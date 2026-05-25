import { createStart, createMiddleware } from "@tanstack/react-start";

// Load .env only on the server runtime, and support UTF-16 .env files.
// This avoids bundling Node-only modules into the browser build.
if (typeof window === "undefined") {
  try {
    const [{ readFileSync }, { parse }] = await Promise.all([
      import('node:fs'),
      import('dotenv'),
    ]);
    const raw = readFileSync(new URL('../.env', import.meta.url), 'utf16le').toString();
    const parsed = parse(raw);
    Object.assign(process.env, parsed);
  } catch {
    // ignore — if server env loading fails, the runtime will still continue.
  }
}

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));
