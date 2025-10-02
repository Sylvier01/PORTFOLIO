import React, { useRef, useState } from 'react'

import styled, { keyframes } from 'styled-components'

import music from '../../assets/sounds/fake_verthandi.mp3'

const Box = styled.div`
  display: flex;
  cursor: pointer;
  position: fixed;
  right: clamp(1rem, 8vw, 8rem);
  top: clamp(1.5rem, 5vh, 3rem);
  z-index: 3;

  & > *:nth-child(1) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.5s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.8s;
  }



  @media (max-width: 768px) {
    right: 1rem;
    top: 1rem;
    transform: scale(0.8);
    
    &:before {

  }


  }
`

const play = keyframes`
0%{
    transform:scaleY(1);
}
50%{
    transform:scaleY(2);
}
100%{
    transform:scaleY(1);
}
`
const Line = styled.span`
  background: #ff4500;
  border: 1px solid;

  animation: ${play} 1s ease infinite;
  animation-play-state: ${(props) => (props.itemScope ? 'running' : 'paused')};
  height: clamp(0.75rem, 2vh, 1rem);
  width: clamp(3px, 1vw, 5px);
  margin: 0 clamp(0.05rem, 0.5vw, 0.1rem);

  @media (max-width: 768px) {
    height: 0.875rem;
    width: 4px;
    margin: 0 0.075rem;
  }

  @media (max-width: 480px) {
    height: 0.75rem;
    width: 3px;
    margin: 0 0.05rem;
  }
`
const SoundBar = () => {
  const ref = useRef(null)
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)

    if (!click) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }
  return (
    <Box onClick={() => handleClick()}>
      <Line itemScope={click} />
      <Line itemScope={click} />
      <Line itemScope={click} />
      <Line itemScope={click} />
      <Line itemScope={click} />
      <audio src={music} ref={ref} loop /> &nbsp;
    </Box>
  )
}

export default SoundBar
