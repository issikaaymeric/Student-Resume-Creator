// scripts.js - Fixed version for Student Resume Creator

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current page:', currentPage);
    
    // Set up page-specific handlers
    switch(currentPage) {
        case 'index.html':
        case '':
            setupIndexPage();
            break;
        case 'summary.html':
            setupSummaryPage();
            break;
        case 'education.html':
            setupEducationPage();
            break;
        case 'experiences.html':
            setupExperiencesPage();
            break;
        case 'professional_certificate.html':
            setupCertificatesPage();
            break;
        case 'spoken_languages.html':
            setupLanguagesPage();
            break;
        case 'other_social_activities.html':
            setupActivitiesPage();
            break;
        case 'student_resume.html':
            displayFinalResume();
            break;
    }
    
    // Setup back button for all pages
    setupBackButton();
});

// ========== INDEX PAGE (Personal Info) ==========
function setupIndexPage() {
    const form = document.getElementById('resumeForm');
    if (!form) return;
    
    console.log('Setting up index page');
    
    // Load existing data if any
    const savedData = localStorage.getItem('personalInfo');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('name').value = data.name || '';
        document.getElementById('date').value = data.dateOfBirth || '';
        document.getElementById('gender').value = data.gender || '';
        document.getElementById('address').value = data.address || '';
        document.getElementById('city').value = data.city || '';
        document.getElementById('region').value = data.region || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('email').value = data.email || '';
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Personal info form submitted');
        
        const personalInfo = {
            name: document.getElementById('name').value,
            dateOfBirth: document.getElementById('date').value,
            gender: document.getElementById('gender').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            region: document.getElementById('region').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };
        
        console.log('Saving personal info:', personalInfo);
        localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
        
        // Navigate to summary page
        window.location.href = 'summary.html';
    });
}

// ========== SUMMARY PAGE ==========
function setupSummaryPage() {
    const form = document.getElementById('summaryForm');
    const nextBtn = document.getElementById('btn_next');
    
    if (!form || !nextBtn) return;
    
    console.log('Setting up summary page');
    
    // Load existing data
    const savedSummary = localStorage.getItem('summary');
    if (savedSummary) {
        document.getElementById('summary').value = savedSummary;
    }
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Summary next button clicked');
        
        const summary = document.getElementById('summary').value;
        console.log('Saving summary:', summary);
        localStorage.setItem('summary', summary);
        
        // Navigate to education page
        window.location.href = 'education.html';
    });
}

// ========== EDUCATION PAGE ==========
let educationEntries = [];

function setupEducationPage() {
    const form = document.getElementById('educationForm');
    if (!form) return;
    
    console.log('Setting up education page');
    
    // Load existing education data
    const savedEducation = localStorage.getItem('education');
    if (savedEducation) {
        educationEntries = JSON.parse(savedEducation);
        console.log('Loaded education entries:', educationEntries);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Education form submitted');
        
        // Get current form values
        const diploma = document.getElementById('diploma').value;
        const school = document.getElementById('school').value;
        const year = document.getElementById('year').value;
        
        // Add current entry if fields are filled
        if (diploma || school || year) {
            educationEntries.push({
                diploma: diploma,
                institution: school,
                year: year
            });
        }
        
        console.log('Saving education entries:', educationEntries);
        localStorage.setItem('education', JSON.stringify(educationEntries));
        
        // Navigate to experiences page
        window.location.href = 'experiences.html';
    });
}

function add_education() {
    console.log('Adding education entry');
    
    const diploma = document.getElementById('diploma').value;
    const school = document.getElementById('school').value;
    const year = document.getElementById('year').value;
    
    if (!diploma && !school && !year) {
        alert('Please fill in at least one field');
        return;
    }
    
    educationEntries.push({
        diploma: diploma,
        institution: school,
        year: year
    });
    
    console.log('Education entries:', educationEntries);
    localStorage.setItem('education', JSON.stringify(educationEntries));
    
    // Clear form
    document.getElementById('diploma').value = '';
    document.getElementById('school').value = '';
    document.getElementById('year').value = '';
    
    alert('Education entry added! Add another or click Next to continue.');
}

