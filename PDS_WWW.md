## Frontend do API 0x0.st

### Strona główna (upload)

- Upon sending
  - record token
  - record size
  - record mime type
  - approximate expiry date (or record it when set explicitly)
- always send file with access token
- option to send encrypted data (say, put files into encrypted ZIP archive)
- Bunch upload via compressing to ZIP first
- Respect 512MiB limit
- Set options for uploads
  - expiry date
  - `-FSecret`
  - 0x0 provider

### Browsing

Sent file viewer (save to cookies/indexedDB) with preview, deletion, reupload?
(perhaps to extend expiry date)

Records of saved files should be stored via
[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

- Preview files that have appropriate mime types(ie. videos and images) and reasonable size.
- Deletion
- Reschedule deletion (can only be shortened?)

### Description/FAQ

- Copy 0x0's FAQ
- Provide a description for the page, its functionality etc.

### Credits

- 0x0.st
- ???

### Privacy policy

Copy 0x0's privacy policy
