import React from 'react'
import {useStores} from '../stores'
import {observer, useLocalObservable} from 'mobx-react'
import {message, Upload, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const {Dragger} = Upload
const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
  word-break: break-all;

  > h1 {
    margin: 20px 0;
    text-align: center;
  }

  img {max-width: 500px}
`
const Component = observer(() => {
	const {ImageStore, UserStore} = useStores()
	const store = useLocalObservable(() => ({
		width: null,
		setWidth(width) {
			store.width = width
		},
		get withStr() {
			return store.width ? `/w/${store.width}` : ''
		},
		height: null,
		setHeight(height) {
			store.height = height
		},
		get heightStr() {
			return store.height ? `/h/${store.height}` : ''
		},
		get fullStr() {
			return ImageStore.serverFile.attributes.url.attributes.url
				+ '?imageView2/0' + store.withStr + store.heightStr
		}
	}))
	const props = {
		showUploadList: false,
		beforeUpload: file => {
			ImageStore.setFile(file)
			ImageStore.setFilename(file.name)
			window.file = file
			if (!UserStore.currentUser) {
				message.warning('请先登录再上传！')
				return false
			}
			if (!/(svg$)|(jpeg$)|(gif$)|(png$)|(jpg$)/ig.test(file.type)) {
				message.warning('只能上传.svg/.jpeg/.jpg/.png/.gif格式文件')
				return false
			}
			if (file.size > 1024 * 1024) {
				message.warning('文件大小不能超过1M')
				return false
			}
			ImageStore.upload()
				.then((serverFile) => {
					console.log('上传成功')
					console.log(serverFile)
				})
				.catch(() => {console.log('上传失败')})
			return false
		},
	}
	const bindWidth = (e) => {
		store.setWidth(e.target.value)
	}
	const bindHeight = (e) => {
		store.setHeight(e.target.value)
	}
	return (
		<div>
			<Spin tip = '正在上传' spinning = {ImageStore.isUpLoading}>
				<Dragger {...props}>
					<p className = "ant-upload-drag-icon">
						<InboxOutlined/>
					</p>
					<p className = "ant-upload-text">
						点击或者拖拽上传图片
					</p>
					<p className = "ant-upload-hint">
						仅支持.jpg/.jpeg/.png/.svg/.gif格式图片，图片最大1M
					</p>
				</Dragger>
			</Spin>
			<div>
				<div>
					{ImageStore.serverFile
						? <Result>
							<h1>上传结果</h1>
							<dl>
								<dt>URL</dt>
								<dd><a rel = "noreferrer" target = '_blank'
											 href = {ImageStore.serverFile.attributes.url.attributes.url}>
									{ImageStore.serverFile.attributes.url.attributes.url}</a>
								</dd>
								<dt>文件名</dt>
								<dd>{ImageStore.filename}</dd>
								<dt>图片预览</dt>
								<dd><img src = {ImageStore.serverFile.attributes.url.attributes.url} alt = ""/></dd>
								<dt>更多尺寸</dt>
								<dd>
									<input onChange = {bindWidth} type = "text" placeholder = '请输入宽度'/>
									<input onChange = {bindHeight} type = "text" placeholder = '请输入高度'/>
								</dd>
								<dd>
									<a target = '_blank' rel = "noreferrer" href = {store.fullStr}>{store.fullStr}</a></dd>
							</dl>
						</Result>
						: ''}
				
				
				</div>
			
			</div>
		</div>
	)
})
export default Component