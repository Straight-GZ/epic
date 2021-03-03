import React, {useEffect} from 'react'
import {List, message, Avatar, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'

const Img = styled.img`
  max-width: 100px;
  max-height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`
const Component = observer(() => {
	const {HistoryStore} = useStores()
	const LoadMore = () => {
		HistoryStore.find()
	}
	useEffect(() => {
		console.log('进入组件')
		return () => {
			console.log('卸载 ')
			HistoryStore.reset()
		}
	}, [])
	return (
		<InfiniteScroll initialLoad = {true}
										pageStart = {0}
										loadMore = {LoadMore}
										hasMore = {!HistoryStore.isLoading && HistoryStore.hasMore}
										useWindow = {true}>
			<List dataSource = {HistoryStore.list}
						renderItem = {item => (<List.Item key = {item.id}>
							<div>
								<Img src = {item.attributes.url.attributes.url} alt = ""
										 style = {{height: '100px'}}/>
							</div>
							<div><h5>{item.attributes.filename}</h5></div>
							<div>
								<a target = '_blank' href = {item.attributes.url.attributes.url}>
									{item.attributes.url.attributes.url}
								</a>
							</div>
						</List.Item>)}
			>
			</List>
		</InfiniteScroll>
	)
})
export default Component