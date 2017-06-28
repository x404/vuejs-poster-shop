var PRICE = 9.99;

new Vue({
	el: '#app',
	data: {
		total: 1,
		items : [],
		cart: [],
		newSearch: '',
		lastSearch: ''
	},
	methods : { 
		onSubmit: function(){
			// console.log(this.$http);
			this.$http.get('/search/'.concat(this.newSearch))
			.then(function(res){
				this.lastSearch = this.newSearch;
				this.items = res.data;
			});
		},
		addItem: function(index){
			// console.log(this);
			this.total += PRICE;


			var item = this.items[index];
			var found = false;


			for (var i = 0; i < this.cart.length; i++){ // перебираем всю! корзину
				if (this.cart[i].id === item.id){ // если нашли товар, на который кликнули то плюсуем 1 в этой ячейчке
					found = true;
					this.cart[i].qty++;
					break;
				}
			// console.log(this.cart[i].qty);
			}

			if (!found){ // если нажатого товара в корзине нет , то добавляем в корзину 1 товар
				this.cart.push({
					id : item.id, 
					title: item.title,
					qty: 1,
					price: PRICE
				});				
			}
		},
		inc : function(item){
			console.log(item);
			item.qty++;
			this.total += PRICE;
		},
		dec : function(item){
			// console.log('dec')
			item.qty--;
			this.total -= PRICE;

			if (item.qty <= 0){ // если количество станет = 0
				for (var i = 0; i < this.cart.length; i++){ // перебираем корзину
					if (this.cart[i].id === item.id){ // если элемент в корзине совпал с элементом на который нажали 
						this.cart.splice(i, 1); // удаляем этот элемент
						break;
					}
				}
			}
		}

	},
	filters : {
		currency: function(price){
			return '$'.concat(price.toFixed(2))
		}
	}
});