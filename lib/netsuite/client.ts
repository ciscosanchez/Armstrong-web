import 'server-only';
import OAuth from 'oauth-1.0a';
import { createHmac } from 'crypto';

interface NetSuiteConfig {
  accountId: string;
  consumerKey: string;
  consumerSecret: string;
  tokenId: string;
  tokenSecret: string;
}

function getConfig(): NetSuiteConfig {
  const accountId = process.env.NETSUITE_ACCOUNT_ID;
  const consumerKey = process.env.NETSUITE_CONSUMER_KEY;
  const consumerSecret = process.env.NETSUITE_CONSUMER_SECRET;
  const tokenId = process.env.NETSUITE_TOKEN_ID;
  const tokenSecret = process.env.NETSUITE_TOKEN_SECRET;

  if (!accountId || !consumerKey || !consumerSecret || !tokenId || !tokenSecret) {
    throw new Error('NetSuite credentials not fully configured');
  }
  return { accountId, consumerKey, consumerSecret, tokenId, tokenSecret };
}

function buildOAuthClient(config: NetSuiteConfig): OAuth {
  return new OAuth({
    consumer: { key: config.consumerKey, secret: config.consumerSecret },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
      return createHmac('sha256', key).update(base_string).digest('base64');
    },
  });
}

/**
 * Make an authenticated request to the NetSuite REST API.
 *
 * NetSuite REST base URL:
 *   https://{accountId}.suitetalk.api.netsuite.com/services/rest/record/v1
 */
export async function netsuiteRequest<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const config = getConfig();
  const oauth = buildOAuthClient(config);

  // NetSuite account IDs use underscores in the REST URL
  const accountIdForUrl = config.accountId.toLowerCase().replace('_', '-');
  const baseUrl = `https://${accountIdForUrl}.suitetalk.api.netsuite.com/services/rest/record/v1`;
  const url = `${baseUrl}${path}`;

  const requestData = { url, method };
  const token = { key: config.tokenId, secret: config.tokenSecret };
  const authHeader = oauth.toHeader(oauth.authorize(requestData, token));

  const response = await fetch(url, {
    method,
    headers: {
      ...authHeader,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`NetSuite API error ${response.status}: ${errorText}`);
  }

  // POST returns 204 with Location header on record creation
  if (response.status === 204) {
    const location = response.headers.get('Location') ?? '';
    const id = location.split('/').pop() ?? '';
    return { id } as T;
  }

  return response.json() as Promise<T>;
}
