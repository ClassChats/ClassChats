/**
 * Contains types used in routes files.
 */

import type { GoodResponse, BadResponse } from './responses';

export interface ResponseGroup {
    good: { [key: string]: GoodResponse };
    bad: { [key: string]: BadResponse };
}
