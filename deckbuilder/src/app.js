import Vue from 'vue';
import Humans from '../../cards/monsters/human';

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

let humans = Humans.map(h => {
	h.copy = 2;
	if (h.limited) h.copy = 1;
	return h;
});

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
		cards: humans,
		deck: []
	},
	methods: {
		addToDeck(card) {
			if (this.deck.length >= 30) return;
			add(this.cards, this.deck, card);
		},

		addToCollection(card) {
			add(this.deck, this.cards, card);
		},

		deckTotal() {
			return this.deck.reduce((acc, cur) => acc + cur.copy, 0);
		}
	}
});