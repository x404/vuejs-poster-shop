var PRICE = 9.99;
var LOAD_NUM = 3;


new Vue({
	el: '#app',
	data: {
		total: 1,
		items : [],
		cart: [],
		results: [],
		newSearch: '90s',
		lastSearch: '',
		loading : false,
		price: PRICE
	},
	methods : { 
		appendItems: function(){ // добавление продуктов при прокрутке
			if (this.items.length < this.results.length){
				var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}
		},
		onSubmit: function(){
			this.items = [];
			this.loading = true;
			this.$http.get('/search/'.concat(this.newSearch))
			.then(function(res){
				this.lastSearch = this.newSearch;
				this.results = res.data;
				this.appendItems();
				this.items = res.data.slice(0, LOAD_NUM);
				this.loading = false;
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
	},
	mounted: function(){ // нажатие на кнопку Поиск  перед выводом страницы 
		this.onSubmit();

		var vueInstance = this;
		var elem = document.getElementById('product-list-bottom');
		var watcher = scrollMonitor.create(elem);
		watcher.enterViewport(function(){ // при достижении нижнего элемента вызываем метод appendItems
			vueInstance.appendItems();
	});

	}
});

// console.log(scrollMonitor);

