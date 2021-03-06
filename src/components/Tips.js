import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'

const Tips = styled.div`
  background: orange;
  color: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 30px 0;
`
const Component = observer(({children}) => {
	const {UserStore} = useStores()
	return (
		<>
			{UserStore.currentUser ? null : <Tips>{children}</Tips>}
		</>
	)
})
export default Component