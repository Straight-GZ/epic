import {observable, action, makeObservable} from 'mobx'
import {Auth} from '../models'

class UserStore {
	@observable currentUser = null
	
	constructor() {
		makeObservable(this)
	}
	
	@action pullUser() {
		this.currentUser = Auth.getCurrentUser()
	}
	
	@action resetUser() {
		this.currentUser = null
	}
}

export default new UserStore()