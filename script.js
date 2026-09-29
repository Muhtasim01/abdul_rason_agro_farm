const FARM_CONFIG = {
    FARM_NAME: "Abdul Rason Agro Farm",
    FARM_TYPE: "Cattle Rearing & Milk Production",
    LOCATION: "Dakshin routhgaw fokirpara baramchal, 2 No Ward, Baramvhal Union, Kulaura, Moulovibazar, Sylhet, Bangladesh",
    PHONE: "+880 9643-705829",
    EMAIL: "abdulrason.agrofarm@gmail.com",
    ABOUT: "Abdul Rason Agro Farm is a modern agricultural enterprise committed to Cattle rearing , Milk production."
};

const TOTAL_IMAGES = 100;

const GALLERY_ITEMS = Array.from({ length: TOTAL_IMAGES }, (_, index) => ({
    id: index + 1,
    title: "", // Keep title blank so no text shows up in lightboxes
    img: `images/${index + 1}.jpeg`
}));

document.addEventListener("DOMContentLoaded", function() {
    applyConfigToDOM();
    renderGallery();
    initNavigationRouter();
    initMobileMenu();
    initContactForm();
    initLightbox();
});

function applyConfigToDOM() {
    document.querySelectorAll(".dyn-farm-name-text").forEach(el => el.textContent = FARM_CONFIG.FARM_NAME);
    document.getElementById("dyn-farm-name").textContent = FARM_CONFIG.FARM_NAME;
    document.getElementById("dyn-farm-type").textContent = FARM_CONFIG.FARM_TYPE;
    document.getElementById("dyn-header-phone").textContent = FARM_CONFIG.PHONE;
    
    document.querySelectorAll(".dyn-phone-val").forEach(el => el.textContent = FARM_CONFIG.PHONE);
    document.querySelectorAll(".dyn-email-val").forEach(el => el.textContent = FARM_CONFIG.EMAIL);
    
    document.getElementById("dyn-corporate-address").textContent = FARM_CONFIG.LOCATION;
    document.getElementById("dyn-footer-address").textContent = FARM_CONFIG.LOCATION;
    document.getElementById("dyn-about-full-text").textContent = FARM_CONFIG.ABOUT;
}

function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    grid.innerHTML = "";

    GALLERY_ITEMS.forEach((item) => {
        const card = document.createElement("div");
        card.className = "gallery-card";

        if (item.img) {
            card.innerHTML = `<img src="${item.img}" alt="${item.title}" class="gallery-img">`;
        } else {
            card.innerHTML = `
                <div class="gallery-placeholder">
                    <i class="fa-regular fa-image"></i>
                    <span>${item.title}</span>
                </div>
            `;
        }

        card.addEventListener("click", () => openLightbox(item));
        grid.appendChild(card);
    });
}

function initNavigationRouter() {
    function handleHashChange() {
        let fullHash = window.location.hash.replace("#", "") || "home";
        let mainView = fullHash;
        let subTargetId = null;

        if (fullHash.startsWith("product-")) {
            mainView = "products";
            subTargetId = fullHash;
        }

        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.toggle("active", item.getAttribute("data-view") === mainView);
        });

        document.querySelectorAll(".view-section").forEach(section => {
            section.classList.toggle("active-view", section.id === "view-" + mainView);
        });

        if (subTargetId) {
            const targetEl = document.getElementById(subTargetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const navMenu = document.getElementById("primaryNavMenu");
        if (navMenu) navMenu.classList.remove("mobile-open");
    }

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
}

function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("primaryNavMenu");

    if (btn && navMenu) {
        btn.addEventListener("click", function() {
            const isOpen = navMenu.classList.toggle("mobile-open");
            btn.setAttribute("aria-expanded", isOpen);
        });
    }
}

function initContactForm() {
    const form = document.getElementById("farmContactForm");
    const alertBox = document.getElementById("formFeedbackAlert");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            if (alertBox) alertBox.classList.add("success");
            form.reset();
            setTimeout(() => {
                if (alertBox) alertBox.classList.remove("success");
            }, 5000);
        });
    }
}

function initLightbox() {
    const modal = document.getElementById("lightboxModal");
    const closeBtn = document.getElementById("lightboxCloseBtn");

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", closeLightbox);
        modal.addEventListener("click", function(e) {
            if (e.target === modal) closeLightbox();
        });
    }
}

function openLightbox(item) {
    const modal = document.getElementById("lightboxModal");
    const container = document.getElementById("lightboxMediaContainer");
    const caption = document.getElementById("lightboxCaption");

    if (!modal || !container) return;

    if (item.img) {
        // Increases max-height to 88vh and keeps aspect ratio intact
        container.innerHTML = `<img src="${item.img}" alt="${item.title}" style="width:100%; max-height:88vh; object-fit:contain; display:block; margin:0 auto;">`;
    } else {
        container.innerHTML = `
            <div style="background:#e8ece9; padding:60px 20px; text-align:center;">
                <i class="fa-regular fa-image" style="font-size:48px; color:#888;"></i>
            </div>
        `;
    }

    // Hide caption if title is empty or default generic text
    if (caption) {
        if (item.title && !item.title.startsWith("Gallery Image")) {
            caption.textContent = item.title;
            caption.style.display = "block";
        } else {
            caption.style.display = "none";
        }
    }

    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
}

// Re-calculate layout when user resizes screen
let galleryResizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(galleryResizeTimer);
    galleryResizeTimer = setTimeout(renderGallery, 150);
});

function closeLightbox() {
    const modal = document.getElementById("lightboxModal");
    if (!modal) return;
    modal.classList.remove("show");
    setTimeout(() => { modal.style.display = "none"; }, 300);
}