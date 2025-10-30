
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        return; 
    }
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        

        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));

        showSuccessMessage();

        contactForm.reset();
        contactForm.classList.remove('was-validated');
    }, false);

    function showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.remove('d-none');

            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        }
    }

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailPattern.test(this.value)) {
                this.setCustomValidity('Пожалуйста, введите корректный email адрес');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.length < 2) {
                this.setCustomValidity('Имя должно содержать минимум 2 символа');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    const messageInput = document.getElementById('message');
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.length < 10) {
                this.setCustomValidity('Сообщение должно содержать минимум 10 символов');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});
