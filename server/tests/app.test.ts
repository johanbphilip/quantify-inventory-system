import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { createApp } from '../src/app.js';

describe('server application', () => {
  it('exposes a health response without starting a listener', async () => {
    const response = await request(createApp()).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
