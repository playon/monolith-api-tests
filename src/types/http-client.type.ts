import { APIResponse } from '@playwright/test';

export type TApiResponse<T> = APIResponse & { data: T };

export type TRequestOptions = {
  /**
   * Methods like
   * [apiRequestContext.get(url[, options])](https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-get)
   * take the base URL into consideration by using the
   * [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL.
   * Examples:
   * - baseURL: `http://localhost:3000` and sending request to `/bar.html` results in `http://localhost:3000/bar.html`
   * - baseURL: `http://localhost:3000/foo/` and sending request to `./bar.html` results in
   *   `http://localhost:3000/foo/bar.html`
   * - baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in
   *   `http://localhost:3000/bar.html`
   */
  baseURL?: string;

  /**
   * Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status
   * codes.
   */
  failOnStatusCode?: boolean;

  /**
   * Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not
   * retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.
   */
  maxRetries?: number;

  /**
   * Query parameters to be sent with the URL.
   */
  params?: { [key: string]: string | number | boolean };

  /**
   * TLS Client Authentication allows the server to request a client certificate and verify it.
   *
   * **Details**
   *
   * An array of client certificates to be used. Each certificate object must have both `certPath` and `keyPath` or a
   * single `pfxPath` to load the client certificate. Optionally, `passphrase` property should be provided if the
   * certficiate is encrypted. The `origin` property should be provided with an exact match to the request origin that
   * the certificate is valid for.
   *
   * **NOTE** Using Client Certificates in combination with Proxy Servers is not supported.
   *
   * **NOTE** When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it
   * work by replacing `localhost` with `local.playwright`.
   */
  clientCertificates?: Array<{
    /**
     * Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
     */
    origin: string;

    /**
     * Path to the file with the certificate in PEM format.
     */
    certPath?: string;

    /**
     * Path to the file with the private key in PEM format.
     */
    keyPath?: string;

    /**
     * Path to the PFX or PKCS12 encoded private key and certificate chain.
     */
    pfxPath?: string;

    /**
     * Passphrase for the private key (PEM or PFX).
     */
    passphrase?: string;
  }>;

  /**
   * An object containing additional HTTP headers to be sent with every request. Defaults to none.
   */
  extraHTTPHeaders?: { [key: string]: string };

  /**
   * Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no
   * origin is specified, the username and password are sent to any servers upon unauthorized responses.
   */
  httpCredentials?: {
    username: string;

    password: string;

    /**
     * Restrain sending http credentials on specific origin (scheme://host:port).
     */
    origin?: string;

    /**
     * This option only applies to the requests sent from corresponding {@link APIRequestContext} and does not affect
     * requests sent from the browser. `'always'` - `Authorization` header with basic authentication credentials will be
     * sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response
     * with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.
     */
    send?: 'unauthorized' | 'always';
  };

  /**
   * Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
   */
  ignoreHTTPSErrors?: boolean;

  /**
   * Network proxy settings.
   */
  proxy?: {
    /**
     * Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example `http://myproxy.com:3128` or
     * `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
     */
    server: string;

    /**
     * Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
     */
    bypass?: string;

    /**
     * Optional username to use if HTTP proxy requires authentication.
     */
    username?: string;

    /**
     * Optional password to use if HTTP proxy requires authentication.
     */
    password?: string;
  };

  /**
   * Populates context with given storage state. This option can be used to initialize context with logged-in
   * information obtained via
   * [browserContext.storageState([options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state)
   * or
   * [apiRequestContext.storageState([options])](https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-storage-state).
   * Either a path to the file with saved storage, or the value returned by one of
   * [browserContext.storageState([options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state)
   * or
   * [apiRequestContext.storageState([options])](https://playwright.dev/docs/api/class-apirequestcontext#api-request-context-storage-state)
   * methods.
   */
  storageState?:
    | string
    | {
        cookies: Array<{
          name: string;

          value: string;

          domain: string;

          path: string;

          /**
           * Unix time in seconds.
           */
          expires: number;

          httpOnly: boolean;

          secure: boolean;

          sameSite: 'Strict' | 'Lax' | 'None';
        }>;

        origins: Array<{
          origin: string;

          localStorage: Array<{
            name: string;

            value: string;
          }>;
        }>;
      };

  /**
   * Maximum time in milliseconds to wait for the response. Defaults to `30000` (30 seconds). Pass `0` to disable
   * timeout.
   */
  timeout?: number;

  /**
   * Specific user agent to use in this context.
   */
  userAgent?: string;
};
