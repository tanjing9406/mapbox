import React, { useRef, useEffect } from "react"
import * as tf from "@tensorflow/tfjs"
import * as handpose from "@tensorflow-models/handpose"
import * as fp from "fingerpose"
import Webcam from "react-webcam"

const webcamstyle = {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    zindex: 9,
    width: 700,
    height: 700
}

function HandPose(props) {
    let timer
    const webcamRef = useRef(null)

    useEffect(() => {
        runHandpose()
        return () => clearInterval(timer)
    }, [])

    const detect = async (hand) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth
            const videoHeight = webcamRef.current.video.videoHeight
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight
            const result = await hand.estimateHands(video)
            if (result.length > 0) {
                // console.log(result)
                const GE = new fp.GestureEstimator([
                    fp.Gestures.ThumbsUpGesture,
                    fp.Gestures.VictoryGesture,
                ])
                const gesture = await GE.estimate(result[0].landmarks, 8.5)
                if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                    const confidence = gesture.gestures.map(
                        (prediction) => prediction.confidence
                    )
                    const mxConfidence = confidence.indexOf(
                        Math.max.apply(null, confidence)
                    )
                    // console.log(gesture, confidence)
                    console.log(gesture.gestures[mxConfidence].name)
                    switch (gesture.gestures[mxConfidence].name) {
                        case 'thumbs_up':
                            props.onDetectedThumbsUp && props.onDetectedThumbsUp()
                            break;
                        case 'victory':
                            props.onDetectedVictory && props.onDetectedVictory()
                            break;
                        default:
                            break
                    }
                }
            }
        }
    }

    const runHandpose = async () => {
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        timer = setInterval(() => {
            detect(net);
        }, 16.7)
    }
    return (
        <div className="fixed w-full h-full opacity0 z-neg1">
            <Webcam
                ref={webcamRef}
                style={webcamstyle}
            />
        </div>
    )
}

export default HandPose