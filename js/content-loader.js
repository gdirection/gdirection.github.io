/**
 * Content Loader - Dynamically loads and renders website content from JSON files
 */

// Utility function to fetch JSON data
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null;
    }
}

// Load and render profile section
async function loadProfile() {
    const data = await fetchJSON('data/profile.json');
    if (!data) return;

    // Set name
    document.querySelector('.fh5co-tab-content[data-content="1"] h1').textContent = data.name;

    // Set image
    document.querySelector('.fh5co-tab-content[data-content="1"] img').src = data.image;

    // Set bio paragraphs
    const bioContainer = document.querySelector('.fh5co-tab-content[data-content="1"] .row-bottom-padded-sm');
    const existingParagraphs = bioContainer.querySelectorAll('p');

    // Update first paragraph with bio
    if (existingParagraphs[0]) {
        existingParagraphs[0].innerHTML = data.bio.join('</p><p>');
    }

    // Update resume link
    if (existingParagraphs[1]) {
        existingParagraphs[1].innerHTML = `My resume can be downloaded <a href="${data.resume}">here</a>`;
    }

    // Set social links
    const socialContainer = document.querySelector('.fh5co-social');
    socialContainer.innerHTML = data.social.map(social =>
        `<li><a href="${social.url}"><i class="${social.icon}"></i></a></li>`
    ).join('');
}

// Load and render education section
async function loadEducation() {
    const data = await fetchJSON('data/education.json');
    if (!data) return;

    const container = document.querySelector('.fh5co-tab-content[data-content="3"] .col-md-12');
    container.innerHTML = data.map(edu => `
        <div class="fh5co-feature">
            <div class="fh5co-icon">
                <i class="icon-graduation-cap"></i>
            </div>
            <div class="fh5co-text">
                <h2>${edu.period}</h2>
                <p>${edu.institution}</br>${edu.degree}</p>
            </div>
        </div>
    `).join('');
}

// Load and render publications section
async function loadPublications() {
    const data = await fetchJSON('data/publications.json');
    if (!data) return;

    const container = document.querySelector('.fh5co-tab-content[data-content="4"] .col-md-12');

    let html = '<h1>Publications</h1>';

    // Render publications
    data.publications.forEach(pub => {
        html += `
            <div class="fh5co-feature">
                <div class="fh5co-icon">
                    <i class="icon-file-o"></i>
                </div>
                <div class="fh5co-text">
                    <p>${pub.citation}</p>
                </div>
            </div>
        `;
    });

    // Render patents
    html += '<h1>Patents</h1>';
    data.patents.forEach(patent => {
        html += `
            <div class="fh5co-feature">
                <div class="fh5co-icon">
                    <i class="icon-file-o"></i>
                </div>
                <div class="fh5co-text">
                    <p>${patent.citation}</p>
                </div>
            </div>
        `;
    });

    // Render presentations
    html += '<h1>Poster and Talk</h1>';
    data.presentations.forEach(pres => {
        html += `
            <div class="fh5co-feature">
                <div class="fh5co-icon">
                    <i class="icon-file-o"></i>
                </div>
                <div class="fh5co-text">
                    <p>${pres.citation}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Load and render experience section
async function loadExperience() {
    const data = await fetchJSON('data/experience.json');
    if (!data) return;

    const container = document.querySelector('.fh5co-tab-content[data-content="2"] .col-md-12');

    let html = '<p>It is my pleasure to work with these cool companies.</p>';

    data.forEach(exp => {
        html += `
            <div class="fh5co-feature">
                <div class="fh5co-icon">
                    <i class="icon-black-tie"></i>
                </div>
                <div class="fh5co-text">
                    <h2>${exp.period}</h2>
                    <h3>${exp.title} – ${exp.company}</h3>
                    <ul>
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        <p></p>
                    </ul>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Load and render academic section
async function loadAcademic() {
    const data = await fetchJSON('data/academic.json');
    if (!data) return;

    const container = document.querySelector('.fh5co-tab-content[data-content="5"] .col-md-12');

    let html = `<h1>${data.professionalServices.title}</h1>`;
    html += `${data.professionalServices.description}<br>`;
    html += data.professionalServices.journals.map(journal => `${journal},<br>`).join('');
    html += '<p>';

    html += '<h1>Experience</h1>';

    data.experience.forEach(exp => {
        html += `
            <div class="fh5co-feature">
                <div class="fh5co-icon">
                    <i class="icon-book"></i>
                </div>
                <div class="fh5co-text">
                    <h2>${exp.period}</h2>
                    <h3>${exp.title} – ${exp.institution}</h3>
                    <ul>
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        <p></p>
                    </ul>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Initialize all content when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load all sections in parallel for better performance
    await Promise.all([
        loadProfile(),
        loadEducation(),
        loadPublications(),
        loadExperience(),
        loadAcademic()
    ]);

    console.log('All content loaded successfully!');
});