function remove_education() {
    if (educationEntries.length > 0) {
        educationEntries.pop();
        localStorage.setItem('education', JSON.stringify(educationEntries));
        console.log('Removed last education entry');
        alert('Last education entry removed');
    } else {
        alert('No education entries to remove');
    }
}

// ========== EXPERIENCES PAGE ==========
let experienceEntries = [];

function setupExperiencesPage() {
    const form = document.getElementById('experienceForm');
    if (!form) return;
    
    console.log('Setting up experiences page');
    
    // Load existing data
    const savedExperiences = localStorage.getItem('experiences');
    if (savedExperiences) {
        experienceEntries = JSON.parse(savedExperiences);
        console.log('Loaded experience entries:', experienceEntries);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Experience form submitted');
        
        const jobTitle = document.getElementById('job_title').value;
        const company = document.getElementById('company').value;
        const city = document.getElementById('company_city').value;
        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;
        const achievements = document.getElementById('achievements').value;
        
        // Add current entry if fields are filled
        if (jobTitle || company) {
            experienceEntries.push({
                jobTitle: jobTitle,
                company: company,
                city: city,
                startDate: startDate,
                endDate: endDate,
                description: achievements
            });
        }
        
        console.log('Saving experience entries:', experienceEntries);
        localStorage.setItem('experiences', JSON.stringify(experienceEntries));
        
        // Navigate to certificates page
        window.location.href = 'professional_certificate.html';
    });
}

function addExperience() {
    console.log('Adding experience entry');
    
    const jobTitle = document.getElementById('job_title').value;
    const company = document.getElementById('company').value;
    const city = document.getElementById('company_city').value;
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    const achievements = document.getElementById('achievements').value;
    
    if (!jobTitle && !company) {
        alert('Please fill in at least job title or company');
        return;
    }
    
    experienceEntries.push({
        jobTitle: jobTitle,
        company: company,
        city: city,
        startDate: startDate,
        endDate: endDate,
        description: achievements
    });
    
    console.log('Experience entries:', experienceEntries);
    localStorage.setItem('experiences', JSON.stringify(experienceEntries));
    
    // Clear form
    document.getElementById('job_title').value = '';
    document.getElementById('company').value = '';
    document.getElementById('company_city').value = '';
    document.getElementById('start_date').value = '';
    document.getElementById('end_date').value = '';
    document.getElementById('achievements').value = '';
    
    alert('Experience entry added! Add another or click Next to continue.');
}

function removeExperience() {
    if (experienceEntries.length > 0) {
        experienceEntries.pop();
        localStorage.setItem('experiences', JSON.stringify(experienceEntries));
        console.log('Removed last experience entry');
        alert('Last experience entry removed');
    } else {
        alert('No experience entries to remove');
    }
}

// ========== CERTIFICATES PAGE ==========
let certificateEntries = [];

function setupCertificatesPage() {
    // Try both form IDs (with and without space) in case user hasn't fixed the HTML yet
    const form = document.getElementById('professionalCertificateForm') || document.getElementById(' professionalCertificateForm');
    if (!form) {
        console.error('Certificate form not found! Check if form ID is "professionalCertificateForm"');
        return;
    }
    
    console.log('Setting up certificates page');
    
    // Load existing data
    const savedCerts = localStorage.getItem('certificates');
    if (savedCerts) {
        certificateEntries = JSON.parse(savedCerts);
        console.log('Loaded certificate entries:', certificateEntries);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Certificate form submitted');
        
        const title = document.getElementById('certificate_title').value;
        const org = document.getElementById('organization').value;
        const date = document.getElementById('delivery_date').value;
        
        // Add current entry if fields are filled
        if (title || org) {
            certificateEntries.push({
                name: title,
                organization: org,
                year: date
            });
        }
        
        console.log('Saving certificate entries:', certificateEntries);
        localStorage.setItem('certificates', JSON.stringify(certificateEntries));
        
        // Navigate to languages page (NOT to student_resume.html yet!)
        console.log('Redirecting to spoken_languages.html');
        window.location.href = 'spoken_languages.html';
    });
}

