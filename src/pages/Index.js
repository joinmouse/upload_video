import React, { useState } from 'react';
import UploadVideo from '../components/UploadVideo';

const Index = () => {
    const [isVisibleUpload, setIsVisibleUpload] = useState(false)
    const [imgList, setImgList] = useState([])

    function handleClick() {
        setIsVisibleUpload(true)
    }

    function handleClose() {
        setIsVisibleUpload(false)
    }

    function handleImgUrl(url) {
        console.log(`fu ${url}`)
        setImgList(imgList => [...imgList, url])
        console.log(imgList)
    }

    const stylesLi = {
        listStyle: 'none',
        marginTop: 10 + 'px',
        borderBottom: 1 + 'px',
    }
    return (
        <div>
            <p>请上传视频文件(仅支持mp4格式, 文件大小在50Mb以下)</p>
            <button onClick={handleClick}>上传视频</button>
            {isVisibleUpload ? <UploadVideo handleClose={handleClose} handleImgUrl={handleImgUrl}/> : null}
            {imgList.length > 0 ? 
                <div>
                    {imgList.map((item, index) => 
                        <li style={stylesLi} key={index}>{index+1}、 {item}</li>
                    )}
                </div>
            : null}
        </div>
    )
}

export default Index