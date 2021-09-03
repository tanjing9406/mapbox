import React, { useContext, useState } from "react"
import { Button, Tooltip } from "antd"
import { VideoCameraOutlined, VideoCameraAddOutlined } from '@ant-design/icons'
import HNHYMapContext from "@/views/map/hnhymapcontext"

function ShooterButton(props) {
    const { mapContainer } = useContext(HNHYMapContext)
    const [isShooting, setIsShooting] = useState(false)
    const [recorder, setRecorder] = useState(null)
    let [captureStream, setCaptureStream] = useState(null)
    let downloadLink
    const clearState = () => {
        setIsShooting(false)
        setRecorder(null)
        setCaptureStream(null)
        downloadLink = null
    }
    const shootVideo = () => {
        setIsShooting(!isShooting)
        if (isShooting) {
            stopCapture()
        } else {
            startCapture()
        }
    }
    const startCapture = async () => {
        const displayMediaOptions = {
            video: {
                cursor: "never"
            },
            audio: true
        }
        try {
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        } catch (err) {
            clearState()
            console.log('Error: ' + err);
            return alert('录屏出现错误或者被取消');
        }
        const record = new MediaRecorder(captureStream)
        record.start()
        setRecorder(record)
        setCaptureStream(captureStream)
    }
    const stopCapture = () => {
        let tracks = captureStream.getTracks();
        tracks.forEach(track => {
            track.stop();
        });
        recorder.stop();
        recorder.addEventListener('dataavailable', (event) => {
            downloadLink = URL.createObjectURL(event.data, { type: 'video/mp4' })
            mydownload()
            clearState()
        })

    }
    const mydownload = () => {
        const name = new Date().toISOString().slice(0, 19).replace('T', ' ').replace(' ', '_').replace(/:/g, '-');
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = `海南寰宇${name}.mp4`;
        document.body.appendChild(a);
        a.click();
    }
    return (
        <Tooltip placement="left" title={isShooting ? '结束录屏' : '开始录屏'} getPopupContainer={() => mapContainer.current}>
            <Button
                size="large"
                className="btn"
                onClick={shootVideo}
                icon={isShooting ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
            />
        </Tooltip>
    )
}

export default ShooterButton