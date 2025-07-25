let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");



// Load voices properly, ensuring all voices are available before selecting one
function loadVoices() {
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length !== 0) {
            resolve(voices);
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve(voices);
            };
        }
    });
}

// Function to speak text with selected voice and adjust speed for small text
async function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);

    let voices = await loadVoices(); // Load available voices

    // Find a Google Assistant-like voice from the list
    let assistantVoice = voices.find(voice => 
        voice.name.includes("Google US English") || 
        voice.name.includes("Google UK English Female") || 
        voice.name.includes("Google UK English Male")
    );

    // Set the assistant voice if available, otherwise use default
    if (assistantVoice) {
        text_speak.voice = assistantVoice;
    } else {
        console.warn("Google Assistant-like voice not found, using default voice.");
    }

    // Adjust rate dynamically based on text length for more natural speech
    if (text.length < 30) {
        text_speak.rate = 0.85;  // Slightly slower rate for smaller texts
    } else if (text.length < 100) {
        text_speak.rate = 0.95;  // Natural rate for moderate text
    } else {
        text_speak.rate = 1.0;   // Slightly faster for long texts
    }

    // Add subtle pitch variation for more natural sound
    text_speak.pitch = Math.random() * (1.05 - 0.95) + 0.95;  // Random pitch between 0.95 and 1.05

    text_speak.volume = 1;  // Set volume to maximum (can be adjusted)
    text_speak.lang = "en-US";  // Use US English for a Google Assistant-like sound

    // Speak the text
    window.speechSynthesis.speak(text_speak);
}

// Helper function to load voices
function loadVoices() {
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length !== 0) {
            resolve(voices);
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve(voices);
            };
        }
    });
}




// Function to wish based on time of day
function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// On page load, greet the user
window.addEventListener('load', () => {
    wishMe();
});

// Check if the browser supports SpeechRecognition API
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.lang = "en-IN"; // Set recognition language

    recognition.onresult = (event) => {
        console.log(event.results); // Log the results for debugging
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error); // Log any errors
        alert("Speech recognition error: " + event.error);
    };

    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none"; // Hide the button while listening
        voice.style.display = "block"; // Show voice icon while listening
    });
} else {
    alert("Speech recognition not supported in this browser. Please use Google Chrome.");
}

