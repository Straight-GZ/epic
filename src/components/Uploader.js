import React from 'react'
import {useStores} from '../stores'
import {observer, useLocalObservable} from 'mobx-react'
import {message, Upload} from 'antd'
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
	// const ref1 = useRef()
	// const ref2 = useRef()
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
			if (!UserStore.currentUser) {
				message.warning('请先登录再上传！')
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
			<Dragger {...props}>
				<p className = "ant-upload-drag-icon">
					<InboxOutlined/>
				</p>
				<p className = "ant-upload-text">Click or drag file to this area to upload</p>
				<p className = "ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibit from uploading company data or other
					band files
				</p>
			</Dragger>
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