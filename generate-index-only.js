const fs = require('fs');
const path = require('path');

function generateIconIndex() {
    console.log('Scanning icon directories...');
    
    const iconIndex = [];
    
    // List of author directories
    const authorDirs = [
        'andymeneely', 'aussiesim', 'badges', 'carl-olsen', 'caro-asercion',
        'cathelineau', 'catsu', 'darkzaitzev', 'delapouite', 'faithtoken',
        'felbrigg', 'generalace135', 'guard13007', 'heavenly-dog', 'irongamer',
        'john-colburn', 'john-redman', 'kier-heyl', 'lorc', 'lord-berandas',
        'lucasms', 'pepijn-poolman', 'pierre-leducq', 'priorblue', 'quoting',
        'rihlsul', 'sbed', 'seregacchtuf', 'skoll', 'sparker', 'spencerdub',
        'starseeker', 'various-artists', 'viscious-speed', 'willdabeast',
        'zajkonur', 'zeromancer'
    ];
    
    // Scan each author directory
    authorDirs.forEach(authorDir => {
        if (fs.existsSync(authorDir)) {
            console.log(`Scanning ${authorDir}...`);
            scanAuthorDirectory(authorDir);
        }
    });
    
    function scanAuthorDirectory(authorDir) {
        try {
            const files = fs.readdirSync(authorDir);
            
            files.forEach(file => {
                if (file.endsWith('.svg')) {
                    const iconName = file.replace('.svg', '');
                    
                    if (iconName.match(/^[a-zA-Z0-9\-_]+$/)) {
                        const tags = generateTags(iconName, authorDir);
                        
                        iconIndex.push({
                            name: iconName,
                            path: `${authorDir}/${file}`,
                            author: authorDir,
                            tags: tags,
                            category: getIconCategory(iconName)
                        });
                    }
                }
            });
        } catch (error) {
            console.warn(`Warning: Could not read directory ${authorDir}: ${error.message}`);
        }
    }
    
    function getIconCategory(iconName) {
        const name = iconName.toLowerCase();
        const categories = {
            // Weapons - Expanded
            weapon: ['sword', 'axe', 'bow', 'dagger', 'mace', 'spear', 'hammer', 'blade', 'knife', 'crossbow', 'club', 'whip', 'flail', 'halberd', 'katana', 'scimitar', 'rapier', 'claymore', 'war', 'battle', 'combat', 'weapon', 'gun', 'pistol', 'rifle'],
            
            // Magic & Spells
            magic: ['spell', 'magic', 'crystal', 'potion', 'scroll', 'book', 'rune', 'wand', 'staff', 'orb', 'enchant', 'mystic', 'arcane', 'ritual', 'charm', 'curse', 'hex', 'ward', 'aura', 'energy', 'power', 'mana'],
            
            // Characters & People  
            character: ['person', 'face', 'head', 'wizard', 'warrior', 'rogue', 'knight', 'priest', 'paladin', 'monk', 'archer', 'assassin', 'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'ranger', 'sorcerer', 'warlock', 'witch', 'mage', 'hero', 'villain', 'human', 'elf', 'dwarf', 'halfling'],
            
            // Monsters & Creatures
            monster: ['dragon', 'orc', 'goblin', 'skeleton', 'zombie', 'demon', 'beast', 'creature', 'undead', 'ghost', 'spirit', 'wraith', 'vampire', 'werewolf', 'troll', 'giant', 'ogre', 'minotaur', 'hydra', 'basilisk', 'phoenix', 'griffin', 'unicorn', 'pegasus'],
            
            // Armor & Protection
            armor: ['helmet', 'shield', 'armor', 'gauntlet', 'boot', 'chainmail', 'plate', 'leather', 'robe', 'cloak', 'protection', 'defense', 'guard', 'mail', 'vest', 'bracer'],
            
            // Nature & Environment
            nature: ['tree', 'forest', 'mountain', 'river', 'flower', 'leaf', 'plant', 'stone', 'rock', 'grass', 'wood', 'earth', 'water', 'fire', 'air', 'wind', 'storm', 'lightning', 'sun', 'moon', 'star', 'cloud', 'snow', 'ice', 'desert', 'ocean', 'lake'],
            
            // Buildings & Structures
            building: ['castle', 'tower', 'house', 'gate', 'door', 'fortress', 'wall', 'bridge', 'temple', 'church', 'shrine', 'dungeon', 'cave', 'tomb', 'ruins', 'palace', 'manor', 'hut', 'tent', 'camp'],
            
            // Items & Objects
            item: ['chest', 'bag', 'coin', 'gem', 'key', 'torch', 'lantern', 'rope', 'barrel', 'box', 'bottle', 'flask', 'vial', 'ring', 'amulet', 'pendant', 'crown', 'treasure', 'gold', 'silver', 'jewel', 'crystal'],
            
            // Food & Drink
            food: ['bread', 'meat', 'fruit', 'drink', 'ale', 'wine', 'beer', 'food', 'apple', 'grape', 'fish', 'cheese', 'meal', 'feast', 'hunger', 'thirst', 'cook', 'kitchen'],
            
            // Tools & Equipment
            tool: ['hammer', 'pick', 'shovel', 'rope', 'ladder', 'bucket', 'anvil', 'forge', 'craft', 'tool', 'gear', 'wheel', 'cog', 'lever', 'pulley', 'chisel', 'saw', 'nail', 'screw'],
            
            // Transportation
            transport: ['horse', 'cart', 'boat', 'ship', 'wagon', 'carriage', 'mount', 'ride', 'sail', 'oar', 'wheel', 'vehicle', 'travel', 'journey'],
            
            // Symbols & Abstract
            symbol: ['cross', 'star', 'circle', 'triangle', 'arrow', 'heart', 'skull', 'bone', 'eye', 'hand', 'foot', 'wing', 'feather', 'horn', 'claw', 'fang', 'spiral', 'diamond'],
            
            // Body Parts
            body: ['hand', 'foot', 'eye', 'head', 'face', 'mouth', 'nose', 'ear', 'arm', 'leg', 'finger', 'toe', 'hair', 'beard', 'muscle', 'bone', 'blood', 'heart', 'brain'],
            
            // Actions & Movements
            action: ['run', 'walk', 'jump', 'climb', 'swim', 'fly', 'dance', 'fight', 'attack', 'defend', 'guard', 'strike', 'punch', 'kick', 'grab', 'throw', 'catch', 'pull', 'push'],
            
            // Elements & Effects
            element: ['fire', 'water', 'earth', 'air', 'ice', 'lightning', 'poison', 'acid', 'shadow', 'light', 'dark', 'holy', 'evil', 'chaos', 'order', 'life', 'death', 'time', 'space'],
            
            // Status & Conditions
            status: ['health', 'heal', 'hurt', 'pain', 'sick', 'cure', 'poison', 'sleep', 'wake', 'tired', 'energy', 'strength', 'weak', 'fast', 'slow', 'invisible', 'visible'],
            
            // Music & Sound
            music: ['music', 'sound', 'song', 'sing', 'drum', 'flute', 'harp', 'lute', 'horn', 'bell', 'chime', 'note', 'melody', 'rhythm', 'dance', 'bard'],
            
            // Communication
            communication: ['speak', 'talk', 'word', 'letter', 'message', 'sign', 'signal', 'flag', 'banner', 'scroll', 'book', 'paper', 'ink', 'pen', 'quill', 'write', 'read'],
            
            // Time & Weather
            time: ['day', 'night', 'dawn', 'dusk', 'hour', 'minute', 'clock', 'time', 'season', 'winter', 'spring', 'summer', 'autumn', 'year', 'month', 'week'],
            
            // Weather
            weather: ['rain', 'snow', 'storm', 'wind', 'cloud', 'sun', 'thunder', 'lightning', 'fog', 'mist', 'hail', 'tornado', 'hurricane', 'blizzard'],
            
            // Professions & Roles
            profession: ['smith', 'guard', 'merchant', 'farmer', 'hunter', 'fisher', 'cook', 'baker', 'tailor', 'carpenter', 'mason', 'miner', 'sailor', 'soldier', 'scout', 'spy', 'thief', 'assassin'],
            
            // Emotions & Mental States
            emotion: ['happy', 'sad', 'angry', 'fear', 'love', 'hate', 'joy', 'sorrow', 'rage', 'calm', 'peace', 'war', 'brave', 'coward', 'wise', 'fool', 'mad', 'sane'],
            
            // Gaming & Meta
            gaming: ['dice', 'card', 'game', 'play', 'win', 'lose', 'score', 'point', 'level', 'rank', 'achievement', 'quest', 'mission', 'goal', 'target', 'objective'],
            
            // Military & War
            military: ['army', 'soldier', 'battle', 'war', 'fight', 'siege', 'fortress', 'castle', 'guard', 'patrol', 'march', 'retreat', 'victory', 'defeat', 'strategy', 'tactic'],
            
            // Trade & Commerce
            trade: ['merchant', 'shop', 'store', 'market', 'trade', 'buy', 'sell', 'price', 'cost', 'money', 'coin', 'gold', 'silver', 'copper', 'payment', 'exchange']
        };
        
        // Check each category for matches
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => name.includes(keyword))) {
                return category;
            }
        }
        
        // Special pattern matching for common icon patterns
        if (name.match(/(ed|ing)$/)) return 'action';
        if (name.match(/^(broken|cracked|damaged)/)) return 'status';
        if (name.match(/(flame|fire|burn)/)) return 'element';
        if (name.match(/(frost|frozen|cold)/)) return 'element';
        if (name.match(/(sharp|pointed)/)) return 'weapon';
        if (name.match(/(round|circular)/)) return 'symbol';
        if (name.match(/(ancient|old|ruin)/)) return 'building';
        
        return 'misc';
    }
    
    function generateTags(iconName, author) {
        const nameParts = iconName.split('-').filter(part => part.length > 1);
        const tags = [...nameParts, author];
        const category = getIconCategory(iconName);
        if (category !== 'misc') tags.push(category);
        
        const synonyms = getSynonyms(iconName);
        tags.push(...synonyms);
        
        return [...new Set(tags)].join(' ').toLowerCase();
    }
    
    function getSynonyms(iconName) {
        const name = iconName.toLowerCase();
        const synonymMap = {
            'sword': ['blade', 'weapon'],
            'dragon': ['wyrm', 'beast'],
            'magic': ['spell', 'arcane'],
            'castle': ['fortress', 'keep'],
            'knight': ['warrior', 'fighter'],
            'bow': ['archer', 'ranged'],
            'shield': ['defense', 'protection'],
            'potion': ['bottle', 'flask'],
            'scroll': ['document', 'paper']
        };
        
        const synonyms = [];
        for (const [word, syns] of Object.entries(synonymMap)) {
            if (name.includes(word)) synonyms.push(...syns);
        }
        return synonyms;
    }
    
    iconIndex.sort((a, b) => a.name.localeCompare(b.name));
    
    const stats = {
        totalIcons: iconIndex.length,
        categories: {},
        authors: {},
        generatedAt: new Date().toISOString()
    };
    
    iconIndex.forEach(icon => {
        stats.categories[icon.category] = (stats.categories[icon.category] || 0) + 1;
        stats.authors[icon.author] = (stats.authors[icon.author] || 0) + 1;
    });
    
    try {
        fs.writeFileSync('icon-index.json', JSON.stringify(iconIndex, null, 2));
        fs.writeFileSync('icon-stats.json', JSON.stringify(stats, null, 2));
        
        console.log(`SUCCESS: Generated index with ${iconIndex.length} icons`);
        console.log(`Categories: ${Object.keys(stats.categories).length}`);
        console.log(`Authors: ${Object.keys(stats.authors).length}`);
        
        const topCategories = Object.entries(stats.categories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        console.log('\nTop 10 Categories:');
        topCategories.forEach(([category, count]) => {
            console.log(`  ${category}: ${count} icons`);
        });
        
    } catch (error) {
        console.error('ERROR: Failed to write files:', error.message);
        process.exit(1);
    }
}

generateIconIndex();