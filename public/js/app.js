import Vue from 'vue';

const socket = io.connect('http://localhost:3000');

new Vue({
	el: '#app',
	data: {
		messages: [],
		message: '',
		name: 'Guest'
	},
	ready() {
		socket.on('chat:message', (message) => {
			this.messages.push(message);	
		});
	},
	methods: {
		sendMessage() {
			console.log('hi')
			socket.emit('chat:message', this.name + ': ' + this.message);
			this.message = '';
		}
	}	
});
