import React, {useState, useRef} from 'react'
import  styles from  './upload.module.css';
import hostname from '../utils/hostname';
import axios from 'axios';

const UploadVideo = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [warn, setWarn] = useState('')
    const upload = useRef()
    const prograss = useRef()

    function handleChangeTitle(e) {
        setTitle(e.target.value)
    }

    function handleChangeContent(e) {
        setContent(e.target.value)
    }

    function handleClose() {
        props.handleClose()
    }

    function handleStopPropagation(e) {
        e.stopPropagation()
    }

    function handleUploadFile(e) {
        console.log(e.target.files)
    }

    // 提交
    function handleSubmit() {
        if(!title) {
            setWarn('标题未输入')
            return
        }
        if(!content) {
            setWarn('内容未输入')
            return
        }
        if(!upload.current.files[0]) {
            setWarn('未检测到上传文件')
            return
        }else {
            let file = upload.current.files[0]
            if(file.type !== 'video/mp4') {
                setWarn('请上传mp4格式的视频')
                return
            }
            if((file.size/1024/1024) > 50) {
                setWarn('请上传小于50Mb的文件')
                return
            }

            // 上传视频文件
            let url = `${hostname}/upload/video`
            let param = new FormData()
            param.append('file', file)
            param.append('title', title)
            param.append('content', content)
            // 进度条
            console.log(prograss.current)
            let progressEl = prograss.current
            progressEl.style.width = '0'
            axios.post(url, param, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    window.requestAnimationFrame(progressFn)
                    function progressFn() {
                        if(parseInt(progressEl.style.width) < 200) {
                            progressEl.style.width = complete * 200 + 'px';
                            progressEl.innerHTML =  complete
                            window.requestAnimationFrame(progressFn)
                        }
                    }
                }
            }).then((response) => {
                if(response.data.code === 0) {
                    console.log(response.data.message)
                    handleImgUrl(response.data.img_url)
                }
            })
        }
    }

    // 值传递给父组件
    function handleImgUrl(img) {
        handleClose()
        props.handleImgUrl(img)
    }

    return (
        <div className={styles.dialog_wrapper} onClick={handleClose}>
            <div className={styles.dialog} onClick={handleStopPropagation}>
                <label htmlFor="标题">
                    <span>标题</span>
                    <input type="text" value={title} onChange={handleChangeTitle} />
                </label>
                <label htmlFor="描述">
                    <span>描述</span>
                    <textarea name="" id="" cols="30" rows="10" value={content} onChange={handleChangeContent}></textarea>
                </label>
                <label htmlFor="上传视频">
                    <span>上传视频</span>
                    <input type="file" onChange={handleUploadFile} ref={upload} name="file" accept="video/mp4"/>
                </label>
                <div className={styles.progress} ref={prograss}></div>
                {warn ? <p className={styles.warn}>{warn}</p> : null}
                <button className={styles.submit} onClick={handleSubmit}>提交</button>
            </div>
        </div>
    )
}

export default UploadVideo