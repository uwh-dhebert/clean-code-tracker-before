// client/src/test/jsdom.test.ts
import { it, expect } from 'vitest';

it('has document defined', () => {
    expect(document).toBeDefined();
    expect(document.body).toBeDefined();
});