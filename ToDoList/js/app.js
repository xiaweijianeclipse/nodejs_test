(function (window) {
	'use strict';
	//测试数据
	const list_data = [{
			id: 1,
			title: '吃饭',
			stat: true
		},
		{
			id: 2,
			title: '约会',
			stat: true
		},
		{
			id: 3,
			title: '看电影',
			stat: true
		}, {
			id: 8,
			title: '看电影',
			stat: true
		}

	]
	const app = new Vue({
		el: '#app',
		data: {
			title: 'MyToDoList',
			list_data
		},
		methods: {
			//添加新的事项
			addToDo(event) {
				var data = {};
				data.id = this.list_data.length + 1;
				data.title = event.target.value;
				data.stat = false;
				list_data.push(data);
				event.target.value = "";
			},
			//事项状态的切换
			toggleAll(e) {
				this.list_data.forEach(element => {
					element.stat = e.target.checked
				});
			},
			//删除事项
			removeToDo(id) {
				this.list_data.splice(id, 1);
			},
			//删除已完成的任务
			removeAllDone() {
				var newArr = this.list_data.filter(function (v) {
					if (!v.stat) {
						return v;
					}
				});
				this.list_data = newArr;
			}
		}
	})
})(window);