function addCertificate() {
    console.log('Adding certificate entry');
    
    const title = document.getElementById('certificate_title').value;
    const org = document.getElementById('organization').value;
    const date = document.getElementById('delivery_date').value;
    
    if (!title && !org) {
        alert('Please fill in at least certificate title or organization');
        return;
    }
    
    certificateEntries.push({
        name: title,
        organization: org,
        year: date
    });
    
    console.log('Certificate entries:', certificateEntries);
    localStorage.setItem('certificates', JSON.stringify(certificateEntries));
    
    // Clear form
    document.getElementById('certificate_title').value = '';
    document.getElementById('organization').value = '';
    document.getElementById('delivery_date').value = '';
    
    alert('Certificate entry added! Add another or click Next to continue.');
}

function removeCertificate() {
    if (certificateEntries.length > 0) {
        certificateEntries.pop();
        localStorage.setItem('certificates', JSON.stringify(certificateEntries));
        console.log('Removed last certificate entry');
        alert('Last certificate entry removed');
    } else {
        alert('No certificate entries to remove');
    }
}

// ========== LANGUAGES PAGE ==========
let languageEntries = [];

function setupLanguagesPage() {
    const form = document.getElementById('languagesForm');
    if (!form) return;
    
    console.log('Setting up languages page');
    
    // Load existing data
    const savedLanguages = localStorage.getItem('languages');
    if (savedLanguages) {
        languageEntries = JSON.parse(savedLanguages);
        console.log('Loaded language entries:', languageEntries);
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Languages form submitted');
        
        const language = document.getElementById('language').value;
        const proficiency = document.getElementById('proficiency_rating').value;
        
        // Add current entry if fields are filled
        if (language || proficiency) {
            languageEntries.push({
                language: language,
                level: proficiency
            });
        }
        
        console.log('Saving language entries:', languageEntries);
        localStorage.setItem('languages', JSON.stringify(languageEntries));
        
        // Navigate to activities page
        window.location.href = 'other_social_activities.html';
    });
}

function addLanguage() {
    console.log('Adding language entry');
    
    const language = document.getElementById('language').value;
    const proficiency = document.getElementById('proficiency_rating').value;
    
    if (!language) {
        alert('Please enter a language');
        return;
    }
    
    languageEntries.push({
        language: language,
        level: proficiency
    });
    
    console.log('Language entries:', languageEntries);
    localStorage.setItem('languages', JSON.stringify(languageEntries));
    
    // Clear form
    document.getElementById('language').value = '';
    document.getElementById('proficiency_rating').value = '';
    
    alert('Language entry added! Add another or click Next to continue.');
}

function removeLanguage() {
    if (languageEntries.length > 0) {
        languageEntries.pop();
        localStorage.setItem('languages', JSON.stringify(languageEntries));
        console.log('Removed last language entry');
        alert('Last language entry removed');
    } else {
        alert('No language entries to remove');
    }
}

// ========== ACTIVITIES PAGE ==========
let activityEntries = [];

function setupActivitiesPage() {
    const form = document.getElementById('other_social_activitiesForm');
    const nextBtn = document.getElementById('btn_next');
    
    if (!form) {
        console.error('Activities form not found! Check if form ID is "other_social_activitiesForm"');
        return;
    }
    
    if (!nextBtn) {
        console.error('Next button not found! Check if button ID is "btn_next"');
        return;
    }
    
    console.log('Setting up activities page');
    
    // Load existing data
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
        activityEntries = JSON.parse(savedActivities);
        console.log('Loaded activity entries:', activityEntries);
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Activities form submitted');
        
        const activity = document.getElementById('activity').value;
        const description = document.getElementById('description').value;
        const role = document.getElementById('role_or_title').value;
        const startDate = document.getElementById('start_date').value;
        const endDate = document.getElementById('end_date').value;
        
        // Add current entry if fields are filled
        if (activity || description) {
            activityEntries.push({
                activity: activity,
                description: description,
                role: role,
                startDate: startDate,
                endDate: endDate
            });
        }
        
        console.log('Saving activity entries:', activityEntries);
        localStorage.setItem('activities', JSON.stringify(activityEntries));
        
        // Now save to database and navigate
        console.log('=== FINAL STEP: Saving to database ===');
        saveToDatabase();
    });
}

