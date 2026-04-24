<script>
    // ============================================================
    // +error.svelte
    // SvelteKit automatically shows this page when:
    // - Someone visits a URL that doesn't exist (404 Not Found)
    // - Something goes wrong on a page (500 Server Error)
    // ============================================================

    // '$app/stores' is a built-in SvelteKit import
    // 'page' gives us info about the current page, including the error
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>Page Not Found — GreenScape</title>
</svelte:head>

<div class="error-page">
    <div class="container error-inner">

        <!-- Animated leaf icon -->
        <div class="error-icon">🌿</div>

        <!-- Show the error code (404, 500 etc.) -->
        <h1>{$page.status}</h1>

        <!-- Show a different message depending on the error code -->
        <h2>
            {#if $page.status === 404}
                Page Not Found
            {:else}
                Something Went Wrong
            {/if}
        </h2>

        <p>
            {#if $page.status === 404}
                Sorry, we could not find the page you were looking for.
                It may have been moved or does not exist.
            {:else}
                An unexpected error occurred. Please try again.
            {/if}
        </p>

        <!-- Give the user some helpful links to get back on track -->
        <div class="error-buttons">
            <a href="/" class="btn btn-primary">Go to Homepage</a>
            <a href="/services" class="btn btn-outline">View Services</a>
            <a href="/contact" class="btn btn-outline">Contact Us</a>
        </div>

    </div>
</div>

<style>
    .error-page {
        min-height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: var(--cream);
    }

    .error-inner {
        max-width: 500px;
        padding: 4rem 2rem;
    }

    /* Swaying leaf animation */
    .error-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        display: inline-block;
        animation: sway 3s ease-in-out infinite;
    }

    @keyframes sway {
        0%,  100% { transform: rotate(-5deg); }
        50%        { transform: rotate(5deg);  }
    }

    /* Big error number */
    h1 {
        font-size: 5rem;
        color: var(--green-light);
        margin-bottom: 0.25rem;
        line-height: 1;
    }

    h2 { margin-bottom: 1rem; }

    p {
        color: var(--text-light);
        margin-bottom: 2rem;
    }

    .error-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>