document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const futuresSelection = document.getElementById('futuresSelection');
    const scenarioView = document.getElementById('scenarioView');
    const backButton = document.getElementById('backButton');
    const futureCardBurned = document.getElementById('futureCardBurned');
    const futureCardHealed = document.getElementById('futureCardHealed');
    const timeButtons = document.querySelectorAll('.time-button');
    const sceneImage = document.getElementById('sceneImage');
    const sceneCaption = document.getElementById('sceneCaption');
    const voiceoverButton = document.getElementById('voiceoverButton');
    const voiceoverText = document.getElementById('voiceoverText');
    const languageSelect = document.getElementById('languageSelect');

    // State
    let currentFuture = null; // 'burned' or 'healed'
    let currentTime = 'morning'; // 'morning', 'noon', or 'evening'
    let currentLanguage = 'en';

    // Content data
    const content = {
        burned: {
            morning: {
                imageSrc: "https://images.ctfassets.net/yixw23k2v6vo/aKhur7s6IBjoxPHkHr4Ni/336ec7cffe19513cc795c092c38418a8/person-wears-a-face-mask-GettyImages-1258513476-3000x2000.jpg",
                voiceover: {
                    en: "Good morning. The time is 7:00 AM, and the temperature has already reached 41°C. The heatwave warning remains in effect, with peak temperatures expected to exceed 51°C by midday. Air quality is at dangerous levels.",
                    es: "Buenos días. Son las 7:00 AM, y la temperatura ya ha alcanzado los 41°C. La advertencia de ola de calor sigue vigente, con temperaturas máximas que se espera superen los 51°C para el mediodía. La calidad del aire está en niveles peligrosos.",
                    fr: "Bonjour. Il est 7h00 du matin, et la température a déjà atteint 41°C. L'alerte canicule reste en vigueur, avec des températures maximales qui devraient dépasser 51°C à midi. La qualité de l'air est à des niveaux dangereux.",
                    de: "Guten Morgen. Es ist 7:00 Uhr morgens, und die Temperatur hat bereits 41°C erreicht. Die Hitzewellenwarnung bleibt in Kraft, mit Spitzentemperaturen, die bis zum Mittag voraussichtlich 51°C überschreiten werden. Die Luftqualität ist auf gefährlichem Niveau.",
                    zh: "早上好。现在是早上7:00，温度已经达到41°C。热浪警报仍然生效，预计中午时分最高温度将超过51°C。空气质量处于危险水平。"
                }
            },
            noon: {
                imageSrc: "https://businessfoundations.com.au/wp-content/uploads/Picture1-40-1200x627-c-default.jpg",
                voiceover: {
                    en: "It's now noon, and the heat is relentless. The cityscape is covered in a thick orange haze—smoke from distant wildfires mixes with pollution. Transportation is at a standstill, with roads flooded from rising sea levels.",
                    es: "Es mediodía, y el calor es implacable. El paisaje urbano está cubierto por una espesa neblina naranja: el humo de los incendios forestales distantes se mezcla con la contaminación. El transporte está paralizado, con carreteras inundadas por el aumento del nivel del mar.",
                    fr: "Il est maintenant midi, et la chaleur est implacable. Le paysage urbain est couvert d'une épaisse brume orange—la fumée des feux de forêt lointains se mêle à la pollution. Les transports sont à l'arrêt, avec des routes inondées par la montée du niveau de la mer.",
                    de: "Es ist jetzt Mittag, und die Hitze ist unerbittlich. Die Stadtlandschaft ist in einen dicken orangefarbenen Dunst gehüllt—Rauch von fernen Waldbränden vermischt sich mit Verschmutzung. Der Verkehr steht still, da die Straßen durch den steigenden Meeresspiegel überflutet sind.",
                    zh: "现在是中午，热浪毫不留情。城市景观被浓厚的橙色雾霾覆盖—远处野火的烟雾与污染混合在一起。由于海平面上升导致道路被淹没，交通陷入停滞。"
                }
            },
            evening: {
                imageSrc: "https://www.shutterstock.com/image-photo/blackout-energy-crisis-destruction-infrastructure-600nw-2229547575.jpg",
                voiceover: {
                    en: "As the sun sets, the temperature remains above 40°C, offering little relief from the scorching day. Another rolling blackout leaves millions in darkness. Dinner consists of lab-grown protein paste—traditional agriculture has long collapsed.",
                    es: "Mientras se pone el sol, la temperatura permanece por encima de los 40°C, ofreciendo poco alivio del abrasador día. Otro apagón rotativo deja a millones en la oscuridad. La cena consiste en pasta de proteínas cultivadas en laboratorio; la agricultura tradicional colapsó hace tiempo.",
                    fr: "Au coucher du soleil, la température reste au-dessus de 40°C, offrant peu de répit après cette journée torride. Une autre panne d'électricité rotative laisse des millions de personnes dans l'obscurité. Le dîner se compose de pâte protéinée cultivée en laboratoire—l'agriculture traditionnelle s'est effondrée depuis longtemps.",
                    de: "Bei Sonnenuntergang bleibt die Temperatur über 40°C und bietet kaum Erleichterung von dem sengenden Tag. Ein weiterer rollender Stromausfall lässt Millionen im Dunkeln. Das Abendessen besteht aus im Labor gezüchteter Proteinpaste—die traditionelle Landwirtschaft ist längst zusammengebrochen.",
                    zh: "当太阳落山时，温度仍保持在40°C以上，几乎没有缓解酷热的一天。另一次轮流停电使数百万人陷入黑暗。晚餐由实验室培育的蛋白质糊组成—传统农业早已崩溃。"
                }
            }
        },
        healed: {
            morning: {
                imageSrc: "https://www.goodnewsnetwork.org/wp-content/uploads/2018/06/Vertical-Gardens-in-Mexico-City-Via-Verde.jpg",
                voiceover: {
                    en: "Good morning. It's 7:00 AM, and the air is crisp and clean. The temperature is a comfortable 21°C with a light breeze carrying the scent of rooftop gardens. Your home, powered by solar and wind energy, has been efficiently storing energy overnight.",
                    es: "Buenos días. Son las 7:00 AM, y el aire es fresco y limpio. La temperatura es un cómodo 21°C con una ligera brisa que lleva el aroma de los jardines en las azoteas. Tu casa, alimentada por energía solar y eólica, ha estado almacenando energía eficientemente durante la noche.",
                    fr: "Bonjour. Il est 7h00 du matin, et l'air est vif et pur. La température est un confortable 21°C avec une légère brise portant le parfum des jardins sur les toits. Votre maison, alimentée par l'énergie solaire et éolienne, a efficacement stocké de l'énergie pendant la nuit.",
                    de: "Guten Morgen. Es ist 7:00 Uhr morgens, und die Luft ist frisch und sauber. Die Temperatur liegt bei angenehmen 21°C mit einer leichten Brise, die den Duft der Dachgärten trägt. Ihr Haus, das mit Solar- und Windenergie betrieben wird, hat über Nacht effizient Energie gespeichert.",
                    zh: "早上好。现在是早上7:00，空气清新洁净。温度宜人，为21°C，伴随着轻风，带来屋顶花园的香气。您的家，由太阳能和风能供电，已经在夜间高效地储存了能量。"
                }
            },
            noon: {
                imageSrc: "https://img.freepik.com/premium-photo/futuristic-cityscape-with-autonomous-vehicles_73899-28760.jpg",
                voiceover: {
                    en: "It's midday, and the city is alive with activity. Solar-powered trams glide through the streets, and hydrogen buses make transportation seamless. The local market is bustling, filled with fresh, organic produce grown in urban farms.",
                    es: "Es mediodía, y la ciudad está llena de actividad. Los tranvías solares se deslizan por las calles, y los autobuses de hidrógeno hacen que el transporte sea perfecto. El mercado local está muy concurrido, lleno de productos frescos y orgánicos cultivados en granjas urbanas.",
                    fr: "C'est midi, et la ville est animée d'activité. Les tramways solaires glissent dans les rues, et les bus à hydrogène rendent les transports fluides. Le marché local est en pleine effervescence, rempli de produits frais et biologiques cultivés dans des fermes urbaines.",
                    de: "Es ist Mittag, und die Stadt ist voller Aktivität. Solarbetriebene Straßenbahnen gleiten durch die Straßen, und Wasserstoffbusse machen den Transport nahtlos. Der lokale Markt ist geschäftig, gefüllt mit frischen, organischen Produkten, die in städtischen Farmen angebaut werden.",
                    zh: "现在是中午，城市充满活力。太阳能电车在街道上滑行，氢能公共汽车使交通无缝衔接。当地市场热闹非凡，充满了在城市农场种植的新鲜有机农产品。"
                }
            },
            evening: {
                imageSrc: "https://as2.ftcdn.net/v2/jpg/05/28/47/99/1000_F_528479990_9TZrHweHrnEoYVSEoQv7UwrvDTMjwkds.jpg",
                voiceover: {
                    en: "As night falls, the city glows with energy harvested from the sun and wind. Families gather in community parks, discussing new environmental initiatives that continue to improve life. Scientists confirm: global temperatures have stabilized.",
                    es: "Al caer la noche, la ciudad brilla con energía cosechada del sol y el viento. Las familias se reúnen en parques comunitarios, discutiendo nuevas iniciativas ambientales que continúan mejorando la vida. Los científicos confirman: las temperaturas globales se han estabilizado.",
                    fr: "À la tombée de la nuit, la ville brille de l'énergie récoltée du soleil et du vent. Les familles se rassemblent dans les parcs communautaires, discutant de nouvelles initiatives environnementales qui continuent d'améliorer la vie. Les scientifiques confirment : les températures mondiales se sont stabilisées.",
                    de: "Bei Einbruch der Nacht leuchtet die Stadt mit Energie, die von Sonne und Wind geerntet wurde. Familien versammeln sich in Gemeinschaftsparks und diskutieren über neue Umweltinitiativen, die das Leben weiter verbessern. Wissenschaftler bestätigen: Die globalen Temperaturen haben sich stabilisiert.",
                    zh: "当夜幕降临，城市因收集自太阳和风的能量而发光。家庭聚集在社区公园，讨论继续改善生活的新环保倡议。科学家证实：全球温度已经稳定。"
                }
            }
        }
    };

    // Initialize event listeners
    futureCardBurned.addEventListener('click', () => selectFuture('burned'));
    futureCardHealed.addEventListener('click', () => selectFuture('healed'));
    backButton.addEventListener('click', showFutureSelection);
    
    timeButtons.forEach(button => {
        const time = button.getAttribute('data-time');
        button.addEventListener('click', () => selectTime(time));
    });
    
    voiceoverButton.addEventListener('click', toggleVoiceover);
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;  // Update the current language
        updateSceneContent();             // Refresh content with new language
    });
    

    // Functions
    function selectFuture(future) {
        currentFuture = future;
        currentTime = 'morning'; // Reset to morning when changing futures
        
        // Update UI for selected future
        futuresSelection.style.display = 'none';
        scenarioView.style.display = 'flex';
        
        // Update voiceover button color based on future
        if (future === 'burned') {
            voiceoverButton.classList.remove('green');
        } else {
            voiceoverButton.classList.add('green');
        }
        
        // Set active time button
        timeButtons.forEach(button => {
            if (button.getAttribute('data-time') === 'morning') {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        updateSceneContent();
    }
    
    function showFutureSelection() {
        futuresSelection.style.display = 'flex';
        scenarioView.style.display = 'none';
        currentFuture = null;
        voiceoverText.textContent = '';
    }
    
    function selectTime(time) {
        currentTime = time;
        
        // Update active button
        timeButtons.forEach(button => {
            if (button.getAttribute('data-time') === time) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        updateSceneContent();
    }
    
       function updateSceneContent() {
        if (!currentFuture || !currentTime) return;

        const sceneData = content[currentFuture][currentTime];
        sceneImage.src = sceneData.imageSrc;
        sceneCaption.textContent = sceneData.caption;
        voiceoverText.textContent = sceneData.voiceover[currentLanguage] || sceneData.voiceover['en'];
    }

    let isSpeaking = false; // Track if voiceover is active

    function toggleVoiceover() {
        // Stop ongoing voiceover if active
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            voiceoverButton.textContent = "Play Voiceover"; // Optional UI update
            return;
        }
    
        // Start new voiceover if content exists
        if (!voiceoverText.textContent) return;
    
        const speech = new SpeechSynthesisUtterance(voiceoverText.textContent);
        speech.lang = currentLanguage;
    
        // Track voiceover state
        speech.onstart = () => {
            isSpeaking = true;
            voiceoverButton.textContent = "Stop Voiceover"; // Optional UI update
        };
    
        speech.onend = () => {
            isSpeaking = false;
            voiceoverButton.textContent = "Play Voiceover"; // Optional UI update
        };
    
        window.speechSynthesis.speak(speech);
    }
    

    // Initial display setup
    showFutureSelection();
})