const CACHE_NAME = 'litklub-v1';
const ASSETS = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  // изображения
  'изображения/заставка.jpg',
  'изображения/клуб.webp',
  'изображения/Sayori.webp',
  'изображения/первая сцена сайори.jpg',
  'изображения/вторая сцена сайори.webp',
  'изображения/признание в любви от сайори.jpg',
  'изображения/мёртвая сайори.jpg',
  'изображения/комната сайори.jpg',
  'изображения/нацуки.png',
  'изображения/Monika_DDLC.png',
  'изображения/Yuri.webp',
  'изображения/Городской район, где живут главный герой и Сайори.webp',
  'изображения/Фон для поэтической мини-игры.webp',
  'изображения/Школьный коридор.webp',
  'изображения/комната фестеваля.webp',
  'изображения/комната главного героя.webp',
  'изображения/сайори в ночнушке с верёвкой.png',
  'изображения/Шкаф в классе, где Нацуки хранит свою мангу.webp',
  'изображения/Укромная тихая лестница, где любит сидеть и читать Юри..webp',
  'изображения/Предложить помочь Юри с подготовкой к фестивалю..webp',
  'изображения/Предложить помочь Нацуки с подготовкой к фестивалю..webp',
  'изображения/Написать стихотворение для Юри..webp',
  'изображения/Написать стихотворение для Нацуки..webp',
  'изображения/Написать второе стихотворение для Юри..webp',
  'изображения/Написать второе стихотворение для Нацуки..webp',
  // музыка
  'музыка/DDLC_-_Doki_Doki_(SkySound.cc).mp3',
  'музыка/фоновая музыка.ogg',
  'музыка/признание сайори.ogg',
  'музыка/смерть сайори.ogg',
  // видео
  'видео/заставка видео.mp4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        return cached || fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
