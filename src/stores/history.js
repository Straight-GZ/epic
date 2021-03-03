import {observable, action, makeObservable} from 'mobx'
import {message} from 'antd'
import {Uploader} from '../models'

class HistoryStore {
	@observable list = []
	@observable isLoading = false
	@observable hasMore = true
	@observable page = 0
	limit = 10
	
	constructor() {
		makeObservable(this)
	}
	
	@action append(newList) {
		this.list = this.list.concat(newList)
	}
	
	@action find() {
		this.isLoading = true
		Uploader.find({page: this.page, limit: this.limit})
			.then(newList => {
				this.append(newList)
				this.page++
				if (newList.length < this.limit) {
					this.hasMore = false
				}
			})
			.catch(error => message.error('数据加载失败'))
			.finally(() => this.hasMore = false)
	}
	
	@action reset() {
		this.list = []
		this.isLoading = false
		this.hasMore = true
		this.page = 0
	}
}


export default new HistoryStore()