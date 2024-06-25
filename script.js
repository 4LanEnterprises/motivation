document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = 'https://www.bible.com/verse-of-the-day';

    fetch(proxyUrl + encodeURIComponent(targetUrl))
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const imageElement = doc.querySelector('img'); // Assume the first image is the Quote of the Day image
            if (imageElement) {
                // Extract the 'srcset' attribute
                const srcset = imageElement.getAttribute('srcset');
                if (srcset) {
                    // Split the srcset to get the first URL
                    const relativeUrl = srcset.split(' ')[0];
                    const fullUrl = 'https://www.brainyquote.com' + relativeUrl; // Prepend the base URL
                    document.getElementById('quote-image').src = fullUrl;
                    document.getElementById('quote-image').style.display = 'block';
                    document.getElementById('quote').style.display = 'none';
                } else {
                    document.getElementById('quote').textContent = "quote image not found.";
                }
            } else {
                document.getElementById('quote').textContent = "quote image not found.";
            }
        })
        .catch(error => {
            console.error('Error fetching the quote of the day:', error);
            document.getElementById('quote').textContent = "Failed to load quote.";
        });
});
