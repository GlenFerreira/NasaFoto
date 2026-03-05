document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('dateInput');
    const searchBtn = document.getElementById('searchBtn');
    const errorMsg = document.getElementById('errorMsg');
    const loader = document.getElementById('loader');
    const resultSection = document.getElementById('resultSection');
    
    const mediaContainer = document.getElementById('mediaContainer');
    const apodTitle = document.getElementById('apodTitle');
    const apodDate = document.getElementById('apodDate');
    const apodExplanation = document.getElementById('apodExplanation');
    const apodCopyright = document.getElementById('apodCopyright');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;

    // Default value can be today
    dateInput.value = today;

    searchBtn.addEventListener('click', fetchApodData);
    dateInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') fetchApodData();
    });

    async function fetchApodData() {
        const dateVal = dateInput.value;
        
        if (!dateVal) {
            showError("Por favor, selecione uma data.");
            return;
        }
        
        if (dateVal > today) {
            showError("Você não pode selecionar uma data no futuro!");
            return;
        }

        // Hide result, show loader
        errorMsg.textContent = "";
        resultSection.classList.add('hidden');
        loader.style.display = 'flex';
        
        // Add loading state to button
        searchBtn.disabled = true;
        searchBtn.style.opacity = '0.7';

        try {
            // Call our local Python backend API
            const response = await fetch(`http://127.0.0.1:5000/api/apod?date=${dateVal}`);
            
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            
            // Format Portuguese Date
            const dateObj = new Date(data.date + 'T00:00:00');
            const ptDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(dateObj);

            renderApod(data, ptDate);

        } catch (error) {
            console.error(error);
            showError("Não foi possível carregar a imagem desta data. Tente explorar outra maravilha cósmica!");
        } finally {
            loader.style.display = 'none';
            searchBtn.disabled = false;
            searchBtn.style.opacity = '1';
        }
    }

    function renderApod(data, ptDate) {
        // Clear media
        mediaContainer.innerHTML = '';

        // Handle Image vs Video
        if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.frameBorder = '0';
            iframe.allow = 'encrypted-media';
            iframe.allowFullscreen = true;
            mediaContainer.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = data.url; // could also use data.hdurl for high-res
            img.alt = data.title;
            mediaContainer.appendChild(img);
        }

        apodTitle.textContent = data.title;
        apodDate.textContent = ptDate;
        
        // Using translation API would be cool here, but for now we display english or whatever NASA returns
        // We could theoretically translate the description in the backend Python if needed, 
        // but let's stick to returning NASA data.
        apodExplanation.textContent = data.explanation;
        
        if (data.copyright) {
            apodCopyright.innerHTML = `&copy; ${data.copyright}`;
        } else {
            apodCopyright.textContent = "Domínio Público / NASA";
        }

        // Add a slight delay for smooth entry
        setTimeout(() => {
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        // Optionally shake input
        dateInput.style.transform = "translateX(-10px)";
        setTimeout(() => dateInput.style.transform = "translateX(10px)", 100);
        setTimeout(() => dateInput.style.transform = "translateX(-10px)", 200);
        setTimeout(() => dateInput.style.transform = "translateX(10px)", 300);
        setTimeout(() => dateInput.style.transform = "none", 400);
    }
});
