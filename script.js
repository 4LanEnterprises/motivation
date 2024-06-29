document.addEventListener("DOMContentLoaded", () => {
    const proxyUrl = 'https://your-cors-proxy.herokuapp.com/proxy?url=';
    const targetUrl = encodeURIComponent('https://www.brainyquote.com/quote_of_the_day');

    fetch(proxyUrl + targetUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Log the entire HTML for debugging
        console.log('Fetched HTML:', doc.documentElement.innerHTML);

        // Find the image with the class 'p-qotd'
        const imageElement = doc.querySelector('img.p-qotd');
        console.log('Image Element:', imageElement); // Log the image element for debugging

        if (imageElement) {
            // Extract the 'srcset' attribute and find the URL for 1200w
            const srcset = imageElement.getAttribute('srcset');
            console.log('Srcset:', srcset); // Log the srcset for debugging

            const srcsetParts = srcset.split(',').map(part => part.trim());
            const highResImage = srcsetParts.find(part => part.includes('1200w')).split(' ')[0];
            console.log('High Res Image URL:', highResImage); // Log the high res image URL for debugging

            if (highResImage) {
                const fullUrl = 'https://www.brainyquote.com' + highResImage; // Prepend the base URL
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
