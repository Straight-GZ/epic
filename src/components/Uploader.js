import React from 'react'
import {useRef} from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'

const Component = observer(() => {
	const {ImageStore} = useStores()
	const ref = useRef()
	const bindChange = () => {
		if (ref.current.files && ref.current.files.length > 0) {
			ImageStore.setFile(ref.current.files[0])
			ImageStore.setFilename(ref.current.files[0].name)
			ImageStore.upload()
				.then((serverFile) => {
					console.log('上传成功')
					console.log(serverFile)
				})
				.catch(() => {console.log('上传失败')})
		}
		window.file = ref.current
	}
	return (
		<div>
			文件上传
			<input type = "file" ref = {ref} onChange = {bindChange}/>
		</div>
	)
})
export default Component