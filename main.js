let timerInterval;
let seconds = 0;

fetch('db.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('characterContainer');
        const searchButton = document.getElementById('searchButton');
        const nameInput = document.getElementById('nameInput');
        const startButton = document.getElementById('startButton');
        const timerDisplay = document.getElementById('timer');

        // Create character cards
        data.characters.forEach(character => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.id = character.name;
            card.style.backgroundImage = `url(${character.image})`;

            const name = document.createElement('div');
            name.className = 'character-name';
            name.textContent = character.name;

            card.appendChild(name);
            container.appendChild(card);
        });

      // Function to handle character search
const searchCharacter = () => {
    const inputName = nameInput.value.trim();
    const characterCard = document.getElementById(inputName);
    const searchInputContainer = nameInput.parentElement; // Assuming nameInput is directly within a container

    // Clear previous styles
    nameInput.classList.remove('shake', 'border-error');

    if (characterCard) {
        // Change z-index for the found character card
        const nameDiv = characterCard.querySelector('.character-name');
        nameDiv.style.zIndex = 1; // Bring to front
        characterCard.style.border = '2px solid green';

        // Smoothly scroll to the character card
        characterCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Apply shaking and red border effect
        nameInput.classList.add('shake', 'border-error');
    }

    // Clear the input field
    nameInput.value = '';
};


        // Add event listener to the search button
        searchButton.addEventListener('click', searchCharacter);

        // Add event listener for "Enter" key press
        nameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                searchCharacter();
            }
        });

        // Start button logic
        startButton.addEventListener('click', () => {
            // Enable inputs and start button
            nameInput.disabled = false;
            searchButton.disabled = false;
            startButton.disabled = true;

            // Start the timer
            seconds = 0;
            timerDisplay.textContent = '00:00';
            timerInterval = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }, 1000);
        });
    })
    .catch(error => console.error('Error loading character data:', error))