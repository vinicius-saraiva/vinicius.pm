+++
title = "Lectures & Talks"
template = "page.html"
+++

<br>

### AI per Product Builder (Masterclass)

Guest Lecturer at [Product Heroes](https://www.productheroes.it/), teaching product professionals how to build functional MVPs using AI-powered development tools.

- 4-module curriculum (16 hours total)
- Topics: Design/Frontend, Backend, API Integration, AI Services
- Tools taught: Lovable, Supabase, Postman, OpenAI APIs, HuggingFace
- Target audience: PMs, founders, designers
- [Course page](https://www.productheroes.it/ai-per-product-builder/)

**What students say:**

> *"I found the use of AI tools to build working prototypes in a short time really relevant. The most valuable part was discovering that, with the right tools, you can create a real prototype very quickly."*
> — **Irene Romanello**, Product Manager @ Fiscozen

> *"It gave me the concrete ability to create effective MVPs without having to involve the development team."*
> — **Laura Serafin**, UI Designer @ MUGO

> *"The best practices for getting the most out of Lovable and the libraries to integrate its features were among the most important aspects of the course. Very concrete and actionable input."*
> — **Luca de Franceschi**, Senior Product Manager @ Intento

<br>

---

### How AI is changing Product Management

Coding a game with AI: 4 lessons for PMs

<div class="media-grid">
    <div class="media-item" style="max-width: 800px; margin: 0 auto; width: 100%; display: flex; justify-content: center;">
        <div style="position: relative; width: 100%; padding-bottom: 42.55%; background-color: transparent;">
            <iframe
                style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; width: 100%; height: 100%;"
                src="https://www.youtube.com/embed/R_MQ03YBCJ8?controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
                frameborder="0"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</div>

<br>

---

### From digital bank account to Super-App

_An investigation of the Business Model Innovation Strategy of Banco Inter_

- Thesis supervisor: Professor Anna Eugenia Omarini
- BSc. in International Economics and Finance
- Bocconi University, Milan, Italy
- July 2022

<div id="pdf-viewer-container">
    <div id="pdf-controls">
        <button id="prev-page" title="Previous pages">←</button>
        <span id="page-info">Loading...</span>
        <button id="next-page" title="Next pages">→</button>
        <button id="fullscreen-btn" title="Fullscreen">⛶</button>
        <a href="/files/thesis.pdf" download id="download-btn" title="Download PDF"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></a>
    </div>
    <div id="pdf-canvas-container">
        <canvas id="pdf-canvas-left"></canvas>
        <canvas id="pdf-canvas-right"></canvas>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs" type="module"></script>
<script type="module">
    const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

    const url = '/files/thesis.pdf';
    let pdfDoc = null;
    let currentSpread = 0; // 0 = pages 1-2, 1 = pages 3-4, etc.
    let rendering = false;
    const canvasLeft = document.getElementById('pdf-canvas-left');
    const canvasRight = document.getElementById('pdf-canvas-right');
    const ctxLeft = canvasLeft.getContext('2d');
    const ctxRight = canvasRight.getContext('2d');
    const container = document.getElementById('pdf-canvas-container');

    async function renderPage(canvas, ctx, pageNum) {
        if (pageNum < 1 || pageNum > pdfDoc.numPages) {
            canvas.style.display = 'none';
            return;
        }
        canvas.style.display = 'block';
        const page = await pdfDoc.getPage(pageNum);
        const containerWidth = container.clientWidth;
        const pageWidth = (containerWidth - 30) / 2; // 30px for gap
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = pageWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale: scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: ctx, viewport: viewport }).promise;
    }

    async function renderSpread() {
        if (rendering) return;
        rendering = true;

        const leftPage = currentSpread * 2 + 1;
        const rightPage = currentSpread * 2 + 2;

        await Promise.all([
            renderPage(canvasLeft, ctxLeft, leftPage),
            renderPage(canvasRight, ctxRight, rightPage)
        ]);

        // Update page info
        if (rightPage <= pdfDoc.numPages) {
            document.getElementById('page-info').textContent = leftPage + '-' + rightPage + ' / ' + pdfDoc.numPages;
        } else {
            document.getElementById('page-info').textContent = leftPage + ' / ' + pdfDoc.numPages;
        }

        rendering = false;
    }

    function getMaxSpread() {
        return Math.ceil(pdfDoc.numPages / 2) - 1;
    }

    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentSpread <= 0) return;
        currentSpread--;
        renderSpread();
    });

    document.getElementById('next-page').addEventListener('click', function() {
        if (currentSpread >= getMaxSpread()) return;
        currentSpread++;
        renderSpread();
    });

    document.getElementById('fullscreen-btn').addEventListener('click', function() {
        const viewer = document.getElementById('pdf-viewer-container');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            viewer.requestFullscreen();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentSpread > 0) {
            currentSpread--;
            renderSpread();
        } else if (e.key === 'ArrowRight' && currentSpread < getMaxSpread()) {
            currentSpread++;
            renderSpread();
        }
    });

    window.addEventListener('resize', function() {
        if (pdfDoc) renderSpread();
    });

    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdfDoc = pdf;
        renderSpread();
    });
</script>

<style>
#pdf-viewer-container {
    width: 100%;
    margin: 20px 0;
    background: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
}
#pdf-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 12px;
    background: #333;
}
#pdf-controls button, #pdf-controls a {
    background: #555;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
#pdf-controls button:hover, #pdf-controls a:hover {
    background: #777;
}
#page-info {
    color: white;
    font-size: 14px;
    min-width: 100px;
    text-align: center;
}
#pdf-canvas-container {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    box-sizing: border-box;
}
#pdf-canvas-left, #pdf-canvas-right {
    max-width: calc(50% - 15px);
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
#pdf-viewer-container:fullscreen {
    background: #222;
    display: flex;
    flex-direction: column;
}
#pdf-viewer-container:fullscreen #pdf-canvas-container {
    flex: 1;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>

<br>

---

## Talks

I've given talks and workshops over the years — here are some moments.

### Gallery

<div class="media-grid">
    <!-- Video -->
    <div class="media-item">
        <video controls width="100%">
            <source src="/videos/iBFKeynoteExerpt.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>
</div>

<div class="media-grid">
<!-- Images -->
    <div class="media-item">
        <img src="/images/photo1.jpg" alt="Speaking at Conference" loading="lazy">
    </div>
    <div class="media-item">
        <img src="/images/photo2.jpg" alt="Workshop Presentation" loading="lazy">
    </div>
     <div class="media-item">
        <img src="/images/photo3.jpg" alt="Workshop Presentation" loading="lazy">
    </div>
</div>

<style>

.media-grid {
    display: grid;
    gap: 2rem;
    margin: 2rem 0;
}

/* Video container takes full width */
.media-grid:first-of-type {
    grid-template-columns: 1fr;
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
