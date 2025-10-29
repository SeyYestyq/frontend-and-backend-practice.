// Diary Form - Обработка формы добавления записей в дневник
document.addEventListener('DOMContentLoaded', function() {
    const diaryForm = document.getElementById('diaryForm');
    
    if (!diaryForm) {
        return; // Выйти, если форма не найдена
    }
    
    diaryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получить значения из формы
        const date = document.getElementById('entryDate').value;
        const title = document.getElementById('entryTitle').value;
        const description = document.getElementById('entryDescription').value;
        const status = document.getElementById('entryStatus').value;
        
        // Проверить, что все поля заполнены
        if (!date || !title || !description || !status) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Создать новую запись
        const entry = {
            date: date,
            title: title,
            description: description,
            status: status,
            id: Date.now()
        };
        
        // Сохранить в localStorage
        let entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        entries.unshift(entry); // Добавить в начало массива
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        
        // Добавить запись в DOM
        addEntryToTimeline(entry);
        
        // Очистить форму
        diaryForm.reset();
        
        // Показать сообщение об успехе
        showSuccessMessage('Запись успешно добавлена!');
    });
    
    // Функция добавления записи в timeline
    function addEntryToTimeline(entry) {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        const statusBadge = entry.status === 'completed' 
            ? '<span class="badge bg-success ms-2"><i class="bi bi-check-circle-fill"></i> Завершено</span>'
            : '<span class="badge bg-warning ms-2"><i class="bi bi-hourglass-split"></i> В процессе</span>';
        
        const entryHTML = `
            <div class="timeline-item mb-4 pb-4 border-bottom">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="badge ${entry.status === 'completed' ? 'bg-success' : 'bg-warning'} me-2">${formatDate(entry.date)}</span>
                        <span class="fw-bold">${entry.title}</span>
                        ${statusBadge}
                    </div>
                </div>
                <p class="text-muted mt-2 mb-0">${entry.description}</p>
            </div>
        `;
        
        timeline.insertAdjacentHTML('afterbegin', entryHTML);
    }
    
    // Функция форматирования даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    }
    
    // Функция показа сообщения об успехе
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show mt-3';
        alert.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        diaryForm.parentElement.insertBefore(alert, diaryForm.nextSibling);
        
        // Автоматически скрыть через 3 секунды
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 3000);
    }
    
    // Загрузить сохраненные записи при загрузке страницы
    function loadSavedEntries() {
        const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        entries.forEach(entry => {
            // Добавить только новые записи (созданные пользователем)
            // Проверить, чтобы не дублировать записи, которые уже есть в HTML
        });
    }
    
    loadSavedEntries();
});