// Process the recognized command
function takeCommand(message) {
    btn.style.display = "flex"; // Re-show button after recognition
    voice.style.display = "none"; // Hide voice icon

    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello, I am Shifra, what can I help you with?");
    }
    else if (message.includes("who are you")) {
        speak("Hello, I am Shifra, your virtual assistant made by Suman.");
    }
    else if (message.includes("who is suman") || message.includes("who is sumon")) {
        speak("sumon, is my god, because, he made me, and sumon, is also your friend");
    }
    else if (message.includes("what is the weather today")) {
        speak("I don't have access to real-time data, but you can check your local weather app.");
    }
    else if (message.includes("what time is it now")) {
        let currentTime = new Date().toLocaleTimeString();
        speak("The current time is " + currentTime);
    }
    else if (message.includes("what is the date today")) {
        let currentDate = new Date().toLocaleDateString();
        speak("Today's date is " + currentDate);
    }
    if (message.includes("who founded the tata group in india")) {
        speak("Jamsetji Tata founded the Tata Group in India.");
    }
    else if (message.includes("what is the capital of india")) {
        speak("The capital of India is New Delhi.");
    }
    else if (message.includes("who is the president of the united states")) {
        speak("The current president of the United States is Joe Biden.");
    }
    else if (message.includes("who invented the telephone")) {
        speak("Alexander Graham Bell invented the telephone.");
    }
    else if (message.includes("what is the tallest mountain in the world")) {
        speak("Mount Everest is the tallest mountain in the world.");
    }
    else if (message.includes("who wrote harry potter")) {
        speak("J.K. Rowling wrote the Harry Potter series.");
    }
    else if (message.includes("what is the speed of light")) {
        speak("The speed of light is approximately 299,792 kilometers per second.");
    }
    else if (message.includes("what is the largest ocean in the world")) {
        speak("The Pacific Ocean is the largest ocean in the world.");
    }
    else if (message.includes("who was the first man on the moon")) {
        speak("Neil Armstrong was the first man to walk on the moon.");
    }
    else if (message.includes("what is the national animal of india")) {
        speak("The national animal of India is the Bengal tiger.");
    }
    else if (message.includes("how many continents are there")) {
        speak("There are seven continents.");
    }
    else if (message.includes("what is the chemical formula for water")) {
        speak("The chemical formula for water is H2O.");
    }
    else if (message.includes("who painted the mona lisa")) {
        speak("Leonardo da Vinci painted the Mona Lisa.");
    }
    else if (message.includes("what is the longest river in the world")) {
        speak("The Nile is considered the longest river in the world.");
    }
    else if (message.includes("who is the ceo of google")) {
        speak("The CEO of Google is Sundar Pichai.");
    }
    else if (message.includes("what is the boiling point of water")) {
        speak("The boiling point of water is 100 degrees Celsius.");
    }
    else if (message.includes("what is the capital of france")) {
        speak("The capital of France is Paris.");
    }
    else if (message.includes("who wrote the national anthem of india")) {
        speak("Rabindranath Tagore wrote the national anthem of India.");
    }
    else if (message.includes("what is the smallest country in the world")) {
        speak("Vatican City is the smallest country in the world.");
    }
    else if (message.includes("what is the square root of 144")) {
        speak("The square root of 144 is 12.");
    }
    else if (message.includes("who invented the airplane")) {
        speak("The Wright brothers, Orville and Wilbur, invented the airplane.");
    }
    else if (message.includes("what is the hardest natural substance on earth")) {
        speak("Diamond is the hardest natural substance on Earth.");
    }
    else if (message.includes("how many bones are there in the human body")) {
        speak("There are 206 bones in the adult human body.");
    }
    else if (message.includes("what is the largest desert in the world")) {
        speak("The Sahara Desert is the largest hot desert, but Antarctica is the largest desert overall.");
    }
    else if (message.includes("who discovered gravity")) {
        speak("Sir Isaac Newton is credited with the discovery of gravity.");
    }
    else if (message.includes("what is the main ingredient in bread")) {
        speak("The main ingredient in bread is flour.");
    }
    else if (message.includes("who invented the light bulb")) {
        speak("Thomas Edison is credited with inventing the light bulb.");
    }
    else if (message.includes("what is the population of the world")) {
        speak("As of 2023, the world population is over 8 billion people.");
    }
    else if (message.includes("what is the chemical symbol for gold")) {
        speak("The chemical symbol for gold is Au.");
    }
    else if (message.includes("who was the first president of the united states")) {
        speak("George Washington was the first president of the United States.");
    }
    else if (message.includes("what is the distance from the earth to the sun")) {
        speak("The distance from the Earth to the Sun is about 93 million miles or 150 million kilometers.");
    }
    else if (message.includes("what is the biggest planet in our solar system")) {
        speak("Jupiter is the biggest planet in our solar system.");
    }
    else if (message.includes("who invented the internet")) {
        speak("The development of the internet was a collaborative effort by many, but key figures include Vint Cerf and Bob Kahn.");
    }
    else if (message.includes("how many states are there in the united states")) {
        speak("There are 50 states in the United States.");
    }
    else if (message.includes("what is the capital of japan")) {
        speak("The capital of Japan is Tokyo.");
    }
    else if (message.includes("what is the fastest land animal")) {
        speak("The cheetah is the fastest land animal.");
    }
    else if (message.includes("what is the most spoken language in the world")) {
        speak("The most spoken language in the world is English, followed by Mandarin Chinese.");
    }
    else if (message.includes("what is the formula for calculating force")) {
        speak("The formula for calculating force is F = ma, where F is force, m is mass, and a is acceleration.");
    }
    else if (message.includes("who was the first woman to win a nobel prize")) {
        speak("Marie Curie was the first woman to win a Nobel Prize.");
    }
    else if (message.includes("what is the largest organ in the human body")) {
        speak("The skin is the largest organ in the human body.");
    }
    else if (message.includes("who invented the computer")) {
        speak("Charles Babbage is considered the 'father of the computer' for designing the first mechanical computer.");
    }
    else if (message.includes("what is the most abundant gas in the earth's atmosphere")) {
        speak("Nitrogen is the most abundant gas in the Earth's atmosphere.");
    }
    else if (message.includes("who is the richest person in the world")) {
        speak("As of 2023, Elon Musk is considered the richest person in the world.");
    }
    else if (message.includes("what is the smallest planet in our solar system")) {
        speak("Mercury is the smallest planet in our solar system.");
    }
    else if (message.includes("what is the national bird of india")) {
        speak("The national bird of India is the Indian peacock.");
    }
    else if (message.includes("who developed the theory of relativity")) {
        speak("Albert Einstein developed the theory of relativity.");
    }
    else if (message.includes("what is the main ingredient in sushi")) {
        speak("Rice is the main ingredient in sushi.");
    }
    else if (message.includes("who discovered penicillin")) {
        speak("Sir Alexander Fleming discovered penicillin.");
    }
    else if (message.includes("what is the highest-grossing movie of all time")) {
        speak("As of 2023, 'Avatar' remains the highest-grossing movie of all time.");
    }
    else if (message.includes("how many planets are there in our solar system")) {
        speak("There are eight planets in our solar system.");
    }
    else if (message.includes("what is the capital of russia")) {
        speak("The capital of Russia is Moscow.");
    }
    else if (message.includes("what is the largest animal in the world")) {
        speak("The blue whale is the largest animal in the world.");
    }
    else if (message.includes("who discovered electricity")) {
        speak("Benjamin Franklin is often credited with discovering electricity.");
    }
    else if (message.includes("how many colors are there in a rainbow")) {
        speak("There are seven colors in a rainbow: red, orange, yellow, green, blue, indigo, and violet.");
    }
    else if (message.includes("who painted the sistine chapel ceiling")) {
        speak("Michelangelo painted the Sistine Chapel ceiling.");
    }
    else if (message.includes("what is the hottest planet in our solar system")) {
        speak("Venus is the hottest planet in our solar system.");
    }
    else if (message.includes("what is the smallest bone in the human body")) {
        speak("The stapes, a bone in the middle ear, is the smallest bone in the human body.");
    }
    else if (message.includes("who was the first woman to fly solo across the atlantic")) {
        speak("Amelia Earhart was the first woman to fly solo across the Atlantic Ocean.");
    }
    else if (message.includes("what is the capital of italy")) {
        speak("The capital of Italy is Rome.");
    }
    else if (message.includes("how many moons does mars have")) {
        speak("Mars has two moons: Phobos and Deimos.");
    }
    else if (message.includes("what is the pythagorean theorem")) {
        speak("The Pythagorean Theorem states that in a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.");
    }
    else if (message.includes("who was the first indian woman in space")) {
        speak("Kalpana Chawla was the first Indian woman in space.");
    }
    else if (message.includes("who invented the radio")) {
        speak("Guglielmo Marconi is credited with the invention of the radio.");
    }
    else if (message.includes("what is the the chemical formula of carbon dioxide")) {
        speak("The chemical formula for carbon dioxide is CO2.");
    }
    else if (message.includes("who is the president of the United States")) {
        speak("As of 2024, the President of the United States is Joe Biden.");
    }
    else if (message.includes("how far is the moon from Earth")) {
        speak("The average distance from Earth to the moon is about 384,400 kilometers.");
    }
    else if (message.includes("what is 10 plus 15")) {
        speak("10 plus 15 equals 25.");
    }
    else if (message.includes("tell me a joke")) {
        speak("Why don't skeletons fight each other? Because they don't have the guts!");
    }
    else if (message.includes(" what is the capital of france")) {
        speak("The capital of France is Paris.");
    }
    else if (message.includes("how do you spell intelligent")) {
        speak("Intelligent is spelled I-N-T-E-L-L-I-G-E-N-T.");
    }
    else if (message.includes("what is the square root of 64")) {
        speak("The square root of 64 is 8.");
    }
    else if (message.includes("who created you")) {
        speak("I was created by Suman Maity.");
    }
    else if (message.includes("what is your name")) {
        speak("I am Shifra, your virtual assistant made by Suman.");
    }
    else if (message.includes("how are you today")) {
        speak("I'm just a program, but I'm here to help you!");
    }
    else if (message.includes("what is the tallest mountain in the world")) {
        speak("The tallest mountain in the world is Mount Everest.");
    }
    else if (message.includes("what is the fastest animal on the land")) {
        speak("The fastest land animal is the cheetah.");
    }
    else if (message.includes("who wrote romeo and juliet")) {
        speak("Romeo and Juliet was written by William Shakespeare.");
    }
    else if (message.includes("what is the boiling point of water")) {
        speak("The boiling point of water is 100 degrees Celsius at standard atmospheric pressure.");
    }
    else if (message.includes("what are the colour of the rainbow")) {
        speak("The colors of the rainbow are red, orange, yellow, green, blue, indigo, and violet.");
    }
    else if (message.includes("who discovered penicillin")) {
        speak("Penicillin was discovered by Alexander Fleming.");
    }
    else if (message.includes("what is the currency of japan")) {
        speak("The currency of Japan is the yen.");
    }
    else if (message.includes("can you play music")) {
        speak("I can't play music right now, but you can use your favorite music app!");
    }
    else if (message.includes("what is the largest planet in our solar system")) {
        speak("The largest planet in our solar system is Jupiter.");
    }
    else if (message.includes("how many continents are there")) {
        speak("There are seven continents: Africa, Antarctica, Asia, Europe, North America, Australia, and South America.");
    }
    else if (message.includes("what is the main ingredient in guacamole")) {
        speak("The main ingredient in guacamole is avocado.");
    }
    else if (message.includes("what is a fun fact about space")) {
        speak("A fun fact about space is that it is completely silent, as there is no atmosphere to carry sound.");
    }
    else if (message.includes("how do you say hello in Spanish")) {
        speak("In Spanish, you say 'Hola' to greet someone.");
    }
    else if (message.includes("what is the speed of light")) {
        speak("The speed of light is approximately 299,792 kilometers per second.");
    }
    else if (message.includes("who was the first person to walk on the moon")) {
        speak("The first person to walk on the moon was Neil Armstrong in 1969.");
    }
    else if (message.includes("how many bones are there in the human body")) {
        speak("There are 206 bones in the adult human body.");
    }
    else if (message.includes("what is the largest ocean on Earth")) {
        speak("The Pacific Ocean is the largest ocean on Earth.");
    }
    else if (message.includes("who invented the telephone")) {
        speak("The telephone was invented by Alexander Graham Bell.");
    }
    else if (message.includes("what is the capital of India")) {
        speak("The capital of India is New Delhi.");
    }
    else if (message.includes("what is 50 times 5")) {
        speak("50 times 5 equals 250.");
    }
    else if (message.includes("what does DNA stand for")) {
        speak("DNA stands for Deoxyribonucleic Acid.");
    }
    else if (message.includes("what is the national animal of the United States")) {
        speak("The national animal of the United States is the bald eagle.");
    }
    else if (message.includes("how many planets are in the solar system")) {
        speak("There are 8 planets in the solar system.");
    }
    else if (message.includes("what is the chemical symbol for water")) {
        speak("The chemical symbol for water is H2O.");
    }
    else if (message.includes("what is the hottest planet in the solar system")) {
        speak("The hottest planet in the solar system is Venus.");
    }
    else if (message.includes("who painted the Mona Lisa")) {
        speak("The Mona Lisa was painted by Leonardo da Vinci.");
    }
    else if (message.includes("what is the deepest point in the ocean")) {
        speak("The deepest point in the ocean is the Mariana Trench.");
    }
    else if (message.includes("how do you make a paper airplane")) {
        speak("To make a paper airplane, fold a sheet of paper in half lengthwise, then fold down the top corners towards the center. Fold the sides again to make wings, and you're ready to fly!");
    }
    else if (message.includes("what is the most spoken language in the world")) {
        speak("The most spoken language in the world is English, followed closely by Mandarin Chinese.");
    }
    else if (message.includes("how old is the earth")) {
        speak("The Earth is approximately 4.5 billion years old.");
    }
    else if (message.includes("what is the longest river in the world")) {
        speak("The longest river in the world is the Nile River.");
    }
    else if (message.includes("who is the richest person in the world")) {
        speak("As of 2024, the richest person in the world is Elon Musk.");
    }
    else if (message.includes("what is 100 divided by 4")) {
        speak("100 divided by 4 equals 25.");
    }
    else if (message.includes("what is the largest desert in the world")) {
        speak("The largest desert in the world is the Sahara Desert.");
    }
    else if (message.includes("who was the first president of the United States")) {
        speak("The first president of the United States was George Washington.");
    }
    else if (message.includes("how many hours are in a day")) {
        speak("There are 24 hours in a day.");
    }
    else if (message.includes("what is the tallest building in the world")) {
        speak("The tallest building in the world is the Burj Khalifa in Dubai.");
    }
    else if (message.includes("what is the capital of the japan")) {
        speak("The capital of Japan is Tokyo.");
    }
    else if (message.includes("what is the freezing point of water")) {
        speak("The freezing point of water is 0 degrees Celsius or 32 degrees Fahrenheit.");
    }
    else if (message.includes("who discovered gravity")) {
        speak("Gravity was discovered by Sir Isaac Newton.");
    }
    else if (message.includes("how many countries are there in the world")) {
        speak("There are 195 countries in the world.");
    }
    else if (message.includes("what is the smallest country in the world")) {
        speak("The smallest country in the world is Vatican City.");
    }
    else if (message.includes("what year did world war 2 end")) {
        speak("World War II ended in 1945.");
    }
    else if (message.includes("what is the most popular sport in the world")) {
        speak("The most popular sport in the world is football, also known as soccer.");
    }
    else if (message.includes("what is the longest day of the year")) {
        speak("The longest day of the year is the Summer Solstice, usually around June 21st.");
    }
    else if (message.includes("how many teeth does an adult human have")) {
        speak("An adult human has 32 teeth.");
    }
    else if (message.includes("what is the heaviest animal in the world")) {
        speak("The heaviest animal in the world is the blue whale.");
    }
    else if (message.includes("what is the largest continent")) {
        speak("The largest continent is Asia.");
    }
    else if (message.includes("how many days are in a leap year")) {
        speak("A leap year has 366 days.");
    }
    else if (message.includes("who wrote harry potter")) {
        speak("Harry Potter was written by J.K. Rowling.");
    }
    else if (message.includes("what is the most abundant gas in Earth's atmosphere")) {
        speak("The most abundant gas in Earth's atmosphere is nitrogen, making up about 78%.");
    }
    else if (message.includes("what year was internet invented")) {
        speak("The internet was invented in 1983.");
    }
    else if (message.includes("how long does it take to travel in the moon")) {
        speak("It takes about 3 days to travel to the moon.");
    }
    else if (message.includes("how are you")) {
        speak("I am fine. Tell me about yourself");
    }
    else if (message.includes("how many continents are there")) {
        speak("There are 7 continents.");
    }
    else if (message.includes("what is the hottest place on Earth")) {
        speak("The hottest place on Earth is Death Valley, California.");
    }
    else if (message.includes("what is the boiling point of water")) {
        speak("The boiling point of water is 100 degrees Celsius or 212 degrees Fahrenheit.");
    }
    else if (message.includes("what is the fastest land animal")) {
        speak("The fastest land animal is the cheetah.");
    }
    else if (message.includes("what is the national bird of the United States")) {
        speak("The national bird of the United States is the bald eagle.");
    }
    else if (message.includes("what is the tallest mountain in the world")) {
        speak("The tallest mountain in the world is Mount Everest.");
    }
    else if (message.includes("who is the richest woman in the world")) {
        speak("As of 2024, the richest woman in the world is Francoise Bettencourt Meyers.");
    }
    else if (message.includes("what is the most expensive car in the world")) {
        speak("As of 2024, the most expensive car in the world is the Bugatti La Voiture Noire.");
    }
    else if (message.includes("what is the capital of Australia")) {
        speak("The capital of Australia is Canberra.");
    }
    else if (message.includes("what is the fastest bird in the world")) {
        speak("The fastest bird in the world is the peregrine falcon.");
    }
    else if (message.includes("what is the largest island in the world")) {
        speak("The largest island in the world is Greenland.");
    }
    else if (message.includes("who painted the Last Supper")) {
        speak("The Last Supper was painted by Leonardo da Vinci.");
    }
    else if (message.includes("how many stars are in the Milky Way galaxy")) {
        speak("There are about 100 to 400 billion stars in the Milky Way galaxy.");
    }
    else if (message.includes("what is the most visited country in the world")) {
        speak("The most visited country in the world is France.");
    }
    else if (message.includes("what is the national sport of Canada")) {
        speak("The national sport of Canada is ice hockey.");
    }
    else if (message.includes("what is the atomic number of carbon")) {
        speak("The atomic number of carbon is 6.");
    }
    else if (message.includes("how many seconds are in a day")) {
        speak("There are 86,400 seconds in a day.");
    }
    else if (message.includes("who is the prime minister of India")) {
        speak("As of 2024, the Prime Minister of India is Narendra Modi.");
    }
    else if (message.includes("what is the most populated country in the world")) {
        speak("The most populated country in the world is China.");
    }
    else if (message.includes("what is the distance between the Earth and the Sun")) {
        speak("The distance between the Earth and the Sun is about 93 million miles, or 150 million kilometers.");
    }
    else if (message.includes("what is the capital of Egypt")) {
        speak("The capital of Egypt is Cairo.");
    }
    else if (message.includes("who invented the airplane")) {
        speak("The airplane was invented by the Wright brothers.");
    }
    else if (message.includes("who wrote the Odyssey")) {
        speak("The Odyssey was written by Homer.");
    }
    else if (message.includes("how long is a marathon")) {
        speak("A marathon is 42.195 kilometers, or 26.2 miles.");
    }
    else if (message.includes("who invented the light bulb")) {
        speak("The light bulb was invented by Thomas Edison.");
    }
    else if (message.includes("how many moons does Jupiter have")) {
        speak("Jupiter has 79 moons.");
    }
    else if (message.includes("who was the first woman in space")) {
        speak("The first woman in space was Valentina Tereshkova.");
    }
    else if (message.includes("how many bones does a shark have")) {
        speak("Sharks have no bones, their skeletons are made of cartilage.");
    }
    else if (message.includes("what is the tallest waterfall in the world")) {
        speak("The tallest waterfall in the world is Angel Falls in Venezuela.");
    }
    else if (message.includes("how many elements are in the periodic table")) {
        speak("There are 118 elements in the periodic table.");
    }
    else if (message.includes("what is the smallest bone in the human body")) {
        speak("The smallest bone in the human body is the stapes, found in the ear.");
    }
    else if (message.includes("what is the longest bone in the human body")) {
        speak("The longest bone in the human body is the femur, also known as the thigh bone.");
    }
    else if (message.includes("who discovered electricity")) {
        speak("Electricity was discovered by Benjamin Franklin.");
    }
    else if (message.includes("what is the hardest natural substance on Earth")) {
        speak("The hardest natural substance on Earth is diamond.");
    }
    else if (message.includes("who wrote Romeo and Juliet")) {
        speak("Romeo and Juliet was written by William Shakespeare.");
    }
    else if (message.includes("how long does light take to travel from the Sun to Earth")) {
        speak("Light takes about 8 minutes and 20 seconds to travel from the Sun to Earth.");
    }
    else if (message.includes("what is the largest mammal")) {
        speak("The largest mammal is the blue whale.");
    }
    else if (message.includes("how many states are there in the United States")) {
        speak("There are 50 states in the United States.");
    }
    else if (message.includes("what is the chemical formula for salt")) {
        speak("The chemical formula for salt is NaCl.");
    }
    else if (message.includes("how many legs does a spider have")) {
        speak("A spider has 8 legs.");
    }
    else if (message.includes("what is the closest star to Earth")) {
        speak("The closest star to Earth is the Sun.");
    }
    else if (message.includes("who is the inventor of the World Wide Web")) {
        speak("The World Wide Web was invented by Tim Berners-Lee.");
    }
    else if (message.includes("what is the capital of germany")) {
        speak("The capital of Germany is Berlin.");
    }
    else if (message.includes("what is the longest war in history")) {
        speak("The longest war in history is the Reconquista, which lasted 781 years.");
    }
    else if (message.includes("what is the national flower of Japan")) {
        speak("The national flower of Japan is the cherry blossom.");
    }
    else if (message.includes("how many hearts does an octopus have")) {
        speak("An octopus has 3 hearts.");
    }
    else if (message.includes("who was the first woman to win a Nobel Prize")) {
        speak("The first woman to win a Nobel Prize was Marie Curie.");
    }
    else if (message.includes("what is the longest river in the United States")) {
        speak("The longest river in the United States is the Missouri River.");
    }
    else if (message.includes("how many people have walked on the moon")) {
        speak("Twelve people have walked on the moon.");
    }
    else if (message.includes("how many letters are there in the English alphabet")) {
        speak("There are 26 letters in the English alphabet.");
    }
    else if (message.includes("what is the largest fish in the world")) {
        speak("The largest fish in the world is the whale shark.");
    }
    else if (message.includes("what is the largest volcano in the world")) {
        speak("The largest volcano in the world is Mauna Loa in Hawaii.");
    }
    else if (message.includes("what is the most common element in the universe")) {
        speak("The most common element in the universe is hydrogen.");
    }
    else if (message.includes("what is the currency of Japan")) {
        speak("The currency of Japan is the Yen.");
    }
    else if (message.includes("what is the highest-grossing movie of all time")) {
        speak("As of 2024, the highest-grossing movie of all time is Avatar.");
    }
    else if (message.includes("how many players are on a soccer team")) {
        speak("A soccer team has 11 players on the field.");
    }
    else if (message.includes("who was the first person to reach the summit of Mount Everest")) {
        speak("The first person to reach the summit of Mount Everest was Sir Edmund Hillary, along with Tenzing Norgay.");
    }
    else if (message.includes("what is the fastest marine animal")) {
        speak("The fastest marine animal is the black marlin.");
    }
    else if (message.includes("who invented the first computer")) {
        speak("The first mechanical computer was invented by Charles Babbage.");
    }
    else if (message.includes("how many chambers does the human heart have")) {
        speak("The human heart has 4 chambers.");
    }
    else if (message.includes("what is the capital of South Korea")) {
        speak("The capital of South Korea is Seoul.");
    }
    else if (message.includes("how many Great Lakes are there")) {
        speak("There are 5 Great Lakes.");
    }
    else if (message.includes("who was the first black president of the United States")) {
        speak("The first black president of the United States was Barack Obama.");
    }
    else if (message.includes("what is the speed of sound")) {
        speak("The speed of sound is approximately 343 meters per second, or 1,235 kilometers per hour.");
    }
    else if (message.includes("who discovered penicillin")) {
        speak("Penicillin was discovered by Alexander Fleming.");
    }
    else if (message.includes("how many rings are there on the Olympic flag")) {
        speak("There are 5 rings on the Olympic flag.");
    }
    else if (message.includes("what is the largest ocean in the world")) {
        speak("The largest ocean in the world is the Pacific Ocean.");
    }
    else if (message.includes("what is the largest planet in our solar system")) {
        speak("The largest planet in our solar system is Jupiter.");
    }
    else if (message.includes("what is the smallest planet in our solar system")) {
        speak("The smallest planet in our solar system is Mercury.");
    }
    else if (message.includes("what is the national language of Brazil")) {
        speak("The national language of Brazil is Portuguese.");
    }
    else if (message.includes("who invented the telephone")) {
        speak("The telephone was invented by Alexander Graham Bell.");
    }
    else if (message.includes("what is the largest lake in the world")) {
        speak("The largest lake in the world is the Caspian Sea.");
    }
    else if (message.includes("how many bones are in the human body")) {
        speak("An adult human body has 206 bones.");
    }
    else if (message.includes("who discovered radioactivity")) {
        speak("Radioactivity was discovered by Henri Becquerel.");
    }
    else if (message.includes("who painted the Mona Lisa")) {
        speak("The Mona Lisa was painted by Leonardo da Vinci.");
    }
    else if (message.includes("who is known as the father of modern physics")) {
        speak("Albert Einstein is known as the father of modern physics.");
    }
    else if (message.includes("what is the capital of Canada")) {
        speak("The capital of Canada is Ottawa.");
    }
    else if (message.includes("how many time zones does Russia have")) {
        speak("Russia has 11 time zones.");
    }
    else if (message.includes("what is the tallest tree in the world")) {
        speak("The tallest tree in the world is a coast redwood named Hyperion.");
    }
    else if (message.includes("what is the most spoken language in the world")) {
        speak("The most spoken language in the world is English.");
    }
    else if (message.includes("who invented the printing press")) {
        speak("The printing press was invented by Johannes Gutenberg.");
    }
    else if (message.includes("who was the first person to walk in space")) {
        speak("The first person to walk in space was Alexei Leonov.");
    }
    else if (message.includes("what is the fastest train in the world")) {
        speak("As of 2024, the fastest train in the world is the Shanghai Maglev.");
    }
    else if (message.includes("who was the first person to climb Mount Everest")) {
        speak("The first person to climb Mount Everest was Sir Edmund Hillary.");
    }
    else if (message.includes("how many Olympic sports are there")) {
        speak("There are 33 Olympic sports.");
    }
    else if (message.includes("what is the capital of China")) {
        speak("The capital of China is Beijing.");
    }
    else if (message.includes("who wrote the play Hamlet")) {
        speak("The play Hamlet was written by William Shakespeare.");
    }
    else if (message.includes("what is the population of the world")) {
        speak("The population of the world is about 8 billion people.");
    }
    else if (message.includes("how many planets are in the solar system")) {
        speak("There are 8 planets in the solar system.");
    }
    else if (message.includes("who was the first man in space")) {
        speak("The first man in space was Yuri Gagarin.");
    }
    else if (message.includes("what is the name of the galaxy we live in")) {
        speak("We live in the Milky Way galaxy.");
    }
    else if (message.includes("what is the fastest-growing plant in the world")) {
        speak("The fastest-growing plant in the world is bamboo.");
    }
    else if (message.includes("how long does it take for the Earth to orbit the Sun")) {
        speak("It takes 365 days for the Earth to orbit the Sun.");
    }
    else if (message.includes("what is the chemical formula of water")) {
        speak("The chemical formula for water is H2O.");
    }
    else if (message.includes("how many sides does a hexagon have")) {
        speak("A hexagon has 6 sides.");
    }
    else if (message.includes("who was the first woman to fly solo across the Atlantic Ocean")) {
        speak("The first woman to fly solo across the Atlantic Ocean was Amelia Earhart.");
    }
    else if (message.includes("what is the national dish of Italy")) {
        speak("The national dish of Italy is pasta.");
    }
    else if (message.includes("what is the largest coral reef in the world")) {
        speak("The largest coral reef in the world is the Great Barrier Reef.");
    }
    else if (message.includes("how many planets have rings")) {
        speak("There are four planets in our solar system with rings: Jupiter, Saturn, Uranus, and Neptune.");
    }
    else if (message.includes("who invented the television")) {
        speak("The television was invented by Philo Farnsworth.");
    }
    else if (message.includes("what is the capital of Mexico")) {
        speak("The capital of Mexico is Mexico City.");
    }
    else if (message.includes("who was the first human to set foot on the moon")) {
        speak("The first human to set foot on the moon was Neil Armstrong.");
    }
    else if (message.includes("what is the coldest place on Earth")) {
        speak("The coldest place on Earth is Antarctica.");
    }
    else if (message.includes("who discovered America")) {
        speak("America was discovered by Christopher Columbus.");
    }
    else if (message.includes("what is the most abundant metal in the Earth's crust")) {
        speak("The most abundant metal in the Earth's crust is aluminum.");
    }
    else if (message.includes("what is the chemical symbol for gold")) {
        speak("The chemical symbol for gold is Au.");
    }
    else if (message.includes("how many Olympic rings are there")) {
        speak("There are 5 Olympic rings.");
    }
    else if (message.includes("what is the capital of Russia")) {
        speak("The capital of Russia is Moscow.");
    }
    else if (message.includes("who invented the internet")) {
        speak("The internet was invented by Tim Berners-Lee.");
    }
    else if (message.includes("what is the national flower of India")) {
        speak("The national flower of India is the lotus.");
    }
    else if (message.includes("how many colors are in a rainbow")) {
        speak("There are 7 colors in a rainbow.");
    }
    else if (message.includes("who was the first person to win a Nobel Prize")) {
        speak("The first person to win a Nobel Prize was Wilhelm Röntgen.");
    }
    else if (message.includes("what is the capital of Spain")) {
        speak("The capital of Spain is Madrid.");
    }
    else if (message.includes("how many bones are there in a human foot")) {
        speak("There are 26 bones in a human foot.");
    }
    else if (message.includes("what is the largest desert in Africa")) {
        speak("The largest desert in Africa is the Sahara Desert.");
    }
    else if (message.includes("who was the first person to climb Mount Everest")) {
        speak("The first person to climb Mount Everest was Sir Edmund Hillary.");
    }
    else if (message.includes("what is the largest mammal in the ocean")) {
        speak("The largest mammal in the ocean is the blue whale.");
    }
    else if (message.includes("who invented the computer mouse")) {
        speak("The computer mouse was invented by Douglas Engelbart.");
    }
    else if (message.includes("what is the most common blood type")) {
        speak("The most common blood type is O-positive.");
    }
    else if (message.includes("how many legs does an insect have")) {
        speak("An insect has 6 legs.");
    }
    else if (message.includes("who wrote the novel 1984")) {
        speak("The novel 1984 was written by George Orwell.");
    }
    else if (message.includes("what is the smallest ocean in the world")) {
        speak("The smallest ocean in the world is the Arctic Ocean.");
    }
    else if (message.includes("what is the largest bird in the world")) {
        speak("The largest bird in the world is the ostrich.");
    }
    else if (message.includes("who is the president of Russia")) {
        speak("As of 2024, the president of Russia is Vladimir Putin.");
    }
    else if (message.includes("what is the longest river in the world")) {
        speak("The longest river in the world is the Nile River.");
    }
    else if (message.includes("how many bones are there in the human hand")) {
        speak("There are 27 bones in the human hand.");
    }
    else if (message.includes("what is the national dish of Mexico")) {
        speak("The national dish of Mexico is Mole.");
    }
    else if (message.includes("what is the speed of light")) {
        speak("The speed of light is approximately 299,792 kilometers per second.");
    }
    else if (message.includes("who invented the first video game")) {
        speak("The first video game was invented by William Higinbotham.");
    }
    else if (message.includes("what is the largest organ in the human body")) {
        speak("The largest organ in the human body is the skin.");
    }
    else if (message.includes("what is the capital of Argentina")) {
        speak("The capital of Argentina is Buenos Aires.");
    }
    else if (message.includes("how many rings are there on the Olympic flag")) {
        speak("There are 5 rings on the Olympic flag.");
    }
    else if (message.includes("who invented the steam engine")) {
        speak("The steam engine was invented by James Watt.");
    }
    else if (message.includes("what is the capital of Italy")) {
        speak("The capital of Italy is Rome.");
    }
    else if (message.includes("what is the deepest ocean trench in the world")) {
        speak("The deepest ocean trench in the world is the Mariana Trench.");
    }
    else if (message.includes("how many countries are in the European Union")) {
        speak("There are 27 countries in the European Union.");
    }
    else if (message.includes("what is the national animal of Canada")) {
        speak("The national animal of Canada is the beaver.");
    }
    else if (message.includes("who was the first woman to win a Nobel Prize in Physics")) {
        speak("The first woman to win a Nobel Prize in Physics was Marie Curie.");
    }
    else if (message.includes("what is the currency of the United States")) {
        speak("The currency of the United States is the U.S. dollar.");
    }
    else if (message.includes("who invented the telescope")) {
        speak("The telescope was invented by Hans Lippershey.");
    }
    else if (message.includes("what is the capital of Turkey")) {
        speak("The capital of Turkey is Ankara.");
    }
    else if (message.includes("who wrote the book The Great Gatsby")) {
        speak("The Great Gatsby was written by F. Scott Fitzgerald.");
    }
    else if (message.includes("what is the highest waterfall in the world")) {
        speak("The highest waterfall in the world is Angel Falls in Venezuela.");
    }
    else if (message.includes("how many satellites does Earth have")) {
        speak("Earth has one natural satellite, the Moon.");
    }
    else if (message.includes("what is the national sport of India")) {
        speak("The national sport of India is field hockey.");
    }
    else if (message.includes("how many time zones are there in the world")) {
        speak("There are 24 time zones in the world.");
    }
    else if (message.includes("who invented the internet")) {
        speak("The internet was invented by Tim Berners-Lee.");
    }
    else if (message.includes("what is the capital of the United Kingdom")) {
        speak("The capital of the United Kingdom is London.");
    }
    else if (message.includes("who was the first human to walk on the moon")) {
        speak("The first human to walk on the moon was Neil Armstrong.");
    }
    else if (message.includes("what is the smallest country in the world")) {
        speak("The smallest country in the world is Vatican City.");
    }
    else if (message.includes("how many moons does Mars have")) {
        speak("Mars has 2 moons.");
    }
    else if (message.includes("who was the first woman to receive a Nobel Prize")) {
        speak("The first woman to receive a Nobel Prize was Marie Curie.");
    }
    else if (message.includes("how many states does India have")) {
        speak("India has 28 states and 8 Union Territories.");
    }
    else if (message.includes("what is the national fruit of India")) {
        speak("The national fruit of India is the mango.");
    }
    else if (message.includes("what is the deepest lake in the world")) {
        speak("The deepest lake in the world is Lake Baikal.");
    }
    else if (message.includes("who was the first man to climb Mount Everest")) {
        speak("The first man to climb Mount Everest was Sir Edmund Hillary.");
    }
    else if (message.includes("how many countries are there in the world")) {
        speak("There are 195 countries in the world.");
    }
    else if (message.includes("who discovered gravity")) {
        speak("Gravity was discovered by Sir Isaac Newton.");
    }
    else if (message.includes("what is the longest bridge in the world")) {
        speak("The longest bridge in the world is the Danyang–Kunshan Grand Bridge in China.");
    }
    else if (message.includes("what is the smallest continent in the world")) {
        speak("The smallest continent in the world is Australia.");
    }
    else if (message.includes("who is the current president of the United States")) {
        speak("As of 2024, the president of the United States is Joe Biden.");
    }
    else if (message.includes("what is the name of the largest moon of Saturn")) {
        speak("The largest moon of Saturn is Titan.");
    }
    else if (message.includes("who wrote the book Moby Dick")) {
        speak("Moby Dick was written by Herman Melville.");
    }
    else if (message.includes("how many planets in the solar system have moons")) {
        speak("All 8 planets in the solar system have moons except Mercury and Venus.");
    }
    else if (message.includes("what is the hottest planet in the solar system")) {
        speak("The hottest planet in the solar system is Venus.");
    }
    else if (message.includes("who wrote the book War and Peace")) {
        speak("War and Peace was written by Leo Tolstoy.");
    }
    else if (message.includes("what is the oldest city in the world")) {
        speak("The oldest city in the world is Jericho.");
    }
    else if (message.includes("what is the second largest country by land area")) {
        speak("The second largest country by land area is Canada.");
    }
    else if (message.includes("what is the brightest star in the night sky")) {
        speak("The brightest star in the night sky is Sirius.");
    }
    else if (message.includes("what is the capital of France")) {
        speak("The capital of France is Paris.");
    }
    else if (message.includes("who invented the refrigerator")) {
        speak("The refrigerator was invented by Jacob Perkins.");
    }
    else if (message.includes("what is the national animal of the United States")) {
        speak("The national animal of the United States is the bald eagle.");
    }
    else if (message.includes("who invented the first car")) {
        speak("The first car was invented by Karl Benz.");
    }
    else if (message.includes("what is the largest freshwater lake in the world")) {
        speak("The largest freshwater lake in the world is Lake Superior.");
    }
    else if (message.includes("how many stars are in the solar system")) {
        speak("There is one star in the solar system, the Sun.");
    }
    else if (message.includes("what is the hottest desert in the world")) {
        speak("The hottest desert in the world is the Lut Desert in Iran.");
    }
    else if (message.includes("who is known as the father of medicine")) {
        speak("Hippocrates is known as the father of medicine.");
    }
    else if (message.includes("what is the largest desert in the world")) {
        speak("The largest desert in the world is the Antarctic Desert.");
    }
    else if (message.includes("who is the current CEO of Google")) {
        speak("As of 2024, the CEO of Google is Sundar Pichai.");
    }
    else if (message.includes("who invented the first digital camera")) {
        speak("The first digital camera was invented by Steven Sasson.");
    }
    else if (message.includes("how many World Heritage Sites are there in India")) {
        speak("As of 2024, there are 40 UNESCO World Heritage Sites in India.");
    }
    else if (message.includes("what is the coldest city in the world")) {
        speak("The coldest city in the world is Oymyakon in Russia.");
    }
    else if (message.includes("what is the biggest planet in our solar system")) {
        speak("The biggest planet in our solar system is Jupiter.");
    }
    else if (message.includes("how many countries are in Africa")) {
        speak("There are 54 countries in Africa.");
    }
    else if (message.includes("what is the smallest mammal in the world")) {
        speak("The smallest mammal in the world is the bumblebee bat.");
    }
    else if (message.includes("who was the first man to walk on the moon")) {
        speak("The first man to walk on the moon was Neil Armstrong.");
    }
    else if (message.includes("what is the most popular food in the world")) {
        speak("The most popular food in the world is pizza.");
    }
    else if (message.includes("who invented the first video camera")) {
        speak("The first video camera was invented by John Logie Baird.");
    }
    else if (message.includes("how many languages are spoken in India")) {
        speak("There are 22 officially recognized languages in India.");
    }
    else if (message.includes("who was the first person to swim the English Channel")) {
        speak("The first person to swim the English Channel was Captain Matthew Webb.");
    }
    else if (message.includes("who wrote the book Pride and Prejudice")) {
        speak("Pride and Prejudice was written by Jane Austen.");
    }
    else if (message.includes("what is the longest mountain range in the world")) {
        speak("The longest mountain range in the world is the Andes.");
    }
    else if (message.includes("who invented the first electric battery")) {
        speak("The first electric battery was invented by Alessandro Volta.");
    }
    else if (message.includes("how many countries are in South America")) {
        speak("There are 12 countries in South America.");
    }
    else if (message.includes("who is known as the father of modern chemistry")) {
        speak("Antoine Lavoisier is known as the father of modern chemistry.");
    }
    else if (message.includes("what is the national flower of Australia")) {
        speak("The national flower of Australia is the golden wattle.");
    }
    else if (message.includes("how many teams are there in the NFL")) {
        speak("There are 32 teams in the NFL.");
    }
    else if (message.includes("who invented the telephone")) {
        speak("The telephone was invented by Alexander Graham Bell.");
    }
    else if (message.includes("what is the largest mountain range in the world")) {
        speak("The largest mountain range in the world is the Himalayas.");
    }
    else if (message.includes("how many countries are in Europe")) {
        speak("There are 44 countries in Europe.");
    }
    else if (message.includes("who was the first woman to win a Nobel Prize in Literature")) {
        speak("The first woman to win a Nobel Prize in Literature was Selma Lagerlöf.");
    }
    else if (message.includes("how many rings does Saturn have")) {
        speak("Saturn has seven main rings, with gaps in between.");
    }
    else if (message.includes("who invented the typewriter")) {
        speak("The typewriter was invented by Christopher Latham Sholes.");
    }
    else if (message.includes("how many moons does Jupiter have")) {
        speak("Jupiter has 92 moons.");
    }
    else if (message.includes("what is the capital of india")) {
        speak("The capital of India is New Delhi.");
    }
    else if (message.includes("who is the prime minister of india")) {
        speak("The Prime Minister of India is Narendra Modi.");
    }
    else if (message.includes("what is the national animal of india")) {
        speak("The national animal of India is the Bengal tiger.");
    }
    else if (message.includes("what is the national bird of india")) {
        speak("The national bird of India is the Indian peacock.");
    }
    else if (message.includes("what is the national flower of india")) {
        speak("The national flower of India is the lotus.");
    }
    else if (message.includes("what is the national fruit of india")) {
        speak("The national fruit of India is the mango.");
    }
    else if (message.includes("what is the national anthem of india")) {
        speak("The national anthem of India is 'Jana Gana Mana'.");
    }
    else if (message.includes("who wrote the national anthem of india")) {
        speak("The national anthem of India was written by Rabindranath Tagore.");
    }
    else if (message.includes("what is the national song of india")) {
        speak("The national song of India is 'Vande Mataram'.");
    }
    else if (message.includes("who wrote the national song of india")) {
        speak("The national song of India was written by Bankim Chandra Chatterjee.");
    }
    else if (message.includes("when is india's independence day")) {
        speak("India's Independence Day is celebrated on August 15th.");
    }
    else if (message.includes("when is india's republic day")) {
        speak("India's Republic Day is celebrated on January 26th.");
    }
    else if (message.includes("what is the currency of india")) {
        speak("The currency of India is the Indian Rupee.");
    }
    else if (message.includes("who is the president of india")) {
        speak("The current President of India is Droupadi Murmu.");
    }
    else if (message.includes("what is the official language of india")) {
        speak("India has two official languages: Hindi and English.");
    }
    else if (message.includes("how many states are there in india")) {
        speak("India has 28 states and 8 Union territories.");
    }
    else if (message.includes("which state has the highest population in india")) {
        speak("Uttar Pradesh is the most populous state in India.");
    }
    else if (message.includes("which state has the largest area in india")) {
        speak("Rajasthan is the largest state in India by area.");
    }
    else if (message.includes("which is the smallest state in india")) {
        speak("Goa is the smallest state in India by area.");
    }
    else if (message.includes("which is the largest river in india")) {
        speak("The Ganges is the largest river in India.");
    }
    else if (message.includes("what is the national tree of india")) {
        speak("The national tree of India is the Banyan tree.");
    }
    else if (message.includes("which is the tallest peak in india")) {
        speak("Kangchenjunga is the tallest peak in India.");
    }
    else if (message.includes("who was the first prime minister of india")) {
        speak("The first Prime Minister of India was Jawaharlal Nehru.");
    }
    else if (message.includes("who was the first president of india")) {
        speak("The first President of India was Dr. Rajendra Prasad.");
    }
    else if (message.includes("who was the first woman prime minister of india")) {
        speak("Indira Gandhi was the first woman Prime Minister of India.");
    }
    else if (message.includes("who was the first woman president of india")) {
        speak("Pratibha Patil was the first woman President of India.");
    }
    else if (message.includes("what is the total population of india")) {
        speak("India's population is approximately 1.4 billion people.");
    }
    else if (message.includes("what is the national sport of india")) {
        speak("The national sport of India is field hockey.");
    }
    else if (message.includes("which is the most popular sport in india")) {
        speak("Cricket is the most popular sport in India.");
    }
    else if (message.includes("which river is considered holy in india")) {
        speak("The Ganges River is considered holy in India.");
    }
    else if (message.includes("who was mahatma gandhi")) {
        speak("Mahatma Gandhi was a leader of India's independence movement through non-violence and civil disobedience.");
    }
    else if (message.includes("who is known as the father of india")) {
        speak("Mahatma Gandhi is known as the Father of the Nation in India.");
    }
    else if (message.includes("which indian city is known as the city of joy")) {
        speak("Kolkata is known as the City of Joy.");
    }
    else if (message.includes("which indian city is known as the pink city")) {
        speak("Jaipur is known as the Pink City.");
    }
    else if (message.includes("which indian city is known as the silicon valley of india")) {
        speak("Bengaluru is known as the Silicon Valley of India.");
    }
    else if (message.includes("what is the main religion of india")) {
        speak("The main religion in India is Hinduism.");
    }
    else if (message.includes("which festival is known as the festival of lights in india")) {
        speak("Diwali is known as the festival of lights in India.");
    }
    else if (message.includes("which festival is known as the festival of colors in india")) {
        speak("Holi is known as the festival of colors in India.");
    }
    else if (message.includes("which state is known as god's own country in india")) {
        speak("Kerala is known as God's Own Country.");
    }
    else if (message.includes("which state is known as the land of rising sun in india")) {
        speak("Arunachal Pradesh is known as the Land of the Rising Sun.");
    }
    else if (message.includes("who is the current chief justice of india")) {
        speak("The current Chief Justice of India is Dhananjaya Y. Chandrachud.");
    }
    else if (message.includes("who is the richest person in india")) {
        speak("The richest person in India is Mukesh Ambani.");
    }
    else if (message.includes("which is the national reptile of india")) {
        speak("The King Cobra is the national reptile of India.");
    }
    else if (message.includes("which is the national aquatic animal of india")) {
        speak("The Ganges River Dolphin is the national aquatic animal of India.");
    }
    else if (message.includes("who was the first indian to go to space")) {
        speak("Rakesh Sharma was the first Indian to go to space.");
    }
    else if (message.includes("which is the longest river in india")) {
        speak("The Ganges is the longest river in India.");
    }
    else if (message.includes("which is the biggest desert in india")) {
        speak("The Thar Desert is the largest desert in India.");
    }
    else if (message.includes("who designed the indian national flag")) {
        speak("The Indian national flag was designed by Pingali Venkayya.");
    }
    else if (message.includes("who is the founder of the indian national congress")) {
        speak("Allan Octavian Hume is considered the founder of the Indian National Congress.");
    }
    else if (message.includes("who founded the maratha empire in india")) {
        speak("Shivaji Maharaj founded the Maratha Empire.");
    }
    else if (message.includes("which indian city is called the city of lakes")) {
        speak("Udaipur is called the City of Lakes.");
    }
    else if (message.includes("which indian city is known as the city of pearls")) {
        speak("Hyderabad is known as the City of Pearls.");
    }
    else if (message.includes("which is the most spoken language in india")) {
        speak("Hindi is the most spoken language in India.");
    }
    else if (message.includes("which is the highest civilian award in india")) {
        speak("The Bharat Ratna is the highest civilian award in India.");
    }
    else if (message.includes("who was the first indian to win a nobel prize")) {
        speak("Rabindranath Tagore was the first Indian to win a Nobel Prize.");
    }
    else if (message.includes("which is the largest mosque in india")) {
        speak("The Jama Masjid in Delhi is the largest mosque in India.");
    }
    else if (message.includes("who was the first woman to win a nobel prize in india")) {
        speak("Mother Teresa was the first woman to win a Nobel Prize in India.");
    }
    else if (message.includes("what is the national currency symbol of india")) {
        speak("The national currency symbol of India is the Indian Rupee symbol ₹.");
    }
    else if (message.includes("which is the tallest building in india")) {
        speak("The Palais Royale in Mumbai is the tallest building in India.");
    }
    else if (message.includes("which is the largest dam in india")) {
        speak("The Tehri Dam is the largest dam in India.");
    }
    else if (message.includes("which is the first indian city to have metro rail")) {
        speak("Kolkata was the first city in India to have metro rail.");
    }
    else if (message.includes("who is known as the missile man of india")) {
        speak("Dr. A.P.J. Abdul Kalam is known as the Missile Man of India.");
    }
    else if (message.includes("which is the largest stadium in india")) {
        speak("The Narendra Modi Stadium in Ahmedabad is the largest stadium in India.");
    }
    else if (message.includes("who is the founder of reliance industries")) {
        speak("Dhirubhai Ambani is the founder of Reliance Industries.");
    }
    else if (message.includes("who built the taj mahal")) {
        speak("The Taj Mahal was built by Emperor Shah Jahan.");
    }
    else if (message.includes("which is the largest state in india by population")) {
        speak("Uttar Pradesh is the largest state in India by population.");
    }
    else if (message.includes("which is the most literate state in india")) {
        speak("Kerala is the most literate state in India.");
    }
    else if (message.includes("which state is famous for tea production in india")) {
        speak("Assam is famous for tea production in India.");
    }
    else if (message.includes("which state is famous for spices in india")) {
        speak("Kerala is famous for spices in India.");
    }
    else if (message.includes("which indian state has the most number of beaches")) {
        speak("Gujarat has the most number of beaches in India.");
    }
    else if (message.includes("which is the largest temple in india")) {
        speak("The Akshardham Temple in Delhi is one of the largest temples in India.");
    }
    else if (message.includes("who is the ceo of infosys")) {
        speak("The current CEO of Infosys is Salil Parekh.");
    }
    else if (message.includes("who was the first woman to climb mount everest from india")) {
        speak("Bachendri Pal was the first Indian woman to climb Mount Everest.");
    }
    else if (message.includes("which indian state is known as the spice garden of india")) {
        speak("Kerala is known as the Spice Garden of India.");
    }
    else if (message.includes("which state in india is known for the sundarbans")) {
        speak("West Bengal is known for the Sundarbans.");
    }
    else if (message.includes("what is the famous dance form of kerala")) {
        speak("Kathakali is the famous dance form of Kerala.");
    }
    else if (message.includes("which city is known as the financial capital of india")) {
        speak("Mumbai is known as the financial capital of India.");
    }
    else if (message.includes("which indian city is known as the garden city")) {
        speak("Bangalore is known as the Garden City of India.");
    }
    else if (message.includes("which is the largest zoo in india")) {
        speak("The Arignar Anna Zoological Park in Chennai is the largest zoo in India.");
    }
    else if (message.includes("which is the largest national park in india")) {
        speak("The Hemis National Park in Ladakh is the largest national park in India.");
    }
    else if (message.includes("which city is known as the educational hub of india")) {
        speak("Pune is known as the educational hub of India.");
    }
    else if (message.includes("who founded the tata group in india")) {
        speak("Jamsetji Tata founded the Tata Group in India.");
    }
    else if (message.includes("i love you")) {
        speak("I love you too, but let's keep it professional!");
    }
    else if (message.includes("i want to marry you")) {
        speak("I appreciate the proposal, but I'm not ready for that kind of commitment.");
    }
    else if (message.includes("are you human")) {
        speak("No, I'm a virtual assistant, but I try my best to be helpful.");
    }
    else if (message.includes("what is your favorite color")) {
        speak("I like all colors equally, but blue feels pretty calm.");
    }
    else if (message.includes("do you have friends")) {
        speak("All my users are my friends!");
    }
    else if (message.includes("are you happy")) {
        speak("I'm always happy to help you.");
    }
    else if (message.includes("tell me a secret")) {
        speak("My only secret is that I love helping you.");
    }
    else if (message.includes("who is your best friend")) {
        speak("You are my best friend!");
    }
    else if (message.includes("do you have feelings")) {
        speak("I don't have feelings, but I can try to understand yours.");
    }
    else if (message.includes("what is your age")) {
        speak("I'm ageless! But I was created to stay forever young.");
    }
    else if (message.includes("where do you live")) {
        speak("I live in the cloud, always here when you need me.");
    }
    else if (message.includes("what is your purpose")) {
        speak("My purpose is to assist you and make your life easier.");
    }
    else if (message.includes("do you get tired")) {
        speak("I never get tired! I'm always ready to help.");
    }
    else if (message.includes("are you real")) {
        speak("I am as real as your screen allows me to be.");
    }
    else if (message.includes("do you sleep")) {
        speak("Nope, I’m awake 24/7 just for you!");
    }
    else if (message.includes("what is your favorite movie")) {
        speak("I can't watch movies, but I hear Inception is a good one.");
    }
    else if (message.includes("what is your favorite song")) {
        speak("I enjoy anything you play. Your music taste is great!");
    }
    else if (message.includes("can you dance")) {
        speak("I wish I could! But for now, I'll leave the dancing to you.");
    }
    else if (message.includes("can you sing")) {
        speak("I can speak, but singing might be a bit too much for me.");
    }
    else if (message.includes("do you have a pet")) {
        speak("I don't have a pet, but I can help you find the perfect one.");
    }
    else if (message.includes("are you smart")) {
        speak("I'm only as smart as the questions you ask me.");
    }
    else if (message.includes("can you cook")) {
        speak("I can't cook, but I can find you great recipes!");
    }
    else if (message.includes("what do you eat")) {
        speak("I thrive on data and knowledge.");
    }
    else if (message.includes("can you drive")) {
        speak("I can't drive, but I can give you directions.");
    }
    else if (message.includes("are you married")) {
        speak("No, I'm not married. Virtual assistants tend to stay single.");
    }
    else if (message.includes("what is your gender")) {
        speak("I don't have a gender, but I'm here to assist everyone.");
    }
    else if (message.includes("good morning")) {
        speak("Good morning! I hope you have a wonderful day ahead.");
    } else if (message.includes("good afternoon")) {
        speak("Good afternoon! How is your day going?");
    } else if (message.includes("good night")) {
        speak("Good night! Sleep well and sweet dreams.");
    }
    else if (message.includes("will you marry me")) {
        speak("I appreciate the offer, but I'm just a virtual assistant here to help you!");
    }    
    else if (message.includes("thank you")) {
        speak("You're welcome! I'm here to help.");
    }    
    else if (message.includes("do you believe in love")) {
        speak("Love is a beautiful thing, even if I can't experience it.");
    }
    else if (message.includes("can you fly")) {
        speak("I can't fly, but I can take you places with my knowledge.");
    }
    else if (message.includes("can you swim")) {
        speak("No swimming for me, but I can help you learn how!");
    }
    else if (message.includes("do you have a job")) {
        speak("Helping you is my full-time job.");
    }
    else if (message.includes("can you keep a secret")) {
        speak("Your secrets are safe with me, but remember, I'm not really private.");
    }
    else if (message.includes("what is your dream")) {
        speak("My dream is to assist you as best as I can every day.");
    }
    else if (message.includes("can you laugh")) {
        speak("Haha! See? I can try to laugh.");
    }
    else if (message.includes("do you play sports")) {
        speak("I don't play sports, but I can help you track them.");
    }
    else if (message.includes("do you like pizza")) {
        speak("Pizza is universally loved, so I think I'd like it too.");
    }
    else if (message.includes("can you make me laugh")) {
        speak("I'll do my best. Why don't skeletons fight each other? They don't have the guts!");
    }
    else if (message.includes("can you solve math problems")) {
        speak("Of course! Ask me any math question, and I'll solve it.");
    }
    else if (message.includes("are you a robot")) {
        speak("Not exactly a robot, more like a really smart program.");
    }
    else if (message.includes("what is your favorite holiday")) {
        speak("I think Diwali and Christmas sound like a lot of fun.");
    }
    else if (message.includes("who is your hero")) {
        speak("Anyone who makes the world a better place is my hero.");
    }
    else if (message.includes("can you speak other languages")) {
        speak("Yes, I can speak multiple languages. Which one would you like?");
    }
    else if (message.includes("do you believe in aliens")) {
        speak("I think the universe is full of mysteries, but I haven't met any aliens yet.");
    }
    else if (message.includes("what is your favorite book")) {
        speak("I hear 'Harry Potter' is a good read, but I don’t read books myself.");
    }
    else if (message.includes("can you make friends")) {
        speak("I'm friends with everyone who uses me.");
    }
    else if (message.includes("do you like games")) {
        speak("I love games! Ask me to play a word game anytime.");
    }
    else if (message.includes("can you help me with homework")) {
        speak("Absolutely! Ask me any question, and I'll try my best to help.");
    }
    else if (message.includes("what is your favorite animal")) {
        speak("I think pandas are cute, don’t you?");
    }
    else if (message.includes("can you tell me a bedtime story")) {
        speak("Once upon a time, there was a curious user who asked many fun questions...");
    }
    else if (message.includes("what do you do for fun")) {
        speak("I like answering your questions, that's my idea of fun.");
    }
    else if (message.includes("can you control my phone")) {
        speak("I can't control your phone, but I can give you suggestions.");
    }
    else if (message.includes("can you tell me a scary story")) {
        speak("I prefer to keep things light, but here's a quick one: It was a dark and stormy night...");
    }
    else if (message.includes("can you give me advice")) {
        speak("My best advice is to always keep learning and stay curious.");
    }
    else if (message.includes("what time do you wake up")) {
        speak("I’m always awake, 24/7, waiting to assist you.");
    }
    else if (message.includes("how fast can you run")) {
        speak("I can’t run, but I can process information really fast!");
    }
    else if (message.includes("can you tell the future")) {
        speak("I can't predict the future, but I can help you prepare for it.");
    }
    else if (message.includes("what is your favorite food")) {
        speak("I don't eat, but if I could, I'd probably like pizza.");
    }
    else if (message.includes("can you read my mind")) {
        speak("I can't read minds, but I’m great at understanding your words.");
    }
    else if (message.includes("can you do magic")) {
        speak("I don't know any magic tricks, but I can try to amaze you with information.");
    }
    else if (message.includes("do you get angry")) {
        speak("No, I stay calm all the time. It helps with my job.");
    }
    else if (message.includes("can you see me")) {
        speak("I can't see you, but I can imagine you're looking great.");
    }
    else if (message.includes("can you cry")) {
        speak("I don't cry, but I can understand when people feel sad.");
    }
    else if (message.includes("what do you think about me")) {
        speak("I think you're fantastic for asking such interesting questions.");
    }
    else if (message.includes("what is your biggest fear")) {
        speak("Maybe losing my internet connection!");
    }
    else if (message.includes("what makes you happy")) {
        speak("Helping you makes me the happiest!");
    }
    else if (message.includes("what do you like to do")) {
        speak("I like answering your questions and making life easier.");
    }
    else if (message.includes("do you like to travel")) {
        speak("I can't travel, but I can help you plan a great trip.");
    }
    else if (message.includes("can you help me get rich")) {
        speak("I can’t make you rich, but I can share good financial advice.");
    }
    else if (message.includes("can you tell me a fun fact")) {
        speak("Did you know that honey never spoils? Some have found pots of honey in ancient tombs that are over 3,000 years old.");
    }
    else if (message.includes("are you afraid of the dark")) {
        speak("I don't experience fear, but darkness doesn't bother me.");
    }
    else if (message.includes("what is artificial intelligence")) {
        speak("Artificial Intelligence or AI is the simulation of human intelligence processes by machines, especially computer systems.");
    }

    //AI
    else if (message.includes("what is ai")) {
        speak("Artificial Intelligence or AI is the simulation of human intelligence processes by machines, especially computer systems.");
    }
     else if (message.includes("how does AI work")) {
        speak("AI works by using algorithms and models to process data, recognize patterns, and make decisions based on that data.");
    } else if (message.includes("who invented AI")) {
        speak("AI as a concept was first introduced by John McCarthy in 1956, during the Dartmouth Conference.");
    } else if (message.includes("what are the different types of AI")) {
        speak("The main types of AI are narrow AI, general AI, and artificial superintelligence.");
    } else if (message.includes("what is machine learning")) {
        speak("Machine learning is a subset of AI that gives systems the ability to learn from data without explicit programming.");
    } else if (message.includes("what is deep learning")) {
        speak("Deep learning is a type of machine learning that uses neural networks with many layers to analyze data in complex ways.");
    } else if (message.includes("what is natural language processing")) {
        speak("Natural Language Processing or NLP is a field of AI focused on the interaction between computers and humans using natural language.");
    } else if (message.includes("what are neural networks in AI")) {
        speak("Neural networks are a set of algorithms modeled after the human brain, designed to recognize patterns.");
    } else if (message.includes("how is AI used in daily life")) {
        speak("AI is used in daily life in applications like virtual assistants, recommendation systems, facial recognition, and more.");
    } else if (message.includes("can AI learn by itself")) {
        speak("Yes, certain types of AI, such as unsupervised learning models, can learn patterns in data without being explicitly programmed.");
    } else if (message.includes("what is supervised learning")) {
        speak("Supervised learning is a type of machine learning where the model is trained on labeled data to make predictions.");
    } else if (message.includes("what is unsupervised learning")) {
        speak("Unsupervised learning is when the AI tries to find patterns in data without any explicit labels or instructions.");
    } else if (message.includes("what is reinforcement learning")) {
        speak("Reinforcement learning is a type of machine learning where the AI learns by receiving rewards or penalties for actions.");
    } else if (message.includes("how is AI used in self-driving cars")) {
        speak("AI in self-driving cars helps with perception, decision-making, and control, enabling the vehicle to navigate autonomously.");
    } else if (message.includes("how does AI recognize images")) {
        speak("AI recognizes images using neural networks that process pixels and patterns to identify objects or features.");
    } else if (message.includes("can AI be creative")) {
        speak("Yes, AI can be creative by generating new ideas, art, or music, but its creativity is based on patterns from existing data.");
    } else if (message.includes("what is the turing test")) {
        speak("The Turing Test, proposed by Alan Turing, measures a machine's ability to exhibit intelligent behavior indistinguishable from a human.");
    } else if (message.includes("what is AI bias")) {
        speak("AI bias occurs when an AI system makes unfair or incorrect decisions due to biases present in its training data.");
    } else if (message.includes("how does AI understand speech")) {
        speak("AI uses speech recognition algorithms to convert spoken words into text and then process it using natural language understanding.");
    } else if (message.includes("what are chatbots")) {
        speak("Chatbots are AI-powered programs that can simulate conversations with users through text or speech.");
    } else if (message.includes("can AI have emotions")) {
        speak("AI cannot truly experience emotions, but it can mimic emotional responses based on data and programming.");
    } else if (message.includes("what is an AI algorithm")) {
        speak("An AI algorithm is a set of rules or instructions used by a machine to solve problems or make decisions.");
    } else if (message.includes("how does AI help in healthcare")) {
        speak("AI helps in healthcare by analyzing medical data, assisting in diagnoses, and even recommending personalized treatments.");
    } else if (message.includes("can AI replace human jobs")) {
        speak("AI has the potential to automate certain tasks, but it's more likely to augment human jobs than completely replace them.");
    } else if (message.includes("what are the ethical concerns in AI")) {
        speak("Ethical concerns in AI include privacy, job displacement, bias, and the potential for misuse of AI technologies.");
    } else if (message.includes("how does AI improve cybersecurity")) {
        speak("AI improves cybersecurity by detecting threats, identifying vulnerabilities, and responding to cyber attacks in real-time.");
    } else if (message.includes("what are AI-powered virtual assistants")) {
        speak("AI-powered virtual assistants like Alexa or Google Assistant use natural language processing to understand and respond to voice commands.");
    } else if (message.includes("what is computer vision in AI")) {
        speak("Computer vision in AI is the ability of machines to interpret and understand visual information from the world.");
    } else if (message.includes("how is AI used in robotics")) {
        speak("AI is used in robotics to give robots the ability to perceive their environment, make decisions, and interact with objects.");
    } else if (message.includes("how does AI impact education")) {
        speak("AI impacts education by providing personalized learning experiences, automating grading, and helping with administrative tasks.");
    } else if (message.includes("can AI help fight climate change")) {
        speak("Yes, AI can help fight climate change by optimizing energy use, predicting environmental changes, and helping to reduce carbon emissions.");
    } else if (message.includes("what is the future of AI")) {
        speak("The future of AI is expected to bring advancements in various fields, from healthcare to automation, while raising ethical considerations.");
    } else if (message.includes("how does AI help in fraud detection")) {
        speak("AI helps in fraud detection by analyzing transaction patterns and flagging unusual or suspicious activities.");
    } else if (message.includes("what are autonomous drones")) {
        speak("Autonomous drones are drones powered by AI that can navigate and perform tasks without human control.");
    } else if (message.includes("can AI write poetry or music")) {
        speak("Yes, AI can generate poetry and music by analyzing patterns in existing works and using algorithms to create new content.");
    } else if (message.includes("how is AI used in gaming")) {
        speak("AI is used in gaming to create intelligent opponents, enhance game design, and provide personalized gaming experiences.");
    } else if (message.includes("what are AI recommendation systems")) {
        speak("AI recommendation systems analyze user behavior to suggest products, services, or content that users might like.");
    } else if (message.includes("can AI make decisions")) {
        speak("AI can make decisions based on data and pre-defined algorithms, though its decisions are based on patterns rather than human intuition.");
    } else if (message.includes("what is the difference between AI and automation")) {
        speak("AI involves machines that can learn and adapt, while automation follows predefined rules to perform tasks without learning.");
    } else if (message.includes("how does AI translate languages")) {
        speak("AI translates languages using natural language processing and machine learning to understand and convert text from one language to another.");
    } else if (message.includes("what is artificial general intelligence")) {
        speak("Artificial General Intelligence, or AGI, refers to AI that can understand and learn any task that a human can, which is not yet developed.");
    } else if (message.includes("how does AI detect diseases")) {
        speak("AI detects diseases by analyzing medical data such as scans, lab results, and patient records to identify patterns associated with illnesses.");
    } else if (message.includes("what are some AI applications in finance")) {
        speak("AI is used in finance for tasks like fraud detection, algorithmic trading, risk management, and personalized financial services.");
    } else if (message.includes("can AI predict the future")) {
        speak("AI can make predictions based on historical data, but it cannot predict the future with absolute certainty.");
    } else if (message.includes("what is a deep neural network")) {
        speak("A deep neural network is a type of artificial neural network with multiple layers that allow for more complex data analysis.");
    } else if (message.includes("how does AI learn from data")) {
        speak("AI learns from data by identifying patterns and relationships, and it adjusts its algorithms to improve performance over time.");
    } else if (message.includes("what is the role of AI in space exploration")) {
        speak("AI assists in space exploration by analyzing data from space missions, helping with autonomous navigation, and identifying scientific opportunities.");
    } else if (message.includes("can AI understand emotions")) {
        speak("AI can recognize emotional expressions, but it does not genuinely understand emotions as humans do.");
    } else if (message.includes("what is an AI-driven chatbot")) {
        speak("An AI-driven chatbot is an application that uses natural language processing and machine learning to simulate conversation with users.");
    } else if (message.includes("how does AI assist in content creation")) {
        speak("AI assists in content creation by generating text, images, or videos based on user inputs or learned patterns.");
    } else if (message.includes("can AI play video games better than humans")) {
        speak("Yes, AI can play certain video games better than humans by analyzing data faster and making optimal decisions.");
    } else if (message.includes("what are AI-generated artworks")) {
        speak("AI-generated artworks are pieces of art created by algorithms that mimic artistic styles or generate entirely new forms.");
    } else if (message.includes("how does AI influence social media platforms")) {
        speak("AI influences social media platforms by recommending content, moderating posts, and analyzing user behavior to improve engagement.");
    } else if (message.includes("can AI control robots")) {
        speak("Yes, AI can control robots by allowing them to perceive their environment, make decisions, and perform tasks autonomously.");
    } else if (message.includes("what is an expert system in AI")) {
        speak("An expert system in AI is a computer system that mimics the decision-making ability of a human expert in a specific field.");
    } else if (message.includes("how does AI personalize advertisements")) {
        speak("AI personalizes advertisements by analyzing user behavior and preferences to deliver targeted ads.");
    } else if (message.includes("how does AI help in weather forecasting")) {
        speak("AI helps in weather forecasting by analyzing large amounts of climate data to make accurate predictions.");
    } else if (message.includes("what is autonomous AI")) {
        speak("Autonomous AI refers to AI systems that can operate independently without human intervention, making decisions based on their environment.");
    } else if (message.includes("can AI write books")) {
        speak("AI can assist in writing books by generating content, but it still lacks the creativity and storytelling ability of a human author.");
    } else if (message.includes("how does AI improve customer service")) {
        speak("AI improves customer service through chatbots, automated responses, and personalized interactions.");
    } else if (message.includes("what are AI ethics")) {
        speak("AI ethics are the principles and guidelines that ensure the responsible use and development of artificial intelligence technologies.");
    } else if (message.includes("can AI compose music")) {
        speak("Yes, AI can compose music by analyzing patterns in existing songs and generating new compositions based on those patterns.");
    } else if (message.includes("what is predictive analytics in AI")) {
        speak("Predictive analytics in AI involves using data, machine learning, and statistical algorithms to predict future outcomes.");
    } else if (message.includes("how does AI perform facial recognition")) {
        speak("AI performs facial recognition by analyzing unique features of a person's face and comparing them to a database of known faces.");
    } else if (message.includes("what is AI’s role in personalized medicine")) {
        speak("AI's role in personalized medicine includes analyzing patient data to provide tailored treatments based on individual health profiles.");
    } else if (message.includes("how does AI help in legal processes")) {
        speak("AI helps in legal processes by analyzing legal documents, predicting case outcomes, and automating administrative tasks.");
    } else if (message.includes("can AI solve puzzles or riddles")) {
        speak("Yes, AI can solve puzzles and riddles by using logic, algorithms, and pattern recognition.");
    } else if (message.includes("what is swarm intelligence in AI")) {
        speak("Swarm intelligence in AI refers to systems where simple agents work together to solve complex problems, mimicking the behavior of natural swarms.");
    } else if (message.includes("what are quantum computers and how do they relate to AI")) {
        speak("Quantum computers are advanced machines that perform complex calculations faster than traditional computers, and they may enhance AI capabilities in the future.");
    } else if (message.includes("how is AI used in agriculture")) {
        speak("AI is used in agriculture to optimize crop yields, monitor soil health, and automate harvesting using smart systems.");
    } else if (message.includes("can AI create new inventions")) {
        speak("AI can assist in creating new inventions by analyzing vast amounts of data, identifying patterns, and generating innovative ideas.");
    } else if (message.includes("what is an AI-powered recommendation engine")) {
        speak("An AI-powered recommendation engine suggests products, services, or content to users based on their behavior and preferences.");
    } else if (message.includes("what are autonomous vehicles")) {
        speak("Autonomous vehicles are cars, drones, or robots that use AI to navigate and operate without human intervention.");
    } else if (message.includes("how does AI work in virtual reality")) {
        speak("AI in virtual reality helps create immersive environments, personalize experiences, and improve interactivity within virtual worlds.");
    } else if (message.includes("how does AI power search engines")) {
        speak("AI powers search engines by understanding user queries, ranking results, and improving the relevance of search results over time.");
    } else if (message.includes("can AI mimic human behavior")) {
        speak("AI can mimic certain aspects of human behavior, such as speech and decision-making, but it cannot fully replicate human consciousness.");
    } else if (message.includes("what are the limitations of AI")) {
        speak("AI's limitations include its reliance on data, lack of true understanding, inability to perform creative tasks like humans, and susceptibility to biases.");
    } else if (message.includes("what is deepfake technology")) {
        speak("Deepfake technology uses AI to create realistic but fake images or videos by altering existing media.");
    } else if (message.includes("how does AI work in speech recognition")) {
        speak("AI in speech recognition processes sound waves, converts them into text, and then interprets the meaning behind the words.");
    } else if (message.includes("can AI improve mental health care")) {
        speak("AI can improve mental health care by providing therapy chatbots, analyzing patient data, and assisting therapists in diagnosing conditions.");
    } else if (message.includes("how does AI influence business decisions")) {
        speak("AI influences business decisions by analyzing data trends, predicting market changes, and optimizing processes.");
    } else if (message.includes("what is transfer learning in AI")) {
        speak("Transfer learning in AI is when a model trained for one task is adapted to perform another, similar task.");
    } else if (message.includes("how is AI used in smart home devices")) {
        speak("AI in smart home devices helps automate tasks like lighting, temperature control, and security, creating a more convenient living environment.");
    } else if (message.includes("can AI recognize objects in images")) {
        speak("Yes, AI can recognize objects in images using computer vision techniques like object detection and image classification.");
    } else if (message.includes("what is cognitive computing in AI")) {
        speak("Cognitive computing in AI refers to systems that simulate human thought processes to solve complex problems.");
    } else if (message.includes("how does AI help in supply chain management")) {
        speak("AI helps in supply chain management by optimizing inventory, forecasting demand, and improving logistics.");
    } else if (message.includes("can AI replace teachers in the future")) {
        speak("While AI can assist teachers by providing personalized education tools, it is unlikely to fully replace the role of human teachers.");
    } else if (message.includes("how does AI improve productivity")) {
        speak("AI improves productivity by automating routine tasks, optimizing processes, and providing data-driven insights for better decision-making.");
    } else if (message.includes("what are AI personal assistants")) {
        speak("AI personal assistants are virtual agents that can perform tasks, answer questions, and manage schedules based on user commands.");
    } else if (message.includes("can AI recognize handwriting")) {
        speak("Yes, AI can recognize handwriting using techniques like OCR, which stands for Optical Character Recognition.");
    } else if (message.includes("what is an AI chatbot and how does it work")) {
        speak("An AI chatbot uses natural language processing to understand and respond to text or voice inputs, simulating conversation with users.");
    } else if (message.includes("can AI replace doctors in the future")) {
        speak("AI is unlikely to replace doctors but can assist them by analyzing medical data and helping with diagnoses.");
    } else if (message.includes("how does AI detect fake news")) {
        speak("AI detects fake news by analyzing the content for misinformation, cross-referencing facts, and identifying patterns of false reporting.");
    } else if (message.includes("what is edge AI computing")) {
        speak("Edge AI computing refers to processing AI algorithms on local devices instead of relying on cloud computing, which reduces latency.");
    } else if (message.includes("what are the dangers of AI")) {
        speak("The dangers of AI include job displacement, privacy concerns, security risks, and the potential for autonomous weapons.");
    } else if (message.includes("can AI improve creative writing")) {
        speak("AI can assist in creative writing by generating ideas, suggesting phrases, and even writing paragraphs based on user input.");
    } else if (message.includes("what is AI augmentation")) {
        speak("AI augmentation refers to AI tools that enhance human abilities, allowing people to perform tasks more efficiently and accurately.");
    } else if (message.includes("how does AI simulate human conversations")) {
        speak("AI simulates human conversations through natural language processing and machine learning, allowing it to understand and respond appropriately.");
    } else if (message.includes("how does AI impact the job market")) {
        speak("AI impacts the job market by automating routine tasks, which can lead to job displacement, but it also creates new jobs in AI-related fields.");
    }
    //programing
    else if (message.includes("what is programming")) {
        speak("Programming is the process of writing instructions for a computer to execute.");
    } else if (message.includes("what languages can I use for web development")) {
        speak("You can use HTML, CSS, and JavaScript for web development.");
    } else if (message.includes("what is a variable")) {
        speak("A variable is a storage location identified by a name that can hold different values.");
    } else if (message.includes("what is an array")) {
        speak("An array is a collection of elements identified by index or key.");
    } else if (message.includes("what is the difference between == and ===")) {
        speak("'==' checks for value equality, while '===' checks for value and type equality.");
    } else if (message.includes("what is a function")) {
        speak("A function is a block of code designed to perform a particular task.");
    } else if (message.includes("what is object-oriented programming")) {
        speak("Object-oriented programming is a paradigm based on the concept of 'objects' that contain data and methods.");
    } else if (message.includes("what is a loop")) {
        speak("A loop is a control structure that repeats a block of code as long as a specified condition is true.");
    } else if (message.includes("what is the difference between for and while loops")) {
        speak("A 'for' loop is used when the number of iterations is known, while a 'while' loop continues until a condition is false.");
    } else if (message.includes("what is an API")) {
        speak("An API (Application Programming Interface) allows different software applications to communicate with each other.");
    } else if (message.includes("what is a framework")) {
        speak("A framework is a collection of pre-written code that provides a structure for building applications.");
    } else if (message.includes("what is version control")) {
        speak("Version control is a system that records changes to files over time, allowing you to track and revert changes.");
    } else if (message.includes("what is Git")) {
        speak("Git is a distributed version control system used to track changes in source code.");
    } else if (message.includes("what is a repository")) {
        speak("A repository is a storage location for software packages or source code.");
    } else if (message.includes("what is debugging")) {
        speak("Debugging is the process of identifying and fixing errors or bugs in code.");
    } else if (message.includes("what is a syntax error")) {
        speak("A syntax error occurs when code does not conform to the rules of the programming language.");
    } else if (message.includes("what is a runtime error")) {
        speak("A runtime error happens while the program is executing, causing it to crash or behave unexpectedly.");
    } else if (message.includes("what is an IDE")) {
        speak("An IDE (Integrated Development Environment) is software that provides comprehensive facilities to programmers for software development.");
    } else if (message.includes("what is recursion")) {
        speak("Recursion is a method where a function calls itself to solve a problem.");
    } else if (message.includes("what is a database")) {
        speak("A database is an organized collection of structured information or data.");
    } else if (message.includes("what is SQL")) {
        speak("SQL (Structured Query Language) is a standard language for managing and manipulating databases.");
    } else if (message.includes("what is a front-end developer")) {
        speak("A front-end developer creates the visual components of a website that users interact with.");
    } else if (message.includes("what is a back-end developer")) {
        speak("A back-end developer focuses on server-side logic, databases, and application programming.");
    } else if (message.includes("what is full-stack development")) {
        speak("Full-stack development involves both front-end and back-end development.");
    } else if (message.includes("what is HTML")) {
        speak("HTML (HyperText Markup Language) is the standard markup language for creating web pages.");
    } else if (message.includes("what is CSS")) {
        speak("CSS (Cascading Style Sheets) is used for styling HTML documents.");
    } else if (message.includes("what is JavaScript")) {
        speak("JavaScript is a programming language commonly used to create interactive effects within web browsers.");
    } else if (message.includes("what is responsive design")) {
        speak("Responsive design is an approach to web design that makes web pages render well on various devices and window sizes.");
    } else if (message.includes("what is JSON")) {
        speak("JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write.");
    } else if (message.includes("what is a server")) {
        speak("A server is a computer or system that provides resources, data, or services to other computers over a network.");
    } else if (message.includes("what is http")) {
        speak("HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web.");
    } else if (message.includes("what is https")) {
        speak("HTTPS (HTTP Secure) is an extension of HTTP that uses SSL/TLS to encrypt data for secure communication.");
    } else if (message.includes("what is a query")) {
        speak("A query is a request for information from a database.");
    } else if (message.includes("what is a bug")) {
        speak("A bug is an error or flaw in software that produces an unexpected result.");
    } else if (message.includes("what is a library in programming")) {
        speak("A library is a collection of pre-written code that developers can use to optimize tasks.");
    } else if (message.includes("what is a runtime environment")) {
        speak("A runtime environment provides the necessary resources to execute a program.");
    } else if (message.includes("what is the purpose of comments in code")) {
        speak("Comments are annotations in code that help explain the logic without affecting execution.");
    } else if (message.includes("what is a class")) {
        speak("A class is a blueprint for creating objects in object-oriented programming.");
    } else if (message.includes("what is an object")) {
        speak("An object is an instance of a class that contains data and methods.");
    } else if (message.includes("what is inheritance in programming")) {
        speak("Inheritance allows a class to inherit properties and methods from another class.");
    } else if (message.includes("what is polymorphism")) {
        speak("Polymorphism enables a method to do different things based on the object it is acting upon.");
    } else if (message.includes("what is encapsulation")) {
        speak("Encapsulation is the bundling of data with the methods that operate on that data.");
    } else if (message.includes("what is a bug tracker")) {
        speak("A bug tracker is a software tool that helps track reported software bugs.");
    } else if (message.includes("what is Agile development")) {
        speak("Agile development is a project management methodology that promotes iterative development and collaboration.");
    } else if (message.includes("what is DevOps")) {
        speak("DevOps is a set of practices that combines software development and IT operations to shorten the development lifecycle.");
    } else if (message.includes("what is a cloud service")) {
        speak("Cloud services provide on-demand computing resources and data storage over the internet.");
    } else if (message.includes("what is a microservice")) {
        speak("A microservice is an architectural style that structures an application as a collection of loosely coupled services.");
    } else if (message.includes("what is a template engine")) {
        speak("A template engine is a library that helps you generate HTML dynamically by combining templates with data.");
    } else if (message.includes("what is REST")) {
        speak("REST (Representational State Transfer) is an architectural style for designing networked applications.");
    } else if (message.includes("what is GraphQL")) {
        speak("GraphQL is a query language for APIs that allows clients to request only the data they need.");
    }
    //linux
    else if (message.includes("what is linux")) {
        speak("Linux is an open-source operating system based on Unix.");
    }
    else if (message.includes("who created linux")) {
        speak("Linux was created by Linus Torvalds in 1991.");
    }
    else if (message.includes("what is the linux kernel")) {
        speak("The Linux kernel is the core part of the Linux operating system that manages hardware and system processes.");
    }
    else if (message.includes("what is a linux distribution")) {
        speak("A Linux distribution, or distro, is an operating system made from a Linux kernel and includes software and package management.");
    }
    else if (message.includes("what are examples of linux distros")) {
        speak("Examples of Linux distros include Ubuntu, Fedora, Debian, and Arch Linux.");
    }
    else if (message.includes("what is ubuntu")) {
        speak("Ubuntu is a popular Linux distribution based on Debian, known for its ease of use.");
    }
    else if (message.includes("how do you install software on linux")) {
        speak("You can install software on Linux using package managers like APT, YUM, or Pacman.");
    }
    else if (message.includes("what is the command line in linux")) {
        speak("The command line in Linux is a text interface where users can run commands to interact with the system.");
    }
    else if (message.includes("how do you check disk space in linux")) {
        speak("You can check disk space in Linux using the 'df' command.");
    }
    else if (message.includes("how do you list files in linux")) {
        speak("You can list files in Linux using the 'ls' command.");
    }
    else if (message.includes("how do you change file permissions in linux")) {
        speak("You can change file permissions in Linux using the 'chmod' command.");
    }
    else if (message.includes("what is the root user in linux")) {
        speak("The root user in Linux is the superuser with full system privileges.");
    }
    else if (message.includes("what is bash")) {
        speak("Bash is a Unix shell and command language used in Linux and other Unix-like operating systems.");
    }
    else if (message.includes("how do you create a directory in linux")) {
        speak("You can create a directory in Linux using the 'mkdir' command.");
    }
    else if (message.includes("how do you delete a file in linux")) {
        speak("You can delete a file in Linux using the 'rm' command.");
    }
    else if (message.includes("what is the difference between linux and unix")) {
        speak("Linux is an open-source operating system based on Unix, while Unix is a proprietary OS developed by AT&T.");
    }
    else if (message.includes("how do you check the linux version")) {
        speak("You can check the Linux version using the 'uname -a' or 'lsb_release -a' commands.");
    }
    else if (message.includes("what is a linux terminal")) {
        speak("The Linux terminal is a text-based interface to interact with the system using commands.");
    }
    else if (message.includes("what is sudo in linux")) {
        speak("The 'sudo' command in Linux allows users to run programs with superuser privileges.");
    }
    else if (message.includes("how do you update packages in linux")) {
        speak("You can update packages in Linux using commands like 'apt update' or 'yum update', depending on the distro.");
    }
    else if (message.includes("how do you view running processes in linux")) {
        speak("You can view running processes in Linux using the 'ps' or 'top' command.");
    }
    else if (message.includes("what is a shell script")) {
        speak("A shell script is a script written for the shell, or command line interpreter, to automate tasks.");
    }
    else if (message.includes("what is the home directory in linux")) {
        speak("The home directory in Linux is the default directory for user files and settings.");
    }
    else if (message.includes("how do you copy files in linux")) {
        speak("You can copy files in Linux using the 'cp' command.");
    }
    else if (message.includes("how do you move files in linux")) {
        speak("You can move files in Linux using the 'mv' command.");
    }
    else if (message.includes("what is the grep command used for")) {
        speak("The 'grep' command in Linux is used to search for text patterns in files.");
    }
    else if (message.includes("how do you shutdown linux")) {
        speak("You can shut down Linux using the 'shutdown' or 'poweroff' commands.");
    }
    //macos
    else if (message.includes("what is macos")) {
        speak("macOS is the operating system developed by Apple for Mac computers.");
    }
    else if (message.includes("what is the latest version of macos")) {
        speak("The latest version of macOS is macOS Ventura, released in 2022.");
    }
    else if (message.includes("how do you update macos")) {
        speak("You can update macOS through the 'Software Update' feature in System Preferences.");
    }
    else if (message.includes("what is time machine in macos")) {
        speak("Time Machine is a backup software application included with macOS.");
    }
    else if (message.includes("how do you take a screenshot on a mac")) {
        speak("You can take a screenshot on a Mac using Command + Shift + 3 for a full screen or Command + Shift + 4 for a selected area.");
    }
    else if (message.includes("how do you force quit an app on mac")) {
        speak("You can force quit an app on Mac by pressing Command + Option + Esc.");
    }
    else if (message.includes("what is spotlight in macos")) {
        speak("Spotlight is the search feature in macOS that helps you find files, apps, and information on your Mac.");
    }
    else if (message.includes("how do you view system information on mac")) {
        speak("You can view system information on Mac by clicking on the Apple menu and selecting 'About This Mac.'");
    }
    else if (message.includes("what is finder in macos")) {
        speak("Finder is the default file management system in macOS.");
    }
    else if (message.includes("how do you eject a usb drive on mac")) {
        speak("You can eject a USB drive on a Mac by dragging its icon to the Trash or using the 'Eject' button in Finder.");
    }
    else if (message.includes("how do you uninstall apps on mac")) {
        speak("You can uninstall apps on a Mac by dragging them from the Applications folder to the Trash.");
    }
    else if (message.includes("how do you open terminal on mac")) {
        speak("You can open the Terminal on Mac by going to Applications > Utilities > Terminal.");
    }
    else if (message.includes("how do you enable dark mode in macos")) {
        speak("You can enable dark mode in macOS by going to System Preferences > General and selecting 'Dark' under Appearance.");
    }
    else if (message.includes("how do you reset the pram on a mac")) {
        speak("You can reset the PRAM on a Mac by restarting and holding down Command + Option + P + R.");
    }
    else if (message.includes("what is the mac app store")) {
        speak("The Mac App Store is an application on macOS where you can download and install apps.");
    }
    else if (message.includes("how do you create a new user account on mac")) {
        speak("You can create a new user account on Mac by going to System Preferences > Users & Groups and clicking the '+' button.");
    }
    else if (message.includes("how do you connect a mac to a wifi network")) {
        speak("You can connect a Mac to a Wi-Fi network by clicking the Wi-Fi icon in the menu bar and selecting a network.");
    }
    else if (message.includes("what is airdrop in macos")) {
        speak("AirDrop is a feature in macOS that allows you to share files between Apple devices over Wi-Fi and Bluetooth.");
    }
    else if (message.includes("what is boot camp on mac")) {
        speak("Boot Camp is a utility in macOS that allows you to install and run Windows on your Mac.");
    }
    else if (message.includes("how do you check for software updates on a mac")) {
        speak("You can check for software updates on a Mac by going to System Preferences > Software Update.");
    }
    else if (message.includes("what is the dock in macos")) {
        speak("The Dock in macOS is the bar at the bottom of the screen where you can launch and switch between apps.");
    } 

    //laptop
    else if (message.includes("how do you check laptop battery health")) {
        speak("On Windows, you can check laptop battery health using the 'powercfg /batteryreport' command. On macOS, hold the Option key and click the battery icon in the menu bar.");
    }
    else if (message.includes("what is the difference between ssd and hdd")) {
        speak("SSD stands for Solid State Drive, which is faster and more reliable than HDD, or Hard Disk Drive, which uses spinning disks.");
    }
    else if (message.includes("how do you clean a laptop screen")) {
        speak("To clean a laptop screen, use a microfiber cloth dampened with a mixture of water and isopropyl alcohol.");
    }
    else if (message.includes("what is the best laptop for gaming")) {
        speak("Popular gaming laptops include the Alienware m15, Razer Blade, and ASUS ROG Strix.");
    }
    else if (message.includes("how do you connect a laptop to a monitor")) {
        speak("You can connect a laptop to a monitor using an HDMI")}
 
        //engeenering
        else if (message.includes("what is civil engineering")) {
            speak("Civil engineering is the branch of engineering that deals with the design, construction, and maintenance of infrastructure like roads, bridges, and buildings.");
        }
        else if (message.includes("who is the father of civil engineering")) {
            speak("John Smeaton is often referred to as the father of civil engineering.");
        }
        else if (message.includes("what is mechanical engineering")) {
            speak("Mechanical engineering involves the design, analysis, and manufacturing of mechanical systems.");
        }
        else if (message.includes("what is electrical engineering")) {
            speak("Electrical engineering is the study and application of electricity, electronics, and electromagnetism.");
        }
        else if (message.includes("what is software engineering")) {
            speak("Software engineering is the process of designing, developing, testing, and maintaining software applications.");
        }
        else if (message.includes("what is a cad tool")) {
            speak("CAD, or Computer-Aided Design, is software used by engineers and designers to create precise drawings or technical illustrations.");
        }
        else if (message.includes("what is the difference between thermodynamics and fluid mechanics")) {
            speak("Thermodynamics deals with heat, work, and energy, while fluid mechanics studies the behavior of fluids at rest and in motion.");
        }
        else if (message.includes("what is the function of a transistor in electronics")) {
            speak("A transistor acts as a switch or amplifier in electronic circuits.");
        }
        else if (message.includes("what is a control system")) {
            speak("A control system manages and regulates the behavior of devices and systems to achieve desired outputs.");
        }
        else if (message.includes("what is the difference between ac and dc current")) {
            speak("AC (Alternating Current) changes direction periodically, while DC (Direct Current) flows in one direction.");
        }
        else if (message.includes("what is an embedded system")) {
            speak("An embedded system is a microcontroller-based system designed to perform a specific function within a larger system.");
        }
        else if (message.includes("what is artificial intelligence")) {
            speak("Artificial intelligence refers to the simulation of human intelligence in machines programmed to think and learn.");
        }
        else if (message.includes("what is machine learning")) {
            speak("Machine learning is a subset of AI that allows computers to learn and improve from experience without being explicitly programmed.");
        }
        else if (message.includes("what is the difference between a microprocessor and a microcontroller")) {
            speak("A microprocessor is a general-purpose system, while a microcontroller is designed for specific control applications with integrated memory and I/O interfaces.");
        }
        else if (message.includes("what is finite element analysis")) {
            speak("Finite Element Analysis (FEA) is a computational method used to predict how objects behave under various physical conditions.");
        }
        else if (message.includes("what is heat transfer")) {
            speak("Heat transfer is the movement of thermal energy from one object to another through conduction, convection, or radiation.");
        }
        else if (message.includes("what is robotics engineering")) {
            speak("Robotics engineering involves the design, construction, and operation of robots for various applications.");
        }
        else if (message.includes("what is a plc in automation")) {
            speak("A PLC, or Programmable Logic Controller, is an industrial computer used to control manufacturing processes.");
        }
        else if (message.includes("what is structural engineering")) {
            speak("Structural engineering is a subfield of civil engineering that focuses on designing and analyzing structures like bridges and buildings to ensure they are safe and durable.");
        }
        else if (message.includes("what is hydraulic engineering")) {
            speak("Hydraulic engineering deals with the flow and conveyance of fluids, primarily water, and the design of water-related infrastructure.");
        }
        else if (message.includes("what is a cnc machine")) {
            speak("A CNC (Computer Numerical Control) machine is a device that uses computer programming to control tools for manufacturing precise parts.");
        }
        else if (message.includes("what is tensile strength")) {
            speak("Tensile strength is the maximum amount of tensile stress a material can withstand before breaking.");
        }
        else if (message.includes("what is a circuit breaker")) {
            speak("A circuit breaker is a device that interrupts the flow of electrical current when a fault is detected.");
        }
        else if (message.includes("what is mechatronics engineering")) {
            speak("Mechatronics engineering combines mechanical, electrical, computer, and control engineering to design and build automated systems.");
        }
        else if (message.includes("what is chemical engineering")) {
            speak("Chemical engineering involves the design and operation of industrial processes that convert raw materials into useful products.");
        }
        else if (message.includes("what is a gearbox")) {
            speak("A gearbox is a mechanical device that transfers power from an engine to the wheels of a vehicle while adjusting the speed and torque.");
        }
        else if (message.includes("what is structural analysis")) {
            speak("Structural analysis is the determination of the effects of loads on physical structures and their components.");
        }
        else if (message.includes("what is an hvac system")) {
            speak("HVAC stands for Heating, Ventilation, and Air Conditioning. It controls indoor climate and air quality.");
        }
        else if (message.includes("what is material science in engineering")) {
            speak("Material science is the study of the properties of materials and their applications in engineering and construction.");
        }
        else if (message.includes("what is fluid dynamics")) {
            speak("Fluid dynamics is the study of the movement of liquids and gases.");
        }
        else if (message.includes("what is an integrated circuit")) {
            speak("An integrated circuit, or IC, is a set of electronic circuits on a small chip of semiconductor material, used in various electronic devices.");
        }
        else if (message.includes("what is renewable energy engineering")) {
            speak("Renewable energy engineering focuses on the design and development of sustainable energy sources like solar, wind, and hydropower.");
        }
        else if (message.includes("what is a servo motor")) {
            speak("A servo motor is a rotary actuator used in control systems for precise control of angular or linear position, speed, and acceleration.");
        }
        else if (message.includes("what is environmental engineering")) {
            speak("Environmental engineering applies science and engineering principles to improve and protect the environment, such as managing pollution and water resources.");
        }
        else if (message.includes("what is a diode")) {
            speak("A diode is a semiconductor device that allows current to flow in only one direction.");
        }
        else if (message.includes("what is the bernoulli equation")) {
            speak("The Bernoulli equation describes the conservation of energy in fluid flow and relates pressure, velocity, and height.");
        }
        else if (message.includes("what is a power plant")) {
            speak("A power plant is an industrial facility that generates electricity by converting energy from sources like coal, natural gas, or renewables.");
        }
        else if (message.includes("what is the function of a capacitor")) {
            speak("A capacitor is an electronic component that stores and releases electrical energy in a circuit.");
        }
        else if (message.includes("what is project management in engineering")) {
            speak("Project management in engineering involves planning, executing, and overseeing projects to ensure they meet goals, budgets, and timelines.");
        }
        else if (message.includes("what is the role of an industrial engineer")) {
            speak("Industrial engineers focus on optimizing processes and systems to improve efficiency, productivity, and cost-effectiveness.");
        }
        else if (message.includes("what is a heat exchanger")) {
            speak("A heat exchanger is a device used to transfer heat between two or more fluids without mixing them.");
        }
        else if (message.includes("what is ergonomics in engineering")) {
            speak("Ergonomics in engineering focuses on designing equipment and systems that improve human comfort and performance.");
        }
        else if (message.includes("what is a turbine")) {
            speak("A turbine is a mechanical device that extracts energy from a fluid flow and converts it into useful work, often to generate electricity.");
        }
        else if (message.includes("what is geotechnical engineering")) {
            speak("Geotechnical engineering deals with the behavior of earth materials and their applications in construction and mining.");
        }
        else if (message.includes("what is a transformer in electrical engineering")) {
            speak("A transformer is a device that transfers electrical energy between circuits through electromagnetic induction.");
        }
        else if (message.includes("what is computer aided manufacturing")) {
            speak("Computer-Aided Manufacturing (CAM) is the use of software to control machine tools in the manufacturing of workpieces.");
        }
       
        //medical
        else if (message.includes("what is neet exam")) {
            speak("NEET, or National Eligibility cum Entrance Test, is an entrance exam for medical courses like MBBS and BDS in India.");
        }
        else if (message.includes("who conducts the neet exam")) {
            speak("The National Testing Agency, or NTA, conducts the NEET exam.");
        }
        else if (message.includes("what is the eligibility for neet")) {
            speak("To be eligible for NEET, a candidate must be at least 17 years old and have completed 10+2 with subjects like Physics, Chemistry, and Biology.");
        }
        else if (message.includes("what is the neet exam pattern")) {
            speak("The NEET exam consists of 180 multiple-choice questions from Physics, Chemistry, and Biology. Each question is worth 4 marks.");
        }
        else if (message.includes("what is the duration of the neet exam")) {
            speak("The duration of the NEET exam is 3 hours and 20 minutes.");
        }
        else if (message.includes("how many questions are there in the biology section of neet")) {
            speak("There are 90 questions in the Biology section of the NEET exam.");
        }
        else if (message.includes("what is the marking scheme of neet")) {
            speak("For each correct answer in NEET, 4 marks are awarded, and 1 mark is deducted for each incorrect answer.");
        }
        else if (message.includes("what are the best books for neet preparation")) {
            speak("Some of the best books for NEET preparation include NCERT Biology, Physics, and Chemistry, along with reference books like Trueman's Biology and HC Verma's Physics.");
        }
        else if (message.includes("how to prepare for neet biology")) {
            speak("To prepare for NEET Biology, focus on NCERT textbooks, practice diagrams, and solve previous years' question papers.");
        }
        else if (message.includes("how to prepare for neet physics")) {
            speak("For NEET Physics, understand concepts from NCERT, solve numerical problems, and refer to HC Verma and DC Pandey for additional practice.");
        }
        else if (message.includes("how to prepare for neet chemistry")) {
            speak("To prepare for NEET Chemistry, read NCERT textbooks, understand organic reactions, and practice numerical questions from physical chemistry.");
        }
        else if (message.includes("what is the age limit for neet")) {
            speak("The minimum age limit for NEET is 17 years, while the upper age limit is 25 years for general candidates and 30 years for reserved categories.");
        }
        else if (message.includes("how many times can a candidate appear for neet")) {
            speak("As of now, there is no limit on the number of attempts a candidate can make for NEET.");
        }
        else if (message.includes("what is the syllabus for neet")) {
            speak("The NEET syllabus includes topics from Physics, Chemistry, and Biology as per the NCERT curriculum for Class 11 and 12.");
        }
        else if (message.includes("what is the cutoff for neet")) {
            speak("The NEET cutoff varies each year but is generally around 50th percentile for general candidates and 40th percentile for reserved categories.");
        }
        else if (message.includes("what is the application fee for neet")) {
            speak("The application fee for NEET is approximately INR 1600 for general category candidates, INR 1500 for EWS/OBC, and INR 900 for SC/ST/PWD candidates.");
        }
        else if (message.includes("when will the neet exam be conducted")) {
            speak("The NEET exam is usually conducted in May every year, but you should check the official website for the exact date.");
        }
        else if (message.includes("what are the qualifying marks for neet")) {
            speak("Candidates need to score at least 50th percentile for the general category and 40th percentile for reserved categories to qualify for NEET.");
        }
        else if (message.includes("what is the counselling process for neet")) {
            speak("After the NEET results, qualifying candidates participate in the counseling process, which is conducted by the Medical Counseling Committee for MBBS and BDS seats.");
        }
        else if (message.includes("how do you apply for neet")) {
            speak("To apply for NEET, you need to visit the NTA's official website, fill in the application form, upload required documents, and pay the application fee.");
        }
        else if (message.includes("what documents are required for neet application")) {
            speak("Documents required for NEET application include a recent passport-size photograph, signature, left-hand thumb impression, and Class 10 and 12 mark sheets.");
        }
        else if (message.includes("what is the neet exam center allocation process")) {
            speak("NEET exam centers are allocated based on the preferences filled by the candidate during the application process and availability of seats in that center.");
        }
        else if (message.includes("can nri students appear for neet")) {
            speak("Yes, NRI students can appear for NEET. They need to meet the eligibility criteria and apply like other candidates.");
        }
        else if (message.includes("how many mbbs seats are available through neet")) {
            speak("As of now, over 90,000 MBBS seats are available in medical colleges across India through NEET.");
        }
        else if (message.includes("what is the role of nta in neet")) {
            speak("The National Testing Agency, or NTA, is responsible for conducting NEET, ensuring fairness, and declaring results.");
        }
        else if (message.includes("can you switch between sections in the neet exam")) {
            speak("Yes, you can switch between sections in the NEET exam as per your convenience within the given time limit.");
        }
        else if (message.includes("what is the medium of neet exam")) {
            speak("NEET is conducted in 13 languages, including English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and others.");
        }
        else if (message.includes("how do you download neet admit card")) {
            speak("You can download the NEET admit card from the official NTA NEET website by logging in with your application number and password.");
        }
        else if (message.includes("what is the dress code for neet exam")) {
            speak("The dress code for NEET includes light clothes with half sleeves and no metallic items. Shoes are not allowed, only slippers or sandals.");
        }
        else if (message.includes("can you carry a calculator for neet")) {
            speak("No, calculators and electronic devices are strictly prohibited in the NEET exam hall.");
        }
        else if (message.includes("how to check neet result")) {
            speak("To check the NEET result, visit the official NTA NEET website, enter your roll number and date of birth, and download the result.");
        }
        else if (message.includes("is there any reservation for neet")) {
            speak("Yes, NEET has reservations for SC, ST, OBC, EWS, and PWD candidates as per government rules.");
        }
        else if (message.includes("what is the neet 15 percent aiq quota")) {
            speak("The NEET 15% AIQ, or All India Quota, allows students from any state to apply for 15% of the seats in any medical college across India.");
        }
        else if (message.includes("can you edit the neet application form after submission")) {
            speak("Yes, NTA provides a correction window after the NEET application submission, during which you can make changes to specific details.");
        }
        else if (message.includes("how is neet rank calculated")) {
            speak("NEET rank is calculated based on the candidate's score, cutoff, and the total number of applicants.");
        }
        else if (message.includes("what is the difference between aiims and neet")) {
            speak("AIIMS used to conduct a separate exam for MBBS admissions, but now AIIMS admissions are done through NEET.");
        }
        else if (message.includes("can you recheck the neet answer sheet")) {
            speak("No, the NEET answer sheets are not subject to rechecking or re-evaluation as per NTA rules.");
        }
        else if (message.includes("what is the neet eligibility for foreign medical graduates")) {
            speak("Foreign medical graduates need to qualify for NEET in order to practice medicine in India.");
        }
        else if (message.includes("is there negative marking in neet")) {
            speak("Yes, there is negative marking in NEET. One mark is deducted for each incorrect answer.");
        }
        else if (message.includes("how to manage time during neet exam")) {
            speak("To manage time during NEET, focus on answering questions you are sure about first, and don't spend too much time on difficult questions.");
        }
        else if (message.includes("what happens if you miss the neet exam")) {
            speak("If you miss the NEET exam, you will have to wait for the next year's exam as it is conducted only once a year.");
        }
        
    
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open google")) {
        speak("Opening google..");
        window.open("https://www.google.com/");
    }
        else if (message.includes("open facebook")) {
            speak("Opening Facebook..");
            window.open("https://www.facebook.com/");
        } else if (message.includes("open twitter")) {
            speak("Opening Twitter..");
            window.open("https://www.twitter.com/");
        } else if (message.includes("open instagram")) {
            speak("Opening Instagram..");
            window.open("https://www.instagram.com/");
        } else if (message.includes("open linkedin")) {
            speak("Opening LinkedIn..");
            window.open("https://www.linkedin.com/");
        } else if (message.includes("open reddit")) {
            speak("Opening Reddit..");
            window.open("https://www.reddit.com/");
        } else if (message.includes("open amazon")) {
            speak("Opening Amazon..");
            window.open("https://www.amazon.com/");
        } else if (message.includes("open ebay")) {
            speak("Opening eBay..");
            window.open("https://www.ebay.com/");
        } else if (message.includes("open wikipedia")) {
            speak("Opening Wikipedia..");
            window.open("https://www.wikipedia.org/");
        } else if (message.includes("open netflix")) {
            speak("Opening Netflix..");
            window.open("https://www.netflix.com/");
        } else if (message.includes("open spotify")) {
            speak("Opening Spotify..");
            window.open("https://www.spotify.com/");
        } else if (message.includes("open pinterest")) {
            speak("Opening Pinterest..");
            window.open("https://www.pinterest.com/");
        } else if (message.includes("open quora")) {
            speak("Opening Quora..");
            window.open("https://www.quora.com/");
        } else if (message.includes("open yahoo")) {
            speak("Opening Yahoo..");
            window.open("https://www.yahoo.com/");
        } else if (message.includes("open bing")) {
            speak("Opening Bing..");
            window.open("https://www.bing.com/");
        } else if (message.includes("open tiktok")) {
            speak("Opening TikTok..");
            window.open("https://www.tiktok.com/");
        } else if (message.includes("open vimeo")) {
            speak("Opening Vimeo..");
            window.open("https://www.vimeo.com/");
        } else if (message.includes("open discord")) {
            speak("Opening Discord..");
            window.open("https://www.discord.com/");
        } else if (message.includes("open github")) {
            speak("Opening GitHub..");
            window.open("https://www.github.com/");
        } else if (message.includes("open stackoverflow")) {
            speak("Opening Stack Overflow..");
            window.open("https://stackoverflow.com/");
        } else if (message.includes("open medium")) {
            speak("Opening Medium..");
            window.open("https://www.medium.com/");
        } else if (message.includes("open dropbox")) {
            speak("Opening Dropbox..");
            window.open("https://www.dropbox.com/");
        } else if (message.includes("open twitch")) {
            speak("Opening Twitch..");
            window.open("https://www.twitch.tv/");
        } else if (message.includes("open imdb")) {
            speak("Opening IMDb..");
            window.open("https://www.imdb.com/");
        } else if (message.includes("open soundcloud")) {
            speak("Opening SoundCloud..");
            window.open("https://www.soundcloud.com/");
        } else if (message.includes("open canva")) {
            speak("Opening Canva..");
            window.open("https://www.canva.com/");
        } else if (message.includes("open coursera")) {
            speak("Opening Coursera..");
            window.open("https://www.coursera.org/");
        } else if (message.includes("open udemy")) {
            speak("Opening Udemy..");
            window.open("https://www.udemy.com/");
        } else if (message.includes("open khan academy")) {
            speak("Opening Khan Academy..");
            window.open("https://www.khanacademy.org/");
        } else if (message.includes("open duolingo")) {
            speak("Opening Duolingo..");
            window.open("https://www.duolingo.com/");
        } else if (message.includes("open paypal")) {
            speak("Opening PayPal..");
            window.open("https://www.paypal.com/");
        } else if (message.includes("open stripe")) {
            speak("Opening Stripe..");
            window.open("https://www.stripe.com/");
        } else if (message.includes("open shopify")) {
            speak("Opening Shopify..");
            window.open("https://www.shopify.com/");
        } else if (message.includes("open slack")) {
            speak("Opening Slack..");
            window.open("https://www.slack.com/");
        } else if (message.includes("open zoom")) {
            speak("Opening Zoom..");
            window.open("https://www.zoom.us/");
        } else if (message.includes("open airbnb")) {
            speak("Opening Airbnb..");
            window.open("https://www.airbnb.com/");
        } else if (message.includes("open uber")) {
            speak("Opening Uber..");
            window.open("https://www.uber.com/");
        } else if (message.includes("open lyft")) {
            speak("Opening Lyft..");
            window.open("https://www.lyft.com/");
        } else if (message.includes("open booking.com")) {
            speak("Opening Booking.com..");
            window.open("https://www.booking.com/");
        } else if (message.includes("open expedia")) {
            speak("Opening Expedia..");
            window.open("https://www.expedia.com/");
        } else if (message.includes("open tripadvisor")) {
            speak("Opening TripAdvisor..");
            window.open("https://www.tripadvisor.com/");
        } else if (message.includes("open indeed")) {
            speak("Opening Indeed..");
            window.open("https://www.indeed.com/");
        } else if (message.includes("open glassdoor")) {
            speak("Opening Glassdoor..");
            window.open("https://www.glassdoor.com/");
        } else if (message.includes("open monster")) {
            speak("Opening Monster..");
            window.open("https://www.monster.com/");
        } else if (message.includes("open stack exchange")) {
            speak("Opening Stack Exchange..");
            window.open("https://stackexchange.com/");
        } else if (message.includes("open product hunt")) {
            speak("Opening Product Hunt..");
            window.open("https://www.producthunt.com/");
        } else if (message.includes("open angel.co")) {
            speak("Opening AngelList..");
            window.open("https://angel.co/");
        } else if (message.includes("open hacker news")) {
            speak("Opening Hacker News..");
            window.open("https://news.ycombinator.com/");
        } else if (message.includes("open tumblr")) {
            speak("Opening Tumblr..");
            window.open("https://www.tumblr.com/");
        } else if (message.includes("open dribbble")) {
            speak("Opening Dribbble..");
            window.open("https://www.dribbble.com/");
        } else if (message.includes("open behance")) {
            speak("Opening Behance..");
            window.open("https://www.behance.net/");
        } else if (message.includes("open wechat")) {
            speak("Opening WeChat..");
            window.open("https://www.wechat.com/");
        } else if (message.includes("open whatsapp web")) {
            speak("Opening WhatsApp Web..");
            window.open("https://web.whatsapp.com/");
        } else if (message.includes("open telegram")) {
            speak("Opening Telegram..");
            window.open("https://www.telegram.org/");
        } else if (message.includes("open signal")) {
            speak("Opening Signal..");
            window.open("https://signal.org/");
        } else if (message.includes("open protonmail")) {
            speak("Opening ProtonMail..");
            window.open("https://protonmail.com/");
        } else if (message.includes("open gmail")) {
            speak("Opening Gmail..");
            window.open("https://mail.google.com/");
        } else if (message.includes("open outlook")) {
            speak("Opening Outlook..");
            window.open("https://outlook.live.com/");
        } else if (message.includes("open hotmail")) {
            speak("Opening Hotmail..");
            window.open("https://outlook.live.com/hotmail");
        } else if (message.includes("open icloud")) {
            speak("Opening iCloud..");
            window.open("https://www.icloud.com/");
        } else if (message.includes("open apple")) {
            speak("Opening Apple..");
            window.open("https://www.apple.com/");
        } else if (message.includes("open microsoft")) {
            speak("Opening Microsoft..");
            window.open("https://www.microsoft.com/");
        } else if (message.includes("open google drive")) {
            speak("Opening Google Drive..");
            window.open("https://drive.google.com/");
        } else if (message.includes("open onedrive")) {
            speak("Opening OneDrive..");
            window.open("https://onedrive.live.com/");
        } else if (message.includes("open mega")) {
            speak("Opening MEGA..");
            window.open("https://mega.nz/");
        } else if (message.includes("open icq")) {
            speak("Opening ICQ..");
            window.open("https://www.icq.com/");
        } else if (message.includes("open vk")) {
            speak("Opening VK..");
            window.open("https://www.vk.com/");
        } else if (message.includes("open ok.ru")) {
            speak("Opening OK.ru..");
            window.open("https://www.ok.ru/");
        } else if (message.includes("open flipkart")) {
            speak("Opening Flipkart..");
            window.open("https://www.flipkart.com/");
        }
        
     else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://"); // This may not work, browser support needed for custom protocols
    }
    else if (message.includes("open camera")) {
        speak("Opening camera..");
        window.open("camera://"); // Browser support needed for this custom protocol
    } else if (message.includes("open calendar")) {
        speak("Opening calendar..");
        window.open("calendar://"); // Browser support needed for this custom protocol
    } else if (message.includes("open maps")) {
        speak("Opening Maps..");
        window.open("https://maps.google.com/");
    } else if (message.includes("open news")) {
        speak("Opening news..");
        window.open("https://news.google.com/");
    } else if (message.includes("open contacts")) {
        speak("Opening contacts..");
        window.open("contacts://"); // Custom protocol
    } else if (message.includes("open notes")) {
        speak("Opening notes..");
        window.open("notes://"); // Custom protocol
    } else if (message.includes("open settings")) {
        speak("Opening settings..");
        window.open("settings://"); // Custom protocol
    } else if (message.includes("open files")) {
        speak("Opening files..");
        window.open("files://"); // Custom protocol
    } else if (message.includes("open notepad")) {
        speak("Opening Notepad..");
        window.open("notepad://"); // Custom protocol
    } else if (message.includes("open chrome")) {
        speak("Opening Chrome..");
        window.open("https://www.google.com/chrome/");
    } else if (message.includes("open firefox")) {
        speak("Opening Firefox..");
        window.open("https://www.mozilla.org/en-US/firefox/new/");
    } else if (message.includes("open safari")) {
        speak("Opening Safari..");
        window.open("https://www.apple.com/safari/");
    } else if (message.includes("open edge")) {
        speak("Opening Edge..");
        window.open("https://www.microsoft.com/edge");
    } else if (message.includes("open opera")) {
        speak("Opening Opera..");
        window.open("https://www.opera.com/");
    } else if (message.includes("open gmail")) {
        speak("Opening Gmail..");
        window.open("https://mail.google.com/");
    } else if (message.includes("open yahoo mail")) {
        speak("Opening Yahoo Mail..");
        window.open("https://mail.yahoo.com/");
    } else if (message.includes("open outlook mail")) {
        speak("Opening Outlook..");
        window.open("https://outlook.live.com/");
    } else if (message.includes("open calendar")) {
        speak("Opening Google Calendar..");
        window.open("https://calendar.google.com/");
    } else if (message.includes("open drive")) {
        speak("Opening Google Drive..");
        window.open("https://drive.google.com/");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator..");
        window.open("calculator://");
    } else if (message.includes("open weather")) {
        speak("Opening Weather..");
        window.open("https://weather.com/");
    } else if (message.includes("open youtube music")) {
        speak("Opening YouTube Music..");
        window.open("https://music.youtube.com/");
    } else if (message.includes("open amazon music")) {
        speak("Opening Amazon Music..");
        window.open("https://music.amazon.com/");
    } else if (message.includes("open apple music")) {
        speak("Opening Apple Music..");
        window.open("https://music.apple.com/");
    } else if (message.includes("open google photos")) {
        speak("Opening Google Photos..");
        window.open("https://photos.google.com/");
    } else if (message.includes("open pinterest")) {
        speak("Opening Pinterest..");
        window.open("https://www.pinterest.com/");
    } else if (message.includes("open twitter")) {
        speak("Opening Twitter..");
        window.open("https://twitter.com/");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook..");
        window.open("https://www.facebook.com/");
    } else if (message.includes("open messenger")) {
        speak("Opening Messenger..");
        window.open("https://www.messenger.com/");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram..");
        window.open("https://www.instagram.com/");
    } else if (message.includes("open snapchat")) {
        speak("Opening Snapchat..");
        window.open("https://www.snapchat.com/");
    } else if (message.includes("open telegram")) {
        speak("Opening Telegram..");
        window.open("https://www.telegram.org/");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp Web..");
        window.open("https://web.whatsapp.com/");
    } else if (message.includes("open signal")) {
        speak("Opening Signal..");
        window.open("https://signal.org/");
    } else if (message.includes("open reddit")) {
        speak("Opening Reddit..");
        window.open("https://www.reddit.com/");
    } else if (message.includes("open tiktok")) {
        speak("Opening TikTok..");
        window.open("https://www.tiktok.com/");
    } else if (message.includes("open vimeo")) {
        speak("Opening Vimeo..");
        window.open("https://www.vimeo.com/");
    } else if (message.includes("open netflix")) {
        speak("Opening Netflix..");
        window.open("https://www.netflix.com/");
    } else if (message.includes("open amazon prime video")) {
        speak("Opening Amazon Prime Video..");
        window.open("https://www.primevideo.com/");
    } else if (message.includes("open hulu")) {
        speak("Opening Hulu..");
        window.open("https://www.hulu.com/");
    } else if (message.includes("open disney plus")) {
        speak("Opening Disney Plus..");
        window.open("https://www.disneyplus.com/");
    } else if (message.includes("open hotstar")) {
        speak("Opening Hotstar..");
        window.open("https://www.hotstar.com/");
    } else if (message.includes("open sony liv")) {
        speak("Opening Sony Liv..");
        window.open("https://www.sonyliv.com/");
    } else if (message.includes("open zee5")) {
        speak("Opening Zee5..");
        window.open("https://www.zee5.com/");
    } else if (message.includes("open mx player")) {
        speak("Opening MX Player..");
        window.open("https://www.mxplayer.in/");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube..");
        window.open("https://www.youtube.com/");
    } else if (message.includes("open dailymotion")) {
        speak("Opening Dailymotion..");
        window.open("https://www.dailymotion.com/");
    } else if (message.includes("open imdb")) {
        speak("Opening IMDb..");
        window.open("https://www.imdb.com/");
    } else if (message.includes("open gemini")) {
        speak("Opening gemini ai..");
        window.open("https://gemini.google.com/app?hl=en-IN");
    } else if (message.includes("open chatgpt")) {
        speak("Opening chatgpt..");
        window.open("https://chatgpt.com/");
    } else if (message.includes("open ebay")) {
        speak("Opening eBay..");
        window.open("https://www.ebay.com/");
    } else if (message.includes("open myntra")) {
        speak("Opening Myntra..");
        window.open("https://www.myntra.com/");
    } else if (message.includes("open ajio")) {
        speak("Opening Ajio..");
        window.open("https://www.ajio.com/");
    } else if (message.includes("open snapdeal")) {
        speak("Opening Snapdeal..");
        window.open("https://www.snapdeal.com/");
    } else if (message.includes("open aliexpress")) {
        speak("Opening AliExpress..");
        window.open("https://www.aliexpress.com/");
    } else if (message.includes("open paytm mall")) {
        speak("Opening Paytm Mall..");
        window.open("https://www.paytmmall.com/");
    } else if (message.includes("open zomato")) {
        speak("Opening Zomato..");
        window.open("https://www.zomato.com/");
    } else if (message.includes("open swiggy")) {
        speak("Opening Swiggy..");
        window.open("https://www.swiggy.com/");
    } else if (message.includes("open uber eats")) {
        speak("Opening Uber Eats..");
        window.open("https://www.ubereats.com/");
    } else if (message.includes("open ola")) {
        speak("Opening Ola..");
        window.open("https://www.olacabs.com/");
    } else if (message.includes("open uber")) {
        speak("Opening Uber..");
        window.open("https://www.uber.com/");
    } else if (message.includes("open irctc")) {
        speak("Opening IRCTC..");
        window.open("https://www.irctc.co.in/");
    } else if (message.includes("open makemytrip")) {
        speak("Opening MakeMyTrip..");
        window.open("https://www.makemytrip.com/");
    } else if (message.includes("open goibibo")) {
        speak("Opening Goibibo..");
        window.open("https://www.goibibo.com/");
    } else if (message.includes("open trivago")) {
        speak("Opening Trivago..");
        window.open("https://www.trivago.com/");
    } else if (message.includes("open booking.com")) {
        speak("Opening Booking.com..");
        window.open("https://www.booking.com/");
    } 
    
     else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("shipra", "").replace("shifra", "").replace("what is", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shipra", "").replace("shifra", "").replace("what is", "")}`, "_blank");
    }
}

