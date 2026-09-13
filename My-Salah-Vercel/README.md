# My Salah

Telefon va kompyuter uchun oq/to‘q-ko‘k uslubdagi installable PWA. Vercel’da ishlashga tayyor.

## Imkoniyatlar

- Toshkent namoz vaqtlari va keyingi namoz sanog‘i
- O‘qildi/o‘qilmadi belgisi, oylik qazo hisobi va 7 kunlik hisobot
- Kunlik Qur’on oyatlari: mag‘firat, ota-ona, Alloh roziligi, halol rizq va baraka
- Mushaf uslubidagi arabcha matn, qisqa ma’no va tafsir
- Har namoz davrida almashadigan 5 ta hadis
- 15 daqiqalik arab tili darsi va lug‘at
- Sana/soatli ish eslatmalari
- Rasmiy viza yangiliklari lentasi, o‘qildi belgisi va mobil swipe
- Zikr hisoblagichi va kunlik muhasaba
- Offline ishlash va telefon bosh ekraniga o‘rnatish

## Vercel’ga joylash

1. Papkani GitHub repository’ga yuklang.
2. Vercel’da **Add New → Project** ni bosing va repository’ni tanlang.
3. Framework Preset sifatida **Other** ni qoldiring. Build Command va Output Directory’ni bo‘sh qoldiring.
4. Deploy qiling. Sayt HTTPS’da ochilgach, menyudagi **Bildirishnomalarni yoqish** tugmasini bosing.

## Muhim texnik izohlar

- Namoz vaqtlari AlAdhan’dan olinadi; internet bo‘lmasa zaxira vaqtlari ko‘rsatiladi. Mahalliy masjid jadvali bilan bir necha daqiqa farq bo‘lishi mumkin.
- Ro‘yxatdan o‘tish yo‘q. Har foydalanuvchining ma’lumoti o‘z qurilmasida saqlanadi; 10 kishi bir-birining ma’lumotini ko‘rmaydi.
- Hozirgi bildirishnomalar PWA ochiq yoki fonda faol bo‘lganda ishlaydi. iPhone’da saytni bosh ekranga o‘rnatish va bildirishnomaga ruxsat berish kerak. Sayt butunlay yopiq paytda ham kafolatli push uchun Supabase + VAPID server konfiguratsiyasi kerak bo‘ladi.
- Viza yangiliklari rasmiy RSS manbalaridan olinadi. Mijozga yuborishdan oldin “Manbani ochish” orqali tekshiring.
- Qur’on tarjimasi va tafsirlar qisqa mazmuniy bayondir. Diniy hukm yoki fatvo uchun malakali olimga murojaat qiling.

## Lokal ko‘rish

```bash
npm start
```

So‘ng `http://localhost:4173` manzilini oching.