function addSocialActivity() {
    console.log('Adding activity entry');
    
    const activity = document.getElementById('activity').value;
    const description = document.getElementById('description').value;
    const role = document.getElementById('role_or_title').value;
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;
    
    if (!activity && !description) {
        alert('Please fill in at least activity name or description');
        return;
    }
    
    activityEntries.push({
        activity: activity,
        description: description,
        role: role,
        startDate: startDate,
        endDate: endDate
    });
    
    console.log('Activity entries:', activityEntries);
    localStorage.setItem('activities', JSON.stringify(activityEntries));
    
    // Clear form
    document.getElementById('activity').value = '';
    document.getElementById('description').value = '';
    document.getElementById('role_or_title').value = '';
    document.getElementById('start_date').value = '';
    document.getElementById('end_date').value = '';
    
    alert('Activity entry added! Add another or click Next to finish.');
}

function removeSocialActivity() {
    if (activityEntries.length > 0) {
        activityEntries.pop();
        localStorage.setItem('activities', JSON.stringify(activityEntries));
        console.log('Removed last activity entry');
        alert('Last activity entry removed');
    } else {
        alert('No activity entries to remove');
    }
}

// ========== SAVE TO DATABASE ==========
async function saveToDatabase() {
    console.log('Saving all data to database...');
    
    // Show loading state
    const nextBtn = document.getElementById('btn_next');
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.textContent = 'Saving...';
    }
    
    try {
        // Collect all data from localStorage
        const resumeData = {
            personalInfo: JSON.parse(localStorage.getItem('personalInfo') || '{}'),
            summary: localStorage.getItem('summary') || '',
            education: JSON.parse(localStorage.getItem('education') || '[]'),
            experiences: JSON.parse(localStorage.getItem('experiences') || '[]'),
            certificates: JSON.parse(localStorage.getItem('certificates') || '[]'),
            languages: JSON.parse(localStorage.getItem('languages') || '[]'),
            activities: JSON.parse(localStorage.getItem('activities') || '[]')
        };
        
        console.log('Complete resume data:', resumeData);
        
        // Validate we have at least personal info
        if (!resumeData.personalInfo || Object.keys(resumeData.personalInfo).length === 0) {
            alert('Error: No personal information found. Please start from the beginning.');
            if (nextBtn) {
                nextBtn.disabled = false;
                nextBtn.textContent = 'Next';
            }
            return;
        }
        
        // Send to backend
        console.log('Sending POST request to /api/resume');
        const response = await fetch('/api/resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resumeData)
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Response data:', result);
        
        if (result.success) {
            console.log('Resume saved successfully with ID:', result.resumeId);
            
            // Store the resume ID
            localStorage.setItem('resumeId', result.resumeId);
            
            // Show success message
            alert('Resume saved successfully!');
            
            // Navigate to final resume page
            window.location.href = 'student_resume.html';
        } else {
            throw new Error(result.message || 'Failed to save resume');
        }
    } catch (error) {
        console.error('Error saving resume:', error);
        alert('Error saving resume to database. Please check:\n1. Server is running (npm start)\n2. MongoDB is connected\n3. Check browser console (F12) for details\n\nError: ' + error.message);
        
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent = 'Next';
        }
    }
}

