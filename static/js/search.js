(function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchIndex = null;
    let searchTimeout = null;

    // Fetch the search index only when the user focuses on the input
    function initSearch() {
        if (searchIndex) return; // Already loaded

        fetch('/index.json')
            .then(response => response.json())
            .then(data => {
                searchIndex = data;
                searchInput.removeEventListener('focus', initSearch); // No need to listen anymore
            })
            .catch(error => {
                console.error('Error fetching search index:', error);
            });
    }

    searchInput.addEventListener('focus', initSearch);

    searchInput.addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase().trim();

        // Debounce search
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 150);
    });

    function performSearch(query) {
        if (!searchIndex || query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        const results = searchIndex.filter(item => {
            return item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query);
        });

        if (results.length > 0) {
            let resultHTML = '<ul>';
            results.slice(0, 10).forEach(result => { // Show top 10 results
                resultHTML += `<li><a href="${result.permalink}">${result.title}</a></li>`;
            });
            resultHTML += '</ul>';
            searchResults.innerHTML = resultHTML;
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<p>結果が見つかりません</p>';
            searchResults.style.display = 'block';
        }
    }

    // Hide results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
})();
