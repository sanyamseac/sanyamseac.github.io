document.addEventListener('click', function(event) {
    const date = new Date(Date.now());
    const formattedDate = date.toLocaleString();
    console.log("Timestamp:", formattedDate, '; Element Clicked;', event.target.tagName, 'tag; exact element:', event.target);
});

document.addEventListener('visibilitychange', function() {
    const date = new Date(Date.now());
    const formattedDate = date.toLocaleString();
    console.log("Timestamp:", formattedDate, 'Page viewed');
});

document.addEventListener('DOMContentLoaded', function () {
    const activity = document.querySelector('#activity-input');
    const activity_output = document.querySelector('#activity-output');
    activity.addEventListener('input', function() {
        const text = activity.value;
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const specialSymbolCount = (text.match(/[^\w\s]/g) || []).length;
        
        // Tokenize text into words
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Count pronouns
        const pronouns = {
            'i': 0, 'me': 0, 'my': 0, 'mine': 0, 'myself': 0,
            'you': 0, 'your': 0, 'yours': 0, 'yourself': 0,
            'he': 0, 'him': 0, 'his': 0, 'himself': 0,
            'she': 0, 'her': 0, 'hers': 0, 'herself': 0,
            'it': 0, 'its': 0, 'itself': 0,
            'we': 0, 'us': 0, 'our': 0, 'ours': 0, 'ourselves': 0,
            'they': 0, 'them': 0, 'their': 0, 'theirs': 0, 'themselves': 0
        };
        
        // Count prepositions
        const prepositions = {
            'about': 0, 'above': 0, 'across': 0, 'after': 0, 'against': 0, 
            'along': 0, 'among': 0, 'around': 0, 'at': 0, 'before': 0, 
            'behind': 0, 'below': 0, 'beneath': 0, 'beside': 0, 'between': 0, 
            'by': 0, 'down': 0, 'during': 0, 'for': 0, 'from': 0, 
            'in': 0, 'inside': 0, 'into': 0, 'near': 0, 'of': 0, 
            'off': 0, 'on': 0, 'onto': 0, 'out': 0, 'outside': 0, 
            'over': 0, 'through': 0, 'to': 0, 'toward': 0, 'under': 0, 
            'underneath': 0, 'until': 0, 'up': 0, 'upon': 0, 'with': 0, 
            'within': 0, 'without': 0
        };
        
        // Count indefinite articles
        const indefiniteArticles = {
            'a': 0, 'an': 0, 'some': 0, 'any': 0
        };
        
        // Process each word
        words.forEach(word => {
            // Check if word is a pronoun
            if (pronouns.hasOwnProperty(word)) {
                pronouns[word]++;
            }
            
            // Check if word is a preposition
            if (prepositions.hasOwnProperty(word)) {
                prepositions[word]++;
            }
            
            // Check if word is an indefinite article
            if (indefiniteArticles.hasOwnProperty(word)) {
                indefiniteArticles[word]++;
            }
        });
        
        // Create stats display HTML
        const statsDiv = document.createElement('div');
        statsDiv.innerHTML = `
            <h3>Text Statistics:</h3>
            <ul>
                <li>Letters: ${letterCount}</li>
                <li>Words: ${wordCount}</li>
                <li>Spaces: ${spaceCount}</li>
                <li>Newlines: ${newlineCount}</li>
                <li>Special Symbols: ${specialSymbolCount}</li>
            </ul>
        `;
        
        // Function to create detail sections for word types
        function createDetailSection(title, countObject) {
            const section = document.createElement('div');
            const items = Object.entries(countObject)
                .filter(([_, count]) => count > 0)
                .map(([word, count]) => `<li>${word}: ${count}</li>`)
                .join('');
                
            section.innerHTML = `
                <h3>${title}:</h3>
                ${items.length ? `<ul>${items}</ul>` : '<p>None found</p>'}
            `;
            
            return section;
        }
        
        // Group pronouns by type for better organization
        const pronounGroups = {
            'First person singular': ['i', 'me', 'my', 'mine', 'myself'],
            'Second person': ['you', 'your', 'yours', 'yourself'],
            'Third person masculine': ['he', 'him', 'his', 'himself'],
            'Third person feminine': ['she', 'her', 'hers', 'herself'],
            'Third person neutral': ['it', 'its', 'itself'],
            'First person plural': ['we', 'us', 'our', 'ours', 'ourselves'],
            'Third person plural': ['they', 'them', 'their', 'theirs', 'themselves']
        };
        
        // Create pronoun groups section
        const pronounSection = document.createElement('div');
        pronounSection.innerHTML = '<h3>Pronouns by Group:</h3>';
        
        let foundAnyPronouns = false;
        
        for (const [groupName, groupPronouns] of Object.entries(pronounGroups)) {
            const groupCounts = groupPronouns.map(p => {
                return { word: p, count: pronouns[p] };
            }).filter(item => item.count > 0);
            
            if (groupCounts.length > 0) {
                foundAnyPronouns = true;
                const groupSection = document.createElement('div');
                groupSection.innerHTML = `
                    <h4>${groupName}:</h4>
                    <ul>
                        ${groupCounts.map(item => `<li>${item.word}: ${item.count}</li>`).join('')}
                    </ul>
                `;
                pronounSection.appendChild(groupSection);
            }
        }
        
        if (!foundAnyPronouns) {
            pronounSection.innerHTML += '<p>No pronouns found</p>';
        }
        
        // Add all sections to the page
        const resultsContainer = document.querySelector('#activity-output')
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Add all sections
        resultsContainer.appendChild(statsDiv);
        resultsContainer.appendChild(pronounSection);
        resultsContainer.appendChild(createDetailSection('Prepositions', prepositions));
        resultsContainer.appendChild(createDetailSection('Indefinite Articles', indefiniteArticles));
    });
});