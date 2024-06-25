document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = 'https://www.brainyquote.com/quote_of_the_day';

    fetch(proxyUrl + encodeURIComponent(targetUrl))
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Find the image with the class 'p-qotd'
            const imageElement = doc.querySelector('img.p-qotd');

            if (imageElement) {
                const relativeUrl = imageElement.getAttribute('src');
                console.log('Relative URL:', relativeUrl); // Log the relative URL for debugging
                if (relativeUrl) {
                    const fullUrl = 'https://www.brainyquote.com' + relativeUrl; // Prepend the base URL
                    console.log('Full URL:', fullUrl); // Log the full URL for debugging
                    document.getElementById('quote-image').src = fullUrl;
                    document.getElementById('quote-image').style.display = 'block';
                    document.getElementById('quote').style.display = 'none';
                } else {
                    document.getElementById('quote').textContent = "Quote image not found.";
                }
            } else {
                document.getElementById('quote').textContent = "Quote image not found.";
            }
        })
        .catch(error => {
            console.error('Error fetching the quote of the day:', error);
            document.getElementById('quote').textContent = "Failed to load quote.";
        });
});
