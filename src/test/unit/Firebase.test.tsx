import { expect, test } from 'vitest';
import { db, analytics } from '../../firebase';
import { isSupported } from 'firebase/analytics';

test('firebase initialization', async () => {
    expect(db).toBeDefined();
    const supported = await isSupported();
    if (supported) {
        expect(analytics).toBeDefined();
    } else {
        expect(analytics).toBeUndefined();
    }
});
