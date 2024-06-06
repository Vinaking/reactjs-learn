import {useState, useRef} from 'react';

export const VideoPlayer = () => {
    const [isPlay, setIsPlay] = useState(false);
    const videoRef = useRef(null);

    function handleClick() {
        setIsPlay(!isPlay)
        !isPlay ? videoRef.current.play() : videoRef.current.pause()
    }

    return(
        <div style={{display: 'block'}}>
            <button onClick={handleClick}>{!isPlay ? 'Play' : 'Pause'}</button>
            <video ref={videoRef} width="250">
                <source
                    src='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
                    type='video/mp4'
                />
            </video>
        </div>
    );
}