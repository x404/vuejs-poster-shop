var PRICE = 9.99;

new Vue({
	el: '#app',
	data: {
		total: 1,
		items : [
			{ id: 1, title : 'Item 1' },
			{ id: 2, title : 'Item 2' },
			{ id: 3, title : 'Item 3' }
		],
		cart: []
	},
	methods : {
		addItem: function(index){
			// console.log(this);
			this.total += PRICE;


			var item = this.items[index];
			var found = false;


			for (var i = 0; i < this.cart.length; i++){ // перебираем всю! корзину
				if (this.cart[i].id === item.id){ // если нашли товар, на который кликнули то плюсуем 1 в этой ячейчке
					found = true;
					this.cart[i].qty++;
				}
			console.log(this.cart[i].qty);
			}

			if (!found){ // если нажатого товара в корзине нет , то добавляем в корзину 1 товар
				this.cart.push({
					id : item.id, 
					title: item.title,
					qty: 1,
					price: PRICE
				});				
			}
		}
	}
});