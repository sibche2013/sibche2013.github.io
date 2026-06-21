# 🌌 Professional Projects Dashboard | داشبورد حرفه‌ای و هوشمند مدیریت پروژه‌ها

<p align="center">
  <a target="_blank" href="https://demo.aminarjmand.com/">
    <img src="https://img.shields.io/badge/Live_Demo-⚡_Launch_Dashboard-blue?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo" />
  </a>
  &nbsp;&nbsp;
  <a target="_blank" href="https://demo.aminarjmand.com/">
    <img src="https://img.shields.io/badge/GitHub_Pages-Active-success?style=for-the-badge&logo=github" alt="GitHub Pages" />
  </a>
</p>

<p align="center">
  <a href="#english">English</a> | <a href="#فارسی">فارسی</a>
</p>

---

## English

A modern, minimalist personal portfolio dashboard with a **Glassmorphism** (frosted-glass) design, completely powered by the **GitHub API**. Developed as a custom landing page for `demo.aminarjmand.com`, it dynamically showcases all GitHub repositories with live stats, star counts, automated language distribution, and direct preview links.

### 🔗 Live Preview
Experience the live dashboard here:  
👉 **[Launch Live Dashboard](https://demo.aminarjmand.com/)**

### ✨ Key Features
- **Full Bilingual Support:** Instant toggling between Persian (RTL) and English (LTR) with optimized fonts (*Vazirmatn* and *Inter*).
- **Light/Dark Mode:** Theme toggler component pre-configured with a sleek, modern light-mode default preference.
- **Automated Sync:** Fetches repositories, star counts, and dominant languages directly from GitHub API in real-time.
- **Smart Language Categorization:** Calculates exact code line percentages to categorize projects by their dominant language.
- **Instant Search:** Super-fast client-side filtering by repository title and description.
- **Intelligent Caching:** Stores API responses locally for 15 minutes to maximize load speeds and avoid GitHub API Rate Limit thresholds.
- **Advanced Customization via `project.json`:** Allows assigning distinct emojis and tailored descriptions to each repository independently.
- **Zero-Dependency Architecture:** Built entirely using native HTML5, CSS3, and pure Vanilla JavaScript.

### 🛠️ Customizing Repositories via `project.json`
One of the core features of this dashboard is the ability to override default GitHub text with custom emojis and specific project descriptions. To do this, simply create a `project.json` file in the root directory of any of your repositories using the following format:

{
  "emoji": "🧠",
  "description": "Your custom repository description in Persian or English to be displayed on the project card."
}

The dashboard automatically detects this file on runtime and seamlessly swaps out the default GitHub metadata.

### 🚀 Installation & Deployment
To deploy this dashboard for your own GitHub profile:
1. Upload the `index.html` file into your GitHub Pages repository (usually named `username.github.io`).
2. Open the file, locate the script section at the bottom, and update the target username variable:

const GITHUB_USERNAME = "sibche2013"; // Replace with your GitHub username

3. Enable **GitHub Pages** within your repository settings.
4. *(Optional)* If using a custom domain (e.g., `demo.aminarjmand.com`), configure it under the Custom Domain section in your GitHub Pages settings.

---

## فارسی

یک داشبورد شخصی مدرن و مینیمال با طراحی شیشه‌ای (**Glassmorphism**) که به طور کامل از طریق **GitHub API** تغذیه می‌شود. این پروژه به عنوان صفحه فرود اختصاصی برای `demo.aminarjmand.com` طراحی شده و تمامی مخازن گیت‌هاب را به همراه اطلاعات زنده، آمار ستارگان، دسته‌بندی خودکار زبان‌ها و لینک‌های مستقیم نسخه پیش‌نمایش به تصویر می‌کشد.

### 🔗 مشاهده پیش‌نمایش زنده
برای مشاهده و تست آنلاین این پروژه می‌توانید روی لینک زیر کلیک کنید:  
👉 **[مشاهده دمو زنده پروژه](https://demo.aminarjmand.com/)**

### ✨ ویژگی‌های برجسته
- **دوزبانه کامل (Full Bilingual Support):** تغییر آنی زبان بین فارسی (RTL) و انگلیسی (LTR) با فونت‌های بهینه شده وزیرمتن و Inter.
- **حالت تاریک و روشن (Light/Dark Mode):** مجهز به کلید تغییر پوسته با اولویت حالت روشن مدرن و شیک.
- **دریافت خودکار داده‌ها (Automated Sync):** همگام‌سازی لحظه‌ای با گیت‌هاب برای دریافت پروژه‌ها، تعداد ستاره‌ها و زبان‌های هر مخزن بدون نیاز به بروزرسانی دستی فایل‌ها.
- **دسته‌بندی هوشمند زبان‌ها (Smart Language Categorization):** بررسی درصد خطوط کد در هر پروژه و قرار دادن خودکار آن در دسته زبان غالب (بر اساس فرمول بیشترین سهم).
- **جستجوی آنی (Instant Search):** قابلیت جستجوی فوق‌العاده سریع در عنوان و توضیحات پروژه‌ها.
- **سیستم کش محلی (Intelligent Caching):** ذخیره موقت اطلاعات به مدت ۱۵ دقیقه در مرورگر جهت بهینه‌سازی سرعت لود و عدم برخورد با محدودیت‌های نرخ فراخوانی (Rate Limit) وب‌سرویس گیت‌هاب.
- **شخصی‌سازی پیشرفته (Local customization via `project.json`):** قابلیت اختصاص ایموجی‌های خاص و توضیحات سفارشی به هر مخزن به صورت مجزا.
- **بدون هیچ فریم‌ورک یا کتابخانه (Zero-dependency):** پیاده‌سازی شده صرفاً با HTML5 و CSS3 خالص به همراه Vanilla JavaScript.

### 🛠️ نحوه شخصی‌سازی هر پروژه با `project.json`
یکی از جذاب‌ترین ویژگی‌های این داشبورد، امکان تنظیم دلخواه ایموجی (به عنوان تصویر شاخص) و توضیحات اختصاصی برای تک‌تک پروژه‌ها است. برای این کار کافیست در روت (Root) هر کدام از مخازن خود، فایلی به نام `project.json` بسازید و فرمت زیر را داخل آن قرار دهید:

{
  "emoji": "🧠",
  "description": "توضیحات دلخواه شما به زبان فارسی یا انگلیسی که در کارت پروژه نمایش داده می‌شود."
}

داشبورد به طور خودکار در هنگام لود، وجود این فایل را بررسی کرده و اطلاعات آن را جایگزین مقادیر پیش‌فرض گیت‌هاب می‌کند.

### 🚀 راه‌اندازی و اجرا (Installation & Deployment)
برای استفاده از این داشبورد روی گیت‌هاب خودتان، مراحل زیر را طی کنید:
1. کدهای فایل `index.html` را در مخزن گیت‌هاب پیج خود (معمولاً با نام `username.github.io`) آپلود کنید.
2. فایل را باز کرده و در بخش جاوااسکریپت (انتهای فایل)، مقدار متغیر `GITHUB_USERNAME` را به نام کاربری خود تغییر دهید:

const GITHUB_USERNAME = "sibche2013"; // نام کاربری خود را اینجا بنویسید

3. سرویس **GitHub Pages** مخزن خود را فعال کنید.
4. در صورت داشتن دامنه اختصاصی (مانند `demo.aminarjmand.com`)، آن را در بخش Custom Domain تنظیمات گیت‌هاب پیج خود ست کنید.

---

### 💻 Technologies Used / تکنولوژی‌های استفاده شده

- **HTML5 & CSS3** (Dynamic shadows, CSS variables, keyframe animations)
- **Vanilla JavaScript** (Fetch API, LocalStorage, Promises, client-side filtering)
- **GitHub API v3** (REST endpoints for user repository mapping)

---

### 📞 Contact Me / راه‌های ارتباطی

- **Website:** [aminarjmand.com](https://aminarjmand.com)
- **Email:** [info@aminarjmand.com](mailto:info@aminarjmand.com)
- **Phone:** +989159065674
- **Telegram:** [@sibche2013](https://t.me/sibche2013)

---
⭐️ *If you found this dashboard layout useful, please give this repository a star! / اگر این داشبورد برای شما مفید بود، لطفا با دادن ستاره از آن حمایت کنید!*
