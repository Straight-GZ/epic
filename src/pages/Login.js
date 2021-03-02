import React from 'react'
import {observable} from 'mobx'
import {useStores} from '../stores'

const Component = observable(() => {
	const {AuthStore} = useStores()
	return (
		<>
			<h1>Login{AuthStore.values.username}</h1>
		</>
	)
})

export default Component
