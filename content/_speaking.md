+++
title = "Talks"
template = "page.html"
+++

I have spoken in public for the past 5+ years, both in academic and professional environments.

- 50-200+ people audience
- In-person and virtual presentations
- Keynotes / Workshops / Hands-on interactive sessions
- Languages: Portuguese, French, Italian, and English

<br>

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