const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const notesList = document.getElementById('notesList');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function save() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="note-text">${note}</span>
            <button class="delete-btn" data-index="${index}">✕</button>
        `;
        notesList.appendChild(li);
    })
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (!noteText) return;
    notes.push(noteText);
    save();
    noteInput.value = '';
    renderNotes();
}

addNoteBtn.addEventListener('click', addNote);

noteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addNote();
});

clearAllBtn.addEventListener('click', () => {
    if (confirm('Hapus semua catatan?')) {
        notes = [];
        save();
        renderNotes();
    }
});

notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idx = Number(e.target.dataset.index);
        notes.splice(idx, 1);
        save();
        renderNotes();
    }
});

renderNotes();
