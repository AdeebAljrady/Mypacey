# قطعتي - متجر قطع غيار السيارات

تطبيق متجر إلكتروني حديث مبني بـ **Node.js + Express** و **Supabase** للنشر على منصة **Vercel**.

## المميزات

- **واجهة مستخدم حديثة** مع تصميم استجابي
- **نظام إدارة منتجات** كامل
- **سلة تسوق** متقدمة
- **نظام مستخدمين** مع تصنيفات (مستخدم عادي / بائع)
- **قاعدة بيانات قوية** مع Supabase (PostgreSQL)
- **API RESTful** سهلة الاستخدام
- **نشر سهل** على Vercel

## المتطلبات

- **Node.js** (الإصدار 16 أو أحدث)
- **npm** أو **yarn**
- حساب **Supabase**
- حساب **Vercel** (للنشر)

## التثبيت المحلي

### 1. استنساخ المستودع

```bash
git clone <your-repo-url>
cd mypiece_store_nodejs
```

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env` وأضف بيانات Supabase الخاصة بك:

```bash
cp .env.example .env
```

ثم عدّل الملف وأضف:

```env
PORT=3000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SESSION_SECRET=your_secret_key_here
```

### 4. تشغيل الخادم

**في بيئة التطوير:**

```bash
npm run dev
```

الخادم سيعمل على `http://localhost:3000`

**في بيئة الإنتاج:**

```bash
npm run build
npm start
```

## إعداد Supabase

### 1. إنشاء مشروع جديد

- اذهب إلى [Supabase](https://supabase.com)
- أنشئ مشروعاً جديداً
- احفظ بيانات الاتصال

### 2. تنفيذ Schema

من لوحة تحكم Supabase:

1. اذهب إلى `SQL Editor`
2. أنشئ query جديد
3. انسخ محتويات ملف `supabase_schema.sql` (المرفق)
4. نفّذ الاستعلام

### 3. الحصول على مفاتيح API

من `Project Settings > API`:

- انسخ `Project URL` إلى `SUPABASE_URL`
- انسخ `anon public` key إلى `SUPABASE_ANON_KEY`
- انسخ `service_role` key إلى `SUPABASE_SERVICE_ROLE_KEY`

## النشر على Vercel

### 1. رفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. ربط المشروع بـ Vercel

1. اذهب إلى [Vercel](https://vercel.com)
2. انقر على `Add New Project`
3. اختر مستودع GitHub الخاص بك
4. انقر على `Import`

### 3. إضافة متغيرات البيئة

في صفحة إعدادات المشروع على Vercel:

1. اذهب إلى `Environment Variables`
2. أضف المتغيرات التالية:

| المتغير | القيمة |
|---------|--------|
| `SUPABASE_URL` | رابط Supabase الخاص بك |
| `SUPABASE_ANON_KEY` | مفتاح API العام |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح الخدمة |
| `SESSION_SECRET` | مفتاح سري قوي |

### 4. النشر

انقر على `Deploy` وسيتم نشر المشروع تلقائياً.

## هيكلة المشروع

```
mypiece_store_nodejs/
├── src/
│   ├── config/
│   │   └── supabase.ts          # إعدادات Supabase
│   ├── routes/                  # مسارات API
│   ├── middleware/              # وسيط معالجة الطلبات
│   ├── utils/                   # دوال مساعدة
│   └── server.ts               # الخادم الرئيسي
├── public/
│   ├── css/                     # ملفات التنسيق
│   ├── js/                      # ملفات JavaScript
│   ├── img/                     # الصور
│   ├── index.html              # الصفحة الرئيسية
│   └── login.html              # صفحة تسجيل الدخول
├── api/                         # وظائف Vercel الخلفية (اختياري)
├── package.json
├── tsconfig.json
├── vercel.json
├── .env.example
└── README.md
```

## API Endpoints

### المنتجات

- `GET /api/products` - الحصول على جميع المنتجات
- `POST /api/products` - إضافة منتج جديد
- `DELETE /api/products/:id` - حذف منتج

### المستخدمون

- `GET /api/users` - الحصول على المستخدمين العاديين
- `GET /api/sellers` - الحصول على البائعين

## الأخطاء الشائعة والحلول

### خطأ: "Missing Supabase configuration"

**الحل:** تأكد من أن متغيرات البيئة صحيحة في ملف `.env`

### خطأ: "Connection refused"

**الحل:** تأكد من أن الخادم يعمل بشكل صحيح باستخدام `npm run dev`

### خطأ: "CORS error"

**الحل:** تأكد من أن CORS مفعّل في إعدادات الخادم

## المساهمة

نرحب بالمساهمات! يرجى فتح issue أو pull request.

## الترخيص

هذا المشروع مرخص تحت MIT License.

## الدعم

للمساعدة والدعم، يرجى التواصل عبر البريد الإلكتروني أو فتح issue في المستودع.
