+++
title = "Projects"
template = "page.html"
+++

<br/>

### Flappy Chouette

<div style="padding:42.19% 0 0 0;position:relative; background-color: transparent;"><iframe src="https://player.vimeo.com/video/679153225?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Epic Series Loop (21-9).mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

<br/>
<br/>

### Bulk Payment Processor (iBanFirst API)
Built with the [iBanFirst API](https://docs.ibanfirst.com/), this project allows iBanFirst account holders to process bulk payments in a fast and efficient way.

- AI Tools Used: Cursor, Claude-3.5-Sonnet
- Languages: Python, Javascript, HTML, CSS

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/bulkpay.png" alt="Bulk Payment Processor" loading="lazy">
    </div>
</div>

<br/>
<br/>

### AutoTranslator
Tool that allows Localization Managers to translate their Localise.biz (Loco) projects using OpenAI API. Prompt is adapted to business context, platform (web, mobile) and language specificities. Users can also add a glossary file with their own terms.

- AI Tools Used: Cursor, Claude-3.5-Sonnet
- APIs: OpenAI API, Localise.biz API
- Languages: Javascript, HTML, CSS

<br/>

<div class="media-grid">
    <div class="media-item">
        <img src="/images/autotranslator.png" alt="AutoTranslator" loading="lazy">
    </div>
</div>

<br/>


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