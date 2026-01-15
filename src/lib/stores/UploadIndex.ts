// Компонент который упращает sterowanie `localStorage`. Вмесо того, чтобы
// вручную пытаться манипулировать localSTorage через localStorage.getItem и
// setItem, мы создаём writeable, который автоматически синхроинизирует массив и
// upload-index поле в localStorage. В теории это так же позволит в будущем (при
// необходимости) заменить localStorage на что-то более эффективное, такое как
// indexDB или как оно там называется.
import { browser } from "$app/environment";
import type { UploadedFile } from "$lib/types";
import { writable } from "svelte/store";

const KEY = "upload-index";

const load = (): UploadedFile[] => {
  if (!browser) {
    return [];
  }
  return JSON.parse(localStorage.getItem(KEY) ?? "[]");
};

export const upload_index = writable<UploadedFile[]>(load());

if (browser) {
  upload_index.subscribe((files) => {
    localStorage.setItem(KEY, JSON.stringify(files));
  });

  const sync = (event: StorageEvent) => {
    if (event.key != KEY) {
      return;
    }
    try {
      upload_index.set(event.newValue ? JSON.parse(event.newValue) : []);
    } catch {
      upload_index.set([]);
    }
  };
  // Event listener that handles the opposite state flow: storage was changed,
  // so should be the upload_index.
  window.addEventListener("storage", sync);
}
