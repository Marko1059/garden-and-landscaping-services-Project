<script>
    // ============================================================
    // src/routes/gallery/+page.svelte
    // Photo gallery with category filter buttons and a lightbox popup
    // ============================================================

    // Gallery items - each has a src (image path), alt text, and category
    // Replace the src paths with your own images in /static/images/gallery/
    const galleryItems = [
        { src: '/images/gallery/gallery-1.jpg', alt: 'Freshly cut lawn in Clontarf',      category: 'Grass Cutting'      },
        { src: '/images/gallery/gallery-2.jpg', alt: 'Shaped box hedge in Malahide',      category: 'Hedge Cutting'      },
        { src: '/images/gallery/gallery-3.jpg', alt: 'Garden border after weeding',       category: 'Weeding'            },
        { src: '/images/gallery/gallery-4.jpg', alt: 'Seasonal planting design',          category: 'Design and Planting'},
        { src: '/images/gallery/gallery-5.jpg', alt: 'Striped lawn after mowing',         category: 'Grass Cutting'      },
        { src: '/images/gallery/gallery-6.jpg', alt: 'Tall hedge neatly trimmed',         category: 'Hedge Cutting'      },
        { src: '/images/gallery/gallery-7.jpg', alt: 'Patio cleared of weeds',            category: 'Weeding'            },
        { src: '/images/gallery/gallery-8.jpg', alt: 'Cottage garden planting scheme',    category: 'Design and Planting'},
        { src: '/images/gallery/gallery-9.jpg', alt: 'Edged lawn in front garden',        category: 'Grass Cutting'      },
    ];

    // Build the list of category buttons
    // 'All' is added first, then we get unique categories from the data
    const categories = ['All', ...new Set(galleryItems.map(item => item.category))];

    // Track which category is selected - starts as 'All'
    let activeCategory = 'All';

    // 'filtered' automatically updates when 'activeCategory' changes
    // If 'All' is selected, show everything. Otherwise filter by category.
    $: filtered = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    // Lightbox - stores the currently enlarged photo (or null if closed)
    let lightboxItem = null;

    function openLightbox(item) {
        lightboxItem = item;
    }

    function closeLightbox() {
        lightboxItem = null;
    }
</script>

<svelte:head>
    <title>Gallery — GreenScape Garden Services</title>
    <meta name="description" content="View our portfolio of completed garden projects across Dublin." />
</svelte:head>

<!-- Green banner -->
<div class="page-hero">
    <div class="container">
        <h1>Our Work</h1>
        <p>Browse photos from some of our completed garden projects across Dublin.</p>
    </div>
</div>

<section class="section">
    <div class="container">

        <!-- Category filter buttons -->
        <div class="filter-bar">
            {#each categories as cat}
                <button
                    class="filter-btn {activeCategory === cat ? 'active' : ''}"
                    on:click={() => activeCategory = cat}
                >
                    {cat}
                </button>
            {/each}
        </div>

        <!-- Photo grid -->
        <div class="gallery-grid">
            {#each filtered as item}
                <!--
                    Each photo is a button so keyboard users can open it.
                    Clicking opens the lightbox.
                -->
                <button
                    class="gallery-item"
                    on:click={() => openLightbox(item)}
                    aria-label="View photo: {item.alt}"
                >
                    <img src={item.src} alt={item.alt} />

                    <!-- Overlay shown on hover -->
                    <div class="gallery-overlay">
                        <span class="gallery-cat">{item.category}</span>
                        <span class="gallery-caption">{item.alt}</span>
                    </div>
                </button>
            {/each}
        </div>

    </div>
</section>


<!--
    LIGHTBOX - only shown when lightboxItem is not null
    Clicking the dark background closes it
-->
{#if lightboxItem}
    <div
        class="lightbox"
        on:click={closeLightbox}
        on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <!-- Clicking inside the white box does NOT close it -->
        <div class="lightbox-inner" on:click|stopPropagation>
            <button class="lightbox-close" on:click={closeLightbox}>✕ Close</button>
            <img src={lightboxItem.src} alt={lightboxItem.alt} />
            <p>{lightboxItem.alt}</p>
        </div>
    </div>
{/if}


<!-- Bottom CTA -->
<section class="gallery-cta">
    <div class="container" style="text-align: center;">
        <h2>Like What You See?</h2>
        <p>Get in touch today for a free quote on your garden project.</p>
        <div class="cta-buttons">
            <a href="/booking" class="btn btn-primary">Book a Free Quote</a>
            <a href="/contact" class="btn btn-outline">Contact Us</a>
        </div>
    </div>
</section>

<style>
    /* Filter buttons row */
    .filter-bar {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-bottom: 2.5rem;
        justify-content: center;
    }

    .filter-btn {
        padding: 0.5rem 1.4rem;
        border-radius: var(--radius-full);
        border: 2px solid var(--green-muted);
        background: var(--white);
        color: var(--text-mid);
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all var(--transition);
    }

    /* Active / hovered filter button turns green */
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--green-mid);
        border-color: var(--green-mid);
        color: var(--white);
    }

    /* 3-column photo grid */
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    /* Each photo cell */
    .gallery-item {
        position: relative;
        border: none;
        background: none;
        padding: 0;
        cursor: pointer;
        border-radius: var(--radius-md);
        overflow: hidden;
        aspect-ratio: 4 / 3; /* keeps all images the same proportions */
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: var(--green-muted); /* shows if image is missing */
        display: block;
        transition: transform 0.4s ease;
    }

    /* Zoom in slightly on hover */
    .gallery-item:hover img {
        transform: scale(1.06);
    }

    /* Dark overlay shown on hover */
    .gallery-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(20, 40, 12, 0.85) 0%, transparent 60%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.25rem;
        opacity: 0;
        transition: opacity var(--transition);
    }

    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }

    .gallery-cat {
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--green-light);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.25rem;
    }

    .gallery-caption {
        color: var(--white);
        font-size: 0.9rem;
        font-weight: 600;
    }

    /* ===== LIGHTBOX ===== */
    .lightbox {
        position: fixed;    /* covers the whole screen */
        inset: 0;
        background: rgba(0, 0, 0, 0.88);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        animation: fadeIn 0.2s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    .lightbox-inner {
        position: relative;
        max-width: 900px;
        width: 100%;
    }

    .lightbox-inner img {
        width: 100%;
        border-radius: var(--radius-lg);
        max-height: 80vh;
        object-fit: contain;
    }

    .lightbox-inner p {
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
    }

    .lightbox-close {
        position: absolute;
        top: -3rem;
        right: 0;
        background: none;
        border: none;
        color: var(--white);
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
    }

    /* Bottom CTA */
    .gallery-cta {
        background: var(--green-pale);
        padding: 4rem 0;
    }

    .gallery-cta h2 { margin-bottom: 0.5rem; }

    .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
        flex-wrap: wrap;
    }

    /* Responsive grid */
    @media (max-width: 768px) {
        .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 480px) {
        .gallery-grid { grid-template-columns: 1fr; }
    }
</style>