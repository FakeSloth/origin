import Vue from 'vue';
import Aliens from '../../cards/monsters/alien';
import Angels from '../../cards/monsters/angel';
import Beasts from '../../cards/monsters/beast';
import Demons from '../../cards/monsters/demon';
import Dragons from '../../cards/monsters/dragon';
import Mechs from '../../cards/monsters/mech';
import Humans from '../../cards/monsters/human';
import Spells from '../../cards/spells/spells';
import Traps from '../../cards/traps/traps';

Vue.config.debug = true;

var Card = Vue.extend({ 
	props: ['card'], 
	template: ` 
		<div> 
			<h1>{{card.name}} x{{card.copy}}</h1> 
			Cost: {{card.cost}}
			{{typeof card.life === 'number' ? 'Life: ' + card.life : ''}}
			{{typeof card.attack === 'number' ? 'Attack: ' + card.attack : ''}} 
			Effect: {{card.effect ? card.effect : 'None'}} 
		</div> 
	` 
});

Vue.component('card', Card);

function Collections() {
	this.alien = createCards(Aliens, 'alien');
	this.angel = createCards(Angels, 'angel');
	this.beast = createCards(Beasts, 'beast');
	this.demon = createCards(Demons, 'demon');
	this.dragon = createCards(Dragons, 'dragon');
	this.mech = createCards(Mechs, 'mech');
	this.human = createCards(Humans, 'human');
	this.spell = createCards(Spells, 'spell');
	this.trap = createCards(Traps, 'trap');
};

/**
 * Modify the created cards.
 *
 * @param {Array} collection
 * @param {String} name
 * @return {Array}
 */
function createCards(collection, name) {
	return collection.map(card => {
		card.copy = 2;
		if (card.limited) card.copy = 1;
		card.collection = name;
		return card;
	});
}

/**
 * Adds a card from src to target.
 *
 * (1) When card is limited, remove card from src and put it into the target.
 * (2) When there are two copies of a card (src has 2 copies and target has 0),
 * remove card from src, set the copy prop equal to 1,
 * and push it to src AND target.
 * (3) When there is only one copy of a card (src has 1 and target has 1 copy),
 * remove card from src and target, set the copy prop equal to 2,
 * and push it back ONLY to target.
 *
 * @param {Array} src
 * @param {Array} target
 * @param {Object} card
 */
function add(src, target, card) {
	src.$remove(card);
	if (card.limited) return target.push(card);
	if (card.copy === 2) {
		card.copy = 1;
		src.push(card);
	} else {
		target.$remove(card);
		card.copy = 2;
	}
	target.push(card);
}

let copyCache = {};

new Vue({
	el: '#app',
	data: {
		decks: [],
		currentDeck: [],	
		collections: [],
		currentCollection: [],
		deckName: '',
		loaded: false,
		index: 0
	},
	methods: {
		addToDeck(card) {
			if (this.deckTotal() >= 30) return;
			add(this.currentCollection, this.currentDeck, card);
		},

		addToCollection(card) {
			add(this.currentDeck, this.collections[card.collection], card);
		},

		changeCollection(collection) {
			this.currentCollection = this.collections[collection];
		},

		createNewDeck() {
			if (this.decks.length) console.log(JSON.stringify(this.decks[0].collections.alien))
			this.collections = new Collections();
			this.currentCollection = this.collections.alien;
			this.currentDeck = [];
			this.deckName = '';
			this.loaded = false;
			if (this.decks.length) console.log(JSON.stringify(this.decks[0].collections.alien))
		},

		deckTotal() {
			return this.currentDeck.reduce((acc, cur) => acc + cur.copy, 0);
		},

		loadDeck(index) {
			let deck = this.decks[index];
			this.collections = deck.collections;
			this.currentCollection = this.collections.alien;
			this.currentDeck = deck.cards;
			this.deckName = deck.name;
			this.index = index;
			this.loaded = true;
			for (let col in this.collections) {
				this.collections[col].forEach((_, i) => {
					this.collections[col][i].copy = copyCache[index].collections[col][i];
				});	
			}
			this.currentDeck.forEach((card, i) => {
				this.currentDeck[i].copy = copyCache[index].cards[i];
			});
		},

		saveDeck() {
			if (this.deckTotal() < 30) {
				return alert('Deck is not full!');
			}
			let deck = {
				name: this.deckName || 'Untitled Deck',
				cards: this.currentDeck,
				collections: this.collections
			};
			if (this.loaded) {
				this.decks.$set(this.index, deck);
			} else {
				this.decks.push(deck);
			}
			const index = this.decks.length - 1;
			copyCache[index] = {collections: {}, cards: {}};
			for (let col in this.collections) {
				copyCache[index].collections[col] = {};
				this.collections[col].forEach((card, i) => {
					copyCache[index].collections[col][i] = card.copy;
				});	
			}
			this.currentDeck.forEach((card, i) => {
				copyCache[index].cards[i] = card.copy;
			});
			console.log(copyCache);
			alert('Save ' + deck.name + '!');
		}
	}
});
