

<svelte:head>
    <title>Admin Dashboard — GreenScape</title>
</svelte:head>

<!-- Admin header banner -->
<div class="admin-hero">
    <div class="container admin-hero-inner">
        <div>
            <h1>Dashboard</h1>
            <p>Welcome back, <strong>{user.name}</strong> —
                {user.role === 'ROLE_ADMIN' ? 'Administrator' : 'Staff Member'}
            </p>
        </div>
        <!-- Show different badge for admin vs staff -->
        {#if isAdmin}
            <span class="badge badge-admin">🔐 Admin</span>
        {:else}
            <span class="badge badge-staff">👷 Staff</span>
        {/if}
    </div>
</div>

<section class="section" style="padding-top: 2.5rem;">
    <div class="container">

        <!-- ===== STATS ROW ===== -->
        <div class="stats-grid">
            {#each stats as stat}
                <div class="stat-card">
                    <span class="stat-icon">{stat.icon}</span>
                    <div class="stat-value">{stat.value}</div>
                    <div class="stat-label">{stat.label}</div>
                </div>
            {/each}
        </div>

        <!-- ===== BOOKINGS TABLE ===== -->
        <div class="panel">
            <h2>Recent Booking Requests</h2>
            <div class="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each bookings as b}
                            <tr>
                                <td class="id-col">{b.id}</td>
                                <td><strong>{b.name}</strong></td>
                                <td>{b.email}</td>
                                <td>{b.service}</td>
                                <td>{b.date}</td>
                                <td>
                                    <span class="status-badge {statusClass(b.status)}">
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>

        <!--
            ADMIN ONLY SECTION
            Staff can see the table above but not this section.
            {#if isAdmin} shows this block only when the user is an admin.
        -->
        {#if isAdmin}
            <div class="panel">
                <h2>Services Overview</h2>
                <div class="services-list">
                    {#each services as s}
                        <div class="service-row">
                            <span class="service-icon">{s.icon}</span>
                            <div class="service-info">
                                <strong>{s.title}</strong>
                                <span>{s.price}</span>
                            </div>
                            <a href="/services/{s.slug}" class="btn btn-outline btn-sm">View Page</a>
                        </div>
                    {/each}
                </div>
            </div>

            <div class="panel">
                <h2>Admin Actions</h2>
                <div class="action-buttons">
                    <a href="/resetdatabase" class="btn btn-earth">🔄 Reset Database</a>
                    <a href="/gallery"  class="btn btn-outline">🖼️ View Gallery</a>
                    <a href="/services" class="btn btn-outline">🌿 View Services</a>
                </div>
            </div>
        {/if}

        <!-- STAFF ONLY: show useful contacts instead -->
        {#if !isAdmin}
            <div class="panel">
                <h2>Useful Contacts</h2>
                <div class="contacts-grid">
                    <div class="contact-card">
                        <strong>Manager</strong>
                        <span>+353 01 234 567</span>
                    </div>
                    <div class="contact-card">
                        <strong>Admin Email</strong>
                        <span>admin@greenscape.ie</span>
                    </div>
                    <div class="contact-card">
                        <strong>Emergency</strong>
                        <span>+353 86 123 456</span>
                    </div>
                </div>
            </div>
        {/if}

    </div>
</section>

<style>
    /* Admin top banner */
    .admin-hero {
        background: linear-gradient(135deg, var(--green-dark) 0%, var(--earth-dark) 100%);
        padding: 2.5rem 0;
        color: var(--white);
    }

    .admin-hero-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .admin-hero h1 { color: var(--white); font-size: 2rem; margin-bottom: 0.25rem; }
    .admin-hero p  { color: rgba(255, 255, 255, 0.8); margin: 0; font-size: 0.95rem; }

    .badge {
        padding: 0.5rem 1.25rem;
        border-radius: var(--radius-full);
        font-weight: 700;
        font-size: 0.9rem;
    }

    .badge-admin { background: rgba(255, 255, 255, 0.2); color: var(--white); }
    .badge-staff { background: rgba(196, 150, 90, 0.3); color: var(--earth-pale); }

    /* Stats grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.25rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 1.75rem;
        text-align: center;
    }

    .stat-icon  { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
    .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--green-dark);
        font-family: var(--font-display);
        line-height: 1;
    }
    .stat-label { color: var(--text-light); font-size: 0.85rem; margin-top: 0.25rem; }

    /* White panel cards */
    .panel {
        background: var(--white);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        padding: 2rem;
        margin-bottom: 1.5rem;
    }

    .panel h2 { font-size: 1.3rem; margin-bottom: 1.5rem; }

    /* Scrollable table wrapper (for small screens) */
    .table-scroll { overflow-x: auto; }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }

    thead th {
        background: var(--green-pale);
        color: var(--green-dark);
        text-align: left;
        padding: 0.75rem 1rem;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    tbody td {
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--green-pale);
        color: var(--text-mid);
        vertical-align: middle;
    }

    tbody tr:last-child td { border-bottom: none; }

    .id-col { color: var(--text-muted); font-size: 0.8rem; }

    /* Status pill badges */
    .status-badge {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: var(--radius-full);
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: capitalize;
    }

    .status-pending   { background: #fff3cd; color: #856404; }
    .status-confirmed { background: var(--green-pale); color: var(--green-dark); }
    .status-completed { background: #d1ecf1; color: #0c5460; }

    /* Services list */
    .services-list { display: flex; flex-direction: column; gap: 0.75rem; }

    .service-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1rem;
        background: var(--green-pale);
        border-radius: var(--radius-md);
    }

    .service-icon { font-size: 1.5rem; }
    .service-info { flex: 1; }
    .service-info strong { display: block; color: var(--green-dark); font-size: 0.9rem; }
    .service-info span   { color: var(--green-mid); font-size: 0.85rem; font-weight: 700; }

    /* Admin action buttons */
    .action-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }

    /* Staff contacts */
    .contacts-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    .contact-card {
        background: var(--green-pale);
        border-radius: var(--radius-md);
        padding: 1.25rem;
    }

    .contact-card strong { display: block; color: var(--green-dark); margin-bottom: 0.3rem; font-size: 0.85rem; }
    .contact-card span   { color: var(--green-mid); font-size: 0.9rem; }

    @media (max-width: 768px) {
        .stats-grid    { grid-template-columns: repeat(2, 1fr); }
        .contacts-grid { grid-template-columns: 1fr; }
    }
</style>