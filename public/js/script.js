const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeSound = document.getElementById('theme-sound');

// Function to update the theme icon based on the current theme
const updateThemeIcon = (isDarkMode) => {
    const themeMode = isDarkMode ? 'darkMode' : 'lightMode';
    const iconPath = themeIcon.querySelector('use').getAttribute('href').replace(/#.*$/, `#${themeMode}`);
    themeIcon.querySelector('use').setAttribute('href', iconPath);
};

// Function to update the theme based on the current mode
const updateTheme = (isDarkMode) => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(isDarkMode);
};

// Function to toggle the theme
const toggleTheme = () => {
    const isDarkMode = toggleButton.checked;
    updateTheme(isDarkMode);
    themeSound.play();
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Add transition class to body for smooth transition
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
};

// Event listener for theme toggle
toggleButton.addEventListener('change', toggleTheme);

// Function to initialize the theme based on the stored preference
const initializeTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);
    toggleButton.checked = isDarkMode;
    updateTheme(isDarkMode);
};

// Initialize the theme
initializeTheme();

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', initializeTheme);

// Initialize PostHog
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

// Initialize PostHog with your project API key
posthog.init('phc_CzCsR8kLTf58Wbn9QMIGvHzlXMfZJJHocnHoPwwTrac', {
    api_host: 'https://eu.i.posthog.com'  // Note: Using EU endpoint
});

// Track page views
document.addEventListener('DOMContentLoaded', function() {
    posthog.capture('$pageview');
});

// Track specific link clicks
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    // Track drex.guide clicks
    if (link.href.includes('drex.guide')) {
        posthog.capture('drex_guide_click', {
            location: 'homepage'
        });
    }
    
    // Track thesis clicks
    if (link.href.includes('/thesis')) {
        posthog.capture('thesis_click', {
            location: 'homepage'
        });
    }
    
    // Track LinkedIn clicks
    if (link.href.includes('linkedin.com')) {
        posthog.capture('linkedin_profile_click', {
            location: 'homepage'
        });
    }
    
    // Track thesis PDF downloads
    if (link.href.includes('thesis.pdf')) {
        posthog.capture('thesis_pdf_download', {
            location: 'thesis_page',
            trigger: link.hasAttribute('download') ? 'download_button' : 'direct_link'
        });
    }
});
