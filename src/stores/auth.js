import {observable, action, makeObservable} from 'mobx'
import {Auth} from '../models'
import UserStore from './user'
import HistoryStore from './history'
import ImageStore from './image'
import {message} from 'antd'

class AuthStore {
	@observable values = {
		username: '',
		password: ''
	}
	
	constructor() {
		makeObservable(this)
	}
	
	
	@action setUsername(username) {
		this.values.username = username
	}
	
	@action setPassword(password) {
		this.values.password = password
	}
	
	@action login() {
		return new Promise((resolve, reject) => {
			Auth.login(this.values.username, this.values.password)
				.then(user => {
					UserStore.pullUser()
					resolve(user)
				}).catch(err => {
				message.error('登录失败')
				UserStore.resetUser()
				reject(err)
			})
		})
	}
	
	@action register() {
		return new Promise((resolve, reject) => {
			Auth.register(this.values.username, this.values.password)
				.then(user => {
					console.log('注册成功')
					UserStore.pullUser()
					resolve(user)
				}).catch(err => {
				message.error('注册失败')
				UserStore.resetUser()
				reject(err)
			})
		})
	}
	
	@action logout() {
		Auth.logout()
		UserStore.resetUser()
		HistoryStore.reset()
		ImageStore.reset()
	}
}

export default new AuthStore()