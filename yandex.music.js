(async function() {
    const usernameElement = document.querySelector('.PageHeaderPlaylistMeta_root__9SHZ0 span[title]');
    const username = usernameElement ? usernameElement.getAttribute('title') : 'playlist';

    const seenLabels = new Set();
    let maxIndex = -1;
    let noNewAttempts = 0;
    const allTracks = [];

    const container = document.querySelector('div.VirtualScroll_scroller_withFooter__ntDaU.VirtualScroll_scroller_withForceScroll__w7q1L');

    let initialElements = container.querySelectorAll('[data-index] [class*="CommonTrack_root__i6shE"]');
    initialElements.forEach(el => {
        const dataIndex = parseInt(el.closest('[data-index]').getAttribute('data-index')) || 0;
        if (dataIndex > maxIndex) {
            const label = el.getAttribute('aria-label');
            if (label && !seenLabels.has(label)) {
                seenLabels.add(label);
                console.log(label);
                allTracks.push(label);
            }
            maxIndex = Math.max(maxIndex, dataIndex);
        }
    });

    while (true) {
        const previousMaxIndex = maxIndex;
        container.scrollBy(0, 500);
        await new Promise(resolve => setTimeout(resolve, 300));

        const trackElements = container.querySelectorAll('[data-index] [class*="CommonTrack_root__i6shE"]');
        const newLabels = [];
        trackElements.forEach(el => {
            const dataIndex = parseInt(el.closest('[data-index]').getAttribute('data-index')) || 0;
            if (dataIndex > maxIndex) {
                const label = el.getAttribute('aria-label');
                if (label && !seenLabels.has(label)) {
                    seenLabels.add(label);
                    newLabels.push(label);
                    allTracks.push(label);
                }
                maxIndex = Math.max(maxIndex, dataIndex);
            }
        });

        if (newLabels.length > 0) {
            newLabels.forEach(label => console.log(label));
            noNewAttempts = 0;
        } else {
            noNewAttempts++;
            if (noNewAttempts >= 5) break;
        }
    }

    container.scrollTo(0, 0);
    console.log(`Всего треков: ${seenLabels.size}`);

    const content = allTracks.join('\n');
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${username}.txt`;
    a.click();
    URL.revokeObjectURL(url);
})();
