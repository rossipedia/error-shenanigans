/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type {
  AppLoadContext,
  EntryContext,
  HandleErrorFunction,
} from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';

const ABORT_DELAY = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext
) {
  const html = renderToString(
    <RemixServer
      context={remixContext}
      url={request.url}
      abortDelay={ABORT_DELAY}
    />
  );

  return new Response(`<!doctype html>${html}`, {
    status: responseStatusCode,
    headers: new Headers([...responseHeaders, ['Content-Type', 'text/html']]),
  });
}

export const handleError: HandleErrorFunction = (error) => {
  console.log(JSON.stringify({ message: '*** SERVER ERROR ***', error }));
};
