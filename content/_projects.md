+++
title = "Projects"
template = "page.html"
+++

<br/>


🦉 [How AI is changing Product Management](#how-ai-is-changing-product-management)
🔄 [AI Translation Tool](#autotranslator)
🏄‍♂️ [Adventure Tourism Platform](#poissonblanc-adventure-tourism)
💸 [Bulk Payment Processor (iBanFirst API)](#bulk-payment-processor-ibanfirst-api)


<br/>

#### How AI is changing Product Management

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

Play game here: [Flappy Chouette](https://flappychouette.fun/)


<br/>
<br/>

### AutoTranslator
Tool that allows Localization Managers to translate their Localise.biz (Loco) projects using OpenAI API. Prompt is adapted to business context, platform (web, mobile) and language specificities. Users can also add a glossary file with their own terms.

- AI Tools Used: Cursor, Claude-3.5-Sonnet
- APIs: [OpenAI API](https://platform.openai.com/docs/api-reference/introduction), [Localise.biz API](https://localise.biz/api)
- Languages: Javascript, HTML, CSS

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/autotranslator.png" alt="AutoTranslator" loading="lazy" width="100%">
    </div>
</div>

<br/>
<br/>

### PoissonBlanc - Adventure Tourism
Platform for agency that makes adventure tourism in the state of Rio de Janeiro (Brazil) easier for French tourists. Visit [here](https://poissonblanc.vercel.app/)

- AI Tools Used: v0.dev, Claude-3.7-Sonnet
- Technologies: React, Next.js, Tailwind CSS, Shadcn UI, Leaflet (OpenStreetMap)

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/poissonblanc.png" alt="PoissonBlanc" loading="lazy" width="100%">
    </div>
</div>

<br/>
<br/>

### Bulk Payment Processor (iBanFirst API)
Built with the [iBanFirst API](https://docs.ibanfirst.com/), this project allows iBanFirst account holders to process bulk payments in a fast and efficient way.

- AI Tools Used: Cursor, Claude-3.5-Sonnet
- Languages: Python, Javascript, HTML, CSS

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/bulkpay.png" alt="Bulk Payment Processor" loading="lazy" width="100%">
    </div>
</div>

<br/>
<br/>



<style>

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