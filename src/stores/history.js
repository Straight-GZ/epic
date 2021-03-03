import {observable, action} from 'mobx'
import {message} from 'antd'
import Uploader from '../components/Uploader'

class HistoryStore {
	@observable list = []
	@observable isLoading = false
	@observable hasMore = true
	@observable page = 0
	limit = 10
	export
	default
	new
	
	@action append(newList) {
		this.list.concat(newList)
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
}

export default new HistoryStore()