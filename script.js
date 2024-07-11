document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entry-form');
    const entriesContainer = document.getElementById('entries-container');

    // Загрузка записей из LocalStorage при загрузке страницы
    loadEntries();
    

    entryForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const date = document.getElementById('date').value;

        const entry = {
            id: Date.now(),
            title: title,
            content: content,
            date: date
        };

        addEntry(entry);
        saveEntry(entry);

        entryForm.reset();
    });

    function addEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.dataset.id = entry.id;

        const entryTitle = document.createElement('h3');
        entryTitle.textContent = entry.title;

        const entryContent = document.createElement('p');
        entryContent.textContent = entry.content;

        const entryDate = document.createElement('p');
        entryDate.textContent = `Date: ${entry.date}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteEntry(entry.id);
            entryDiv.remove();
        });

        entryDiv.appendChild(entryTitle);
        entryDiv.appendChild(entryContent);
        entryDiv.appendChild(entryDate);
        entryDiv.appendChild(deleteButton);

        entriesContainer.appendChild(entryDiv);
    }

    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadEntries() {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => addEntry(entry));
    }

    function deleteEntry(id) {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

});
