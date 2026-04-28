# Security Specification - AI Farmer Assistant

## Data Invariants
1. A **User** profile must match the `request.auth.uid`. No user can create or modify another's profile.
2. A **Scan** result must be linked to the `userId` of the authenticated requester.
3. A **Chat** message must be linked to the `userId` of the authenticated requester.
4. All timestamps (`createdAt`, `timestamp`) must be validated against `request.time`.
5. String inputs (names, descriptions) must have maximum length enforcements to prevent resource exhaustion.

## The "Dirty Dozen" Payloads (Attacker Strategy)
1. **Identity Theft**: Attempt to create a user profile with a different `uid` than the authenticated session.
2. **Profile Hijack**: Authenticated User A tries to update User B's land size.
3. **Ghost Scan**: Attempt to create a scan record with a fake `userId`.
4. **Timestamp Spoofing**: Attempt to set a `createdAt` date in the past or future.
5. **Shadow Fields**: Adding an `isAdmin: true` field to a user profile update.
6. **Large Document Attack**: Attempt to save a 500KB string in a chat message field.
7. **Orphaned Writes**: Creating a scan record without a valid user ID format.
8. **PII Scraping**: Attempting to list all users in the system without ownership.
9. **Chat Injection**: User A attempting to read User B's chat history.
10. **ID Poisoning**: Using a 2KB junk string as a document ID for a scan.
11. **Status Shortcut**: (N/A for this simple MVP, but would be skipping payment steps if existed).
12. **Self-Promotion**: Authenticated user trying to update their own `role` field.

## Test Runner (Logic Check)
These will be verified in `firestore.rules.test.ts` (draft logic).
- `auth = null` -> all writes DENIED.
- `auth.uid = 'user123'` -> `scans/scan1` with `userId: 'user456'` -> CREATE DENIED.
- `auth.uid = 'user123'` -> `users/user123` with `isAdmin: true` -> UPDATE DENIED.
- `auth.uid = 'user123'` -> `users/user123` with `name.size() > 100` -> CREATE DENIED.