// ========== DISPLAY FINAL RESUME ==========
function displayFinalResume() {
    console.log('Displaying final resume');
    
    const resumeId = localStorage.getItem('resumeId');
    
    if (resumeId) {
        // Fetch from database
        fetch(`/api/resume/${resumeId}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    renderResume(result.resume);
                } else {
                    // Fall back to localStorage
                    renderResumeFromLocalStorage();
                }
            })
            .catch(error => {
                console.error('Error fetching resume:', error);
                renderResumeFromLocalStorage();
            });
    } else {
        // Use localStorage data
        renderResumeFromLocalStorage();
    }
}

function renderResumeFromLocalStorage() {
    const resumeData = {
        personalInfo: JSON.parse(localStorage.getItem('personalInfo') || '{}'),
        summary: localStorage.getItem('summary') || '',
        education: JSON.parse(localStorage.getItem('education') || '[]'),
        experiences: JSON.parse(localStorage.getItem('experiences') || '[]'),
        certificates: JSON.parse(localStorage.getItem('certificates') || '[]'),
        languages: JSON.parse(localStorage.getItem('languages') || '[]'),
        activities: JSON.parse(localStorage.getItem('activities') || '[]')
    };
    
    renderResume(resumeData);
}

function renderResume(data) {
    console.log('Rendering resume with data:', data);
    
    // This function will populate your student_resume.html
    // You'll need to add the appropriate element IDs to that page
    
    // Example implementation:
    document.body.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="text-align: center;">Resume</h1>
            
            <section>
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> ${data.personalInfo.name || 'N/A'}</p>
                <p><strong>Email:</strong> ${data.personalInfo.email || 'N/A'}</p>
                <p><strong>Phone:</strong> ${data.personalInfo.phone || 'N/A'}</p>
                <p><strong>Address:</strong> ${data.personalInfo.address || 'N/A'}, ${data.personalInfo.city || ''}, ${data.personalInfo.region || ''}</p>
                <p><strong>Date of Birth:</strong> ${data.personalInfo.dateOfBirth || 'N/A'}</p>
                <p><strong>Gender:</strong> ${data.personalInfo.gender || 'N/A'}</p>
            </section>
            
            ${data.summary ? `
            <section>
                <h2>Professional Summary</h2>
                <p>${data.summary}</p>
            </section>
            ` : ''}
            
            ${data.education && data.education.length > 0 ? `
            <section>
                <h2>Education</h2>
                ${data.education.map(edu => `
                    <div style="margin-bottom: 15px;">
                        <p><strong>${edu.diploma || 'Diploma'}</strong></p>
                        <p>${edu.institution || 'Institution'} - ${edu.year || 'Year'}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${data.experiences && data.experiences.length > 0 ? `
            <section>
                <h2>Work Experience</h2>
                ${data.experiences.map(exp => `
                    <div style="margin-bottom: 15px;">
                        <p><strong>${exp.jobTitle || 'Position'}</strong> at ${exp.company || 'Company'}</p>
                        <p>${exp.city || ''}</p>
                        <p>${exp.startDate || ''} - ${exp.endDate || 'Present'}</p>
                        <p>${exp.description || ''}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
            
            ${data.certificates && data.certificates.length > 0 ? `
            <section>
                <h2>Professional Certifications</h2>
                <ul>
                    ${data.certificates.map(cert => `
                        <li>${cert.name || 'Certificate'} - ${cert.organization || ''} (${cert.year || ''})</li>
                    `).join('')}
                </ul>
            </section>
            ` : ''}
            
            ${data.languages && data.languages.length > 0 ? `
            <section>
                <h2>Languages</h2>
                <ul>
                    ${data.languages.map(lang => `
                        <li>${lang.language || 'Language'}: ${lang.level || 'Level'}</li>
                    `).join('')}
                </ul>
            </section>
            ` : ''}
            
            ${data.activities && data.activities.length > 0 ? `
            <section>
                <h2>Social Activities</h2>
                ${data.activities.map(act => `
                    <div style="margin-bottom: 15px;">
                        <p><strong>${act.activity || 'Activity'}</strong> ${act.role ? `- ${act.role}` : ''}</p>
                        <p>${act.description || ''}</p>
                        <p>${act.startDate || ''} - ${act.endDate || 'Present'}</p>
                    </div>
                `).join('')}
            </section>
            ` : ''}
            
            <div style="margin-top: 30px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Print Resume</button>
                <button onclick="window.location.href='index.html'" style="padding: 10px 20px; font-size: 16px; cursor: pointer; margin-left: 10px;">Create New Resume</button>
            </div>
        </div>
    `;
}

// ========== BACK BUTTON ==========
function setupBackButton() {
    const backBtn = document.getElementById('btn_back');
    if (backBtn) {
        backBtn.addEventListener('click', return_back);
    }
}

function return_back() {
    console.log('Back button clicked');
    window.history.back();
}

// Make functions available globally for onclick handlers
window.add_education = add_education;
window.remove_education = remove_education;
window.addExperience = addExperience;
window.removeExperience = removeExperience;
window.addCertificate = addCertificate;
window.removeCertificate = removeCertificate;
window.addLanguage = addLanguage;
window.removeLanguage = removeLanguage;
window.addSocialActivity = addSocialActivity;
window.removeSocialActivity = removeSocialActivity;
window.return_back = return_back;