+++
title = "Projects"
template = "page.html"
+++

<br/>

[AI Localization Platform](#ai-localization-platform) | [Bulk Payment Processor](#bulk-payment-processor) | [MaCarteBrésil](#macartebresil)

<br/>

### AI Localization Platform
Internal tool for automating iBanFirst's multi-language deployment.

- Reduced translation time from weeks to hours for 10,000+ keys
- Context-aware prompts adapted to business domain and platform (web/mobile)
- Custom glossary support for company-specific terms
- Preserves HTML/CSS/links during translation
- Enabled expansion into Poland and Greece

**Stack:** Cursor, Claude-3.5-Sonnet, [OpenAI API](https://platform.openai.com/docs/api-reference/introduction), [Localise.biz API](https://localise.biz/api), Javascript

<br/>

<div class="gallery">
    <img src="/images/home.png" alt="Home" onclick="openLightbox(this)">
    <img src="/images/settings.png" alt="Settings" onclick="openLightbox(this)">
    <img src="/images/glossary.png" alt="Glossary" onclick="openLightbox(this)">
    <img src="/images/manual-mode.png" alt="Manual Mode" onclick="openLightbox(this)">
</div>

<div id="lightbox" onclick="closeLightbox(event)">
    <span id="lightbox-close" onclick="forceCloseLightbox()">&times;</span>
    <span id="lightbox-prev" onclick="navigateLightbox(-1)">&#10094;</span>
    <img id="lightbox-img" src="" alt="">
    <span id="lightbox-next" onclick="navigateLightbox(1)">&#10095;</span>
</div>

<script>
let galleryImages = [];
let currentIndex = 0;

function openLightbox(img) {
    galleryImages = Array.from(document.querySelectorAll('.gallery img'));
    currentIndex = galleryImages.indexOf(img);
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeLightbox(e) {
    if (e && e.target.id !== 'lightbox') return;
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
}
function forceCloseLightbox() {
    event.stopPropagation();
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = '';
}
function navigateLightbox(dir) {
    event.stopPropagation();
    currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
    document.getElementById('lightbox-img').src = galleryImages[currentIndex].src;
}
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'Escape') { document.getElementById('lightbox').style.display = 'none'; document.body.style.overflow = ''; }
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});
</script>

<br/>
<br/>

### Bulk Payment Processor
Proof of concept built to demonstrate feasibility of a highly-requested client feature.

- Addressed gap between manual payments (slow) and full API integration (too complex)
- Import Excel/CSV file → automatic payment creation via [iBanFirst API](https://docs.ibanfirst.com/)
- Handles errors, malformatting, and edge cases
- Successfully demoed to company, validated feature for dev team

**Stack:** Cursor, Claude-3.5-Sonnet, Python, Javascript

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/bulkpay.png" alt="Bulk Payment Processor" loading="lazy" width="100%">
    </div>
</div>

<br/>
<br/>

---

### MaCarteBresil
*Personal project*

Simple trip planner for Brazil. Select cities, set the number of days for each, and get a map showing your full itinerary. You should visit too — [plan your trip here](https://macartebresil.vercel.app/).

**Stack:** v0.dev, Claude-3.7-Sonnet, React, Next.js, Tailwind CSS, Leaflet

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/poissonblanc.png" alt="MaCarteBrésil" loading="lazy" width="100%">
    </div>
</div>

<br/>
<br/>

<style>

.gallery {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;
}

.gallery img {
    height: 120px;
    cursor: pointer;
    border-radius: 4px;
    transition: transform 0.2s;
    border: none !important;
    outline: none !important;
}

.gallery img:hover {
    transform: scale(1.05);
}

#lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

#lightbox-img {
    max-width: 90%;
    max-height: 90%;
}

#lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    cursor: pointer;
}

#lightbox-prev, #lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 50px;
    cursor: pointer;
    padding: 20px;
    user-select: none;
}

#lightbox-prev { left: 20px; }
#lightbox-next { right: 20px; }

.media-grid {
    display: grid;
    gap: 2rem;
    margin: 2rem 0;
}

/* Video container takes full width */
.media-grid:first-of-type {
    display: block !important;
}

/* Images are in a 2-column grid */
.media-grid:last-of-type {
    grid-template-columns: repeat(2, 1fr);
}

/* Make last item full width if it's alone in its row */
.media-grid:last-of-type .media-item:last-child:nth-child(2n + 1) {
    grid-column: 1 / -1;
}

.media-item {
    display: flex;
    justify-content: center;
    align-items: center;
}

.media-item img, 
.media-item video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none !important;
    outline: none !important;
    align-self: center;
}
</style>