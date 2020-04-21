import React, { useState } from 'react';
import UploadVideo from '../components/UploadVideo';

const Index = () => {
    const [isVisibleUpload, setIsVisibleUpload] = useState(false)

    function handleClick() {
        setIsVisibleUpload(true)
    }

    function handleClose() {
        setIsVisibleUpload(false)
    }

    return (
        <div>
            <p>请上传视频文件(仅支持mp4格式, 文件大小在50Mb以下)</p>
            <button onClick={handleClick}>上传视频</button>
            {isVisibleUpload ? <UploadVideo handleClose={handleClose} /> : null}
        </div>
    )
}

export default Index