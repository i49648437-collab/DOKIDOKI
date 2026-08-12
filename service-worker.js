const CACHE_NAME = 'litclub-v3';
const CACHE_NAME_RUNTIME = 'litclub-runtime-v3';

// Все основные ресурсы для оффлайн-работы
const ASSETS = [
  // === Основные страницы ===
  './',
  './index.html',
  './manifest.json',

  // === Видео ===
  'видео/заставка видео.mp4',

  // === Изображения ===
  'изображения/заставка.jpg',
  'изображения/DDLC сквозь призму аутизма и философии.jpg',
  'изображения/Главное меню во втором Акте.jpg',
  'изображения/фон главного меню акт 4.webp',

  // Акт 3 — комната Моники
  'изображения/1 на 1 с Моникой.webp',
  'изображения/удаление моники.webp',

  // Письма и концовки
  'изображения/прощальное письмо моники.webp',
  'изображения/Благодарственное письмо от Дэна Салвато для хорошей концовки.jpg',
  'изображения/счастливые девушки.webp',

  // Клуб и локации
  'изображения/клуб.webp',
  'изображения/комната клуба с постером повешеной сайори.webp',
  'изображения/Фон для поэтической мини-игры.webp',
  'изображения/Школьный коридор.webp',
  'изображения/комната фестеваля.webp',
  'изображения/комната главного героя.webp',
  'изображения/Городской район, где живут главный герой и Сайори.webp',

  // Сайори
  'изображения/Sayori.webp',
  'изображения/первая сцена сайори.jpg',
  'изображения/вторая сцена сайори.webp',
  'изображения/признание в любви от сайори.jpg',
  'изображения/мёртвая сайори.jpg',
  'изображения/комната сайори.jpg',
  'изображения/сайори в ночнушке с верёвкой.png',

  // Нацуки
  'изображения/нацуки.png',
  'изображения/Шкаф в классе, где Нацуки хранит свою мангу.webp',
  'изображения/Предложить помочь Нацуки с подготовкой к фестивалю..webp',
  'изображения/Написать стихотворение для Нацуки..webp',
  'изображения/Написать второе стихотворение для Нацуки..webp',
  'изображения/Нацуки блюёт.webp',
  'изображения/Нацуки со сломоной шеей.png',

  // Моника
  'изображения/Monika_DDLC.png',

  // Юри
  'изображения/Yuri.webp',
  'изображения/Укромная тихая лестница, где любит сидеть и читать Юри..webp',
  'изображения/Предложить помочь Юри с подготовкой к фестивалю..webp',
  'изображения/Написать стихотворение для Юри..webp',
  'изображения/Написать второе стихотворение для Юри..webp',
  'изображения/Юри с ножиком.png',
  'изображения/юри с реалистичными глазами.webp',
  'изображения/Конец Юри сцена где пронтагонист прововит все выходные у тела Юри.png',

  // Служебное
  'изображения/Синий экран смерти от моники.webp',

  // === Музыка ===
  'музыка/DDLC_-_Doki_Doki_(SkySound.cc).mp3',
  'музыка/фоновая музыка.ogg',
  'музыка/glitch.ogg',
  'музыка/Your Reality.mp3',
  'музыка/признание сайори.ogg',
  'музыка/смерть сайори.ogg',
  'музыка/Тема обмена стихами.ogg',
  'музыка/Звуковое сопровождение мини-игры.ogg',
  'музыка/Тема стиха Сайори.ogg',
  'музыка/Тема стиха Нацуки.ogg',
  'музыка/Тема стиха Юри.ogg',
  'музыка/Тема стиха Моники.ogg',
  'музыка/Рядовой саундтрек (коридор).ogg',
  'музыка/Акт 2 (шанс 164), Акт 3 Тема призрачного меню и мини-игры в третьем акте.ogg',
  'музыка/Акт 2 Тема третьего стиха Юри (mdpnfbo,jrfp).ogg',
  'музыка/Сцена признания Юри протагонисту.ogg',
  'музыка/Отмотка событий после встречи с Юри, изрезавшей свою руку.ogg',
  'музыка/Выходные наедине с телом Юри.ogg',
  'музыка/Имитация вида из глаз повешенной Сайори (шанс 33% после закрытия второго секретного стиха).ogg',
  'музыка/Главная тема третьего акта.ogg',
  'музыка/Звуковой эффект после выбора глитч-слова.ogg',
  'музыка/Сцена после удаления «monika.chr».ogg',
  'музыка/Голосовое обращение Моники к игроку перед титрами.ogg',
  'музыка/Благодарение Сайори за удаление Моники.ogg',
  'музыка/Фоновый саундтрек в случае удаления «sayori.chr» или «monika.chr» перед началом игры.ogg'
];

// ================= INSTALL =================
// Пофайловое кеширование: один отсутствующий файл не ломает всё
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Кеширую ' + ASSETS.length + ' ресурсов...');
      const promises = ASSETS.map(url =>
        cache.add(url).catch(err => {
          console.warn('[SW] Не удалось закешировать:', url, err.message);
        })
      );
      return Promise.all(promises).then(() => {
        console.log('[SW] Установка завершена');
      });
    })
  );
  self.skipWaiting();
});

// ================= FETCH =================
self.addEventListener('fetch', event => {
  const request = event.request;

  // Не перехватываем не-GET запросы (POST и т.д.)
  if (request.method !== 'GET') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const runtimeCache = await caches.open(CACHE_NAME_RUNTIME);

    // === HTML-страницы: network-first ===
    // Обновления игры приходят сразу, а оффлайн работает через кеш
    if (request.mode === 'navigate' || request.destination === 'document') {
      try {
        const fresh = await fetch(request);
        runtimeCache.put(request, fresh.clone());
        return fresh;
      } catch (err) {
        const cached = await caches.match(request) || await caches.match('./index.html');
        if (cached) return cached;
        return new Response('<h1>Литературный клуб — оффлайн</h1><p>Нет соединения, но игра должна работать.</p>', {
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
    }

    // === Статика (картинки, музыка, видео): cache-first ===
    const cached = await cache.match(request) || await runtimeCache.match(request);
    if (cached) return cached;

    try {
      const fresh = await fetch(request);
      // Кешируем успешные ответы для будущих запусков
      if (fresh && fresh.status === 200) {
        runtimeCache.put(request, fresh.clone());
      }
      return fresh;
    } catch (err) {
      // Fallback: картинка не найдена — отдаём заставку
      if (request.destination === 'image') {
        const fallback = await cache.match('изображения/заставка.jpg');
        if (fallback) return fallback;
      }
      // Прочее (музыка, видео) — просто 503
      return new Response('', { status: 503, statusText: 'Offline' });
    }
  })());
});

// ================= ACTIVATE =================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names
          .filter(name => name !== CACHE_NAME && name !== CACHE_NAME_RUNTIME)
          .map(name => {
            console.log('[SW] Удаляю старый кеш:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
  console.log('[SW] v3 активен и управляет всеми клиентами');
});
