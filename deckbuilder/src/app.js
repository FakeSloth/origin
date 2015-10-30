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

let Collections = {
	alien: createCards(Aliens, 'alien'),
	angel: createCards(Angels, 'angel'),
	beast: createCards(Beasts, 'beast'),
	demon: createCards(Demons, 'demon'),
	dragon: createCards(Dragons, 'dragon'),
	mech: createCards(Mechs, 'mech'),
	human: createCards(Humans, 'human'),
	spell: createCards(Spells, 'spell'),
	trap: createCards(Traps, 'trap')
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
			let collections = Object.create(Collections);
			this.collections = collections;
			this.currentCollection = this.collections.alien;
			this.currentDeck = [];
			this.deckName = '';
			this.loaded = false;
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
		},

		saveDeck() {
			if (this.deckTotal() < 30) {
				return alert('Deck is not full!');
			}
			let collections = this.collections;
			let deck = {
				name: this.deckName || 'Untitled Deck',
				cards: this.currentDeck,
				collections: collections
			};
			if (this.loaded) {
				this.decks.$set(this.index, deck);
			} else {
				this.decks.push(deck);
			}
			alert('Save ' + deck.name + '!');
		}
	}
});
