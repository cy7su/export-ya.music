# Как перенести музыку из Яндекс Музыки

Экспорт своего плейлиста из Яндекс Музыки в текстовый файл.
Скрипт работает в любым плейлистах.

## Экспорт музыки ВК в текстовый файл

<details>
<summary><b>Скрипт для экспорта музыки из Яндекс Музыки</b></summary>

> **[Скачать скрипт](https://github.com/cy7su/export-ya.music/archive/refs/heads/main.zip)** | **[Посмотреть код](https://raw.githubusercontent.com/cy7su/export-ya.music/refs/heads/main/yandex.music.js)**

```javascript
(async function () {
  const usernameElement = document.querySelector(
    ".PageHeaderPlaylistMeta_root__9SHZ0 span[title]"
  );
  const username = usernameElement
    ? usernameElement.getAttribute("title")
    : "playlist";

  const seenLabels = new Set();
  let maxIndex = -1;
  let noNewAttempts = 0;
  const allTracks = [];

  const container = document.querySelector(
    "div.VirtualScroll_scroller_withFooter__ntDaU.VirtualScroll_scroller_withForceScroll__w7q1L"
  );

  let initialElements = container.querySelectorAll(
    '[data-index] [class*="CommonTrack_root__i6shE"]'
  );
  initialElements.forEach((el) => {
    const dataIndex =
      parseInt(el.closest("[data-index]").getAttribute("data-index")) || 0;
    if (dataIndex > maxIndex) {
      const label = el.getAttribute("aria-label");
      if (label && !seenLabels.has(label)) {
        seenLabels.add(label);
        console.log(label);
        allTracks.push(label);
      }
      maxIndex = Math.max(maxIndex, dataIndex);
    }
  });

  while (true) {
    const previousMaxIndex = maxIndex;
    container.scrollBy(0, 500);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const trackElements = container.querySelectorAll(
      '[data-index] [class*="CommonTrack_root__i6shE"]'
    );
    const newLabels = [];
    trackElements.forEach((el) => {
      const dataIndex =
        parseInt(el.closest("[data-index]").getAttribute("data-index")) || 0;
      if (dataIndex > maxIndex) {
        const label = el.getAttribute("aria-label");
        if (label && !seenLabels.has(label)) {
          seenLabels.add(label);
          newLabels.push(label);
          allTracks.push(label);
        }
        maxIndex = Math.max(maxIndex, dataIndex);
      }
    });

    if (newLabels.length > 0) {
      newLabels.forEach((label) => console.log(label));
      noNewAttempts = 0;
    } else {
      noNewAttempts++;
      if (noNewAttempts >= 5) break;
    }
  }

  container.scrollTo(0, 0);
  console.log(`Всего треков: ${seenLabels.size}`);

  const content = allTracks.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${username}.txt`;
  a.click();
  URL.revokeObjectURL(url);
})();
```

> **Как использовать:**
>
> 1. Откройте плейлист в Яндекс Музыке
> 2. Нажмите `F12` → перейдите на вкладку Console
> 3. Вставьте этот код и нажмите Enter
> 4. Скрипт автоматически сохранит все треки в файл

</details>
Открыть страницу с музыкой, нажать `F12`.
<img width="1371" height="952" alt="{2C65E6F1-3E15-4753-9822-BD7718F1C45C}" src="https://github.com/user-attachments/assets/d5f50204-3952-457b-8e70-3a555c2e051b" />
Скопировать скрипт со страницы

Вставить его в консоль на странице плейлиста, и нажать `Enter`.
<img width="1380" height="957" alt="{0B0A0F93-A00C-4A6F-82BA-2F4D2F7919FA}" src="https://github.com/user-attachments/assets/4ec1a655-b77d-4703-a9c4-77f7ae0489d0" />
