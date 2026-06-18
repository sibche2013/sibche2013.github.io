const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME"; // نام کاربری خود را اینجا بنویسید
const CACHE_KEY = "github_dashboard_data";
const CACHE_TIME = 30 * 60 * 1000; // ۳۰ دقیقه کش

let currentLang = "fa";
let allProjects = [];
let allLanguages = new Set();

// رنگ‌های پیش‌فرض برای زبان‌ها
const langColors = {
    JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c",
    TypeScript: "#3178c6", Python: "#3572A5", Vue: "#41b883", React: "#61dafb"
};

// اموجی‌های رندوم برای تامبنیل خودکار پروژه‌ها
const thumbnails = ["🚀", "💻", "🌐", "📱", "🎨", "⚙️", "📊", "🔥", "🛠️"];

document.addEventListener("DOMContentLoaded", init);

async function init() {
    setupLanguageToggle();
    setupSearchAndFilters();
    await loadData();
}

// دوزبانه کردن المان‌ها
function setupLanguageToggle() {
    const btn = document.getElementById("lang-toggle");
    btn.addEventListener("click", () => {
        currentLang = currentLang === "fa" ? "en" : "fa";
        btn.textContent = currentLang === "fa" ? "EN" : "FA";
        
        document.documentElement.dir = currentLang === "fa" ? "rtl" : "ltr";
        document.documentElement.lang = currentLang;

        // به‌روزرسانی متن‌ها
        document.querySelectorAll("[data-en]").forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
        
        const searchInput = document.getElementById("search-input");
        searchInput.placeholder = searchInput.getAttribute(`data-${currentLang}`);

        renderStats();
        renderProjects(allProjects);
        renderFilters();
    });
}

// دریافت اطلاعات و کش کردن
async function loadData() {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_KEY + "_time");

    if (cached && cachedTime && (Date.now() - cachedTime < CACHE_TIME)) {
        allProjects = JSON.parse(cached);
        processProjects();
    } else {
        try {
            const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
            const repos = await res.json();
            
            allProjects = await Promise.all(repos.map(async (repo) => {
                // دریافت درصد زبان‌ها برای دسته‌بندی هوشمند
                const langRes = await fetch(repo.languages_url);
                const languages = await langRes.json();
                
                // پیدا کردن زبانی که بیشترین درصد را دارد
                let topLang = "Unknown";
                let maxVotes = 0;
                Object.keys(languages).forEach(lang => {
                    if (languages[lang] > maxVotes) {
                        maxVotes = languages[lang];
                        topLang = lang;
                    }
                });

                // تلاش برای خواندن فایل شخصی‌سازی project.json از روت هر مخزن
                let customConfig = {};
                try {
                    const configRes = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/${repo.default_branch}/project.json`);
                    if (configRes.ok) customConfig = await configRes.json();
                } catch (e) { /* فایل پیکربندی وجود ندارد */ }

                return {
                    name: repo.name,
                    description: customConfig.description || repo.description || "",
                    stars: repo.stargazers_count,
                    topLanguage: topLang,
                    html_url: repo.html_url,
                    homepage: repo.has_pages ? `https://${GITHUB_USERNAME}.github.io/${repo.name}` : repo.homepage,
                    emoji: customConfig.emoji || thumbnails[Math.floor(Math.random() * thumbnails.length)]
                };
            }));

            localStorage.setItem(CACHE_KEY, JSON.stringify(allProjects));
            localStorage.setItem(CACHE_KEY + "_time", Date.now().toString());
            processProjects();

        } catch (error) {
            document.getElementById("projects-grid").innerHTML = `<div class="loading">Error loading data.</div>`;
        }
    }
}

function processProjects() {
    allLanguages.clear();
    allProjects.forEach(p => {
        if (p.topLanguage && p.topLanguage !== "Unknown") allLanguages.add(p.topLanguage);
    });
    renderStats();
    renderFilters();
    renderProjects(allProjects);
}

// نمایش آمار بالای صفحه
function renderStats() {
    document.getElementById("repo-count").textContent = allProjects.length;
    document.getElementById("star-count").textContent = allProjects.reduce((acc, curr) => acc + curr.stars, 0);
    
    // پیدا کردن محبوب‌ترین زبان کل داشبورد
    const counts = {};
    allProjects.forEach(p => { if(p.topLanguage !== "Unknown") counts[p.topLanguage] = (counts[p.topLanguage] || 0) + 1; });
    const top = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "-");
    document.getElementById("top-lang").textContent = top;
}

// رندر داینامیک دکمه‌های فیلتر زبان‌ها
function renderFilters() {
    const filterContainer = document.getElementById("filter-tags");
    const allBtn = filterContainer.querySelector('[data-lang="all"]');
    filterContainer.innerHTML = '';
    filterContainer.appendChild(allBtn);

    allLanguages.forEach(lang => {
        const btn = document.createElement("button");
        btn.className = "tag";
        btn.setAttribute("data-lang", lang);
        btn.textContent = lang;
        btn.addEventListener("click", () => filterByLanguage(lang, btn));
        filterContainer.appendChild(btn);
    });
}

// فیلتر کردن
function filterByLanguage(lang, btnElement) {
    document.querySelectorAll(".tag").forEach(b => b.classList.remove("active"));
    btnElement.classList.add("active");
    
    if (lang === "all") {
        renderProjects(allProjects);
    } else {
        const filtered = allProjects.filter(p => p.topLanguage === lang);
        renderProjects(filtered);
    }
}

// راه‌اندازی سرچ بار
function setupSearchAndFilters() {
    const search = document.getElementById("search-input");
    search.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allProjects.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
        renderProjects(filtered);
    });
    
    document.querySelector('[data-lang="all"]').addEventListener("click", function() {
        filterByLanguage("all", this);
    });
}

// رندر کارت‌های پروژه
function renderProjects(projects) {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";

    if (projects.length === 0) {
        grid.innerHTML = `<div class="loading">${currentLang === 'fa' ? 'پروژه‌ای پیدا نشد.' : 'No projects found.'}</div>`;
        return;
    }

    projects.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-card glass";

        const color = langColors[proj.topLanguage] || "#888";
        
        // هندل کردن لینک لایو (GitHub Pages یا لینک سفارشی)
        const liveLinkHtml = proj.homepage 
            ? `<a href="${proj.homepage}" target="_blank" class="proj-link">🔗 Live</a>` 
            : '';

        card.innerHTML = `
            <div>
                <div class="proj-thumb">${proj.emoji}</div>
                <div class="proj-header">
                    <a href="${proj.html_url}" target="_blank" class="proj-title">${proj.name}</a>
                </div>
                <p class="proj-desc">${proj.description || (currentLang === 'fa' ? 'بدون توضیحات' : 'No description available.')}</p>
            </div>
            <div class="proj-footer">
                <div class="proj-lang">
                    <span class="lang-dot" style="background-color: ${color}"></span>
                    <span>${proj.topLanguage}</span>
                </div>
                <div class="proj-links">
                    <a href="${proj.html_url}" target="_blank" class="proj-link">📦 Code</a>
                    ${liveLinkHtml}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}