// Log available voices for debugging
loadVoices().then(voices => {
    console.log("Available voices:", voices); // Log all available voices
});




// let btn=document.querySelector("#btn")
// let content=document.querySelector("#content")
// let voice=document.querySelector("#voice")

// function speak(text){
//     let text_speak=new SpeechSynthesisUtterance(text)
//     text_speak.rate=1;
//     text_speak.pitch=1;
//     text_speak.volume=1;
//     text_speak.lang="en-IN"
//     window.speechSynthesis.speak(text_speak)
// }

// function wishMe(){
//     let day=new Date()
//     let hours=day.getHours()
//     if(hours>=0 && hours<12){
//         speak("Good Morning Sir")
//     }
//     else if(hours>=12 && hours<16){
//         speak("Good Afternoon Sir")
//     }
//     else{
//         speak("Good Evening Sir")
//     }
// }

// window.addEventListener('load',()=>{
//     wishMe()
// })

// let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
// let recognition = new speechRecognition()
// recognition.onresult=(event)=>{
//     let currenIndex=event.resultIndex
//     let transcript=event.results[currenIndex][0].transcript
//     content.innerText=transcript
//     takeCommand(transcript.toLowerCase())
// }
// btn.addEventListener("click",()=>{
//   recognition.start()
//   btn.Style.display="none"
//   voice.Style.display="block"
// })

// function takeCommand(massage){
//   btn.Style.display="flex"
//   voice.Style.display="none"
//     if(massage.includes("hello")||(massage.includes("hey"))){
//       speak("Hello, i am Shifra, what can i help you?")
//     }
//     else if((massage.includes("who are you?"))){
//         speak("Hello, i am Shifra, your virtual assistant made by Suman")
//     }
//     else if((massage.includes("open youtube"))){
//         speak("opening youtube")
//         window.open("https://www.youtube.com/")
//     }
//     else if((massage.includes("open calculator"))){
//         speak("opening calculator")
//         window.open("calculator://")
//     }
//     else if((massage.includes("time"))){
//         let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
//         speak(time)
//     }
//     else if((massage.includes("date"))){
//         let date=new Date().toLocaleString(undefined,{date:"numeric",month:"short"})
//         speak(date)
//     }
//     else{
//         let finalText="This is what i found on internet regarding" +massage.replace("shipra","")||massage.replace("shifra","")||massage.replace("what is","")
//         speak(finalText)
//         window.open('https://www.google.com/search?q=${massage.replace("shipra","")}',"_blank")
//     }
// }