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
			Cost: {{card.cost}} Life: {{card.life}} Attack: {{card.attack}} 
			Effect: {{card.effect}} 
		</div> 
	` 
});

Vue.component('card', Card);

let aliens = createCards(Aliens, 'alien');
let angels = createCards(Angels, 'angel');
let beasts = createCards(Beasts, 'beast');
let demons = createCards(Demons, 'demon');
let dragons = createCards(Dragons, 'dragon');
let mechs = createCards(Mechs, 'mech');
let humans = createCards(Humans, 'human');
let spells = createCards(Spells, 'spell');
let traps = createCards(Traps, 'trap');

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
		collections: {
			alien: aliens,
			angel: angels,
			beast: beasts,
			demon: demons,
			dragon: dragons,
			human: humans,
			mech: mechs,
			spell: spells,
			trap: traps
		},
		deck: [],
		currentCollection: aliens,
	},
	methods: {
		addToDeck(card) {
			if (this.deckTotal() >= 30) return;
			add(this.currentCollection, this.deck, card);
		},

		addToCollection(card) {
			add(this.deck, this.collections[card.collection], card);
		},

		changeCollection(collection) {
			this.currentCollection = this.collections[collection];
		},

		deckTotal() {
			return this.deck.reduce((acc, cur) => acc + cur.copy, 0);
		}
	}
});
