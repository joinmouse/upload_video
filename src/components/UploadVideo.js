import React, {useState, useRef} from 'react'
import  styles from  './upload.module.css';

const UploadVideo = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [warn, setWarn] = useState('')
    const upload = useRef()

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
        console.log(title)
        console.log(content)
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
            if((file.size/1024/1024).toFixed(2) > 50) {
                setWarn('请上传小于50Mb的文件')
                return
            }
            /* 可以开始上传了
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            xhr.send()
            xhr.upload.onprogress = function(event) {
                console.log(event.loaded)
                console.log(event.total)
            }
            */
        }
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
                {warn ? <p className={styles.warn}>{warn}</p> : null}
                <button className={styles.submit} onClick={handleSubmit}>提交</button>
            </div>
        </div>
    )
}

export default UploadVideo