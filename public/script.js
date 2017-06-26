new Vue({
	el: '#app',
	data: {
		total: 1,
		items : [
			{ title : 'Item 1' },
			{ title : 'Item 2' },
			{ title : 'Item 3' }
		],
		cart: []
	},
	methods : {
		addItem: function(index){
			console.log(this.items[index]);
			this.total += 9.99;
			this.cart.push(this.items[index]);
		}
	}
});