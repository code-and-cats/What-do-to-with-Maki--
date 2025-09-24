import './App.css'
import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

const Header = styled.h1`
  font-family: 'Leckerli One', cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 52px;
  color: #8f1fab;
`

// face image — no spin
const FaceImg = styled.img`
  width: 100px;
`

// keyframes for wheel spin
const spinOnce = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(1080deg); } /* 3 full turns */
`

const WheelImg = styled.img`
  width: 340px;
  height: 340px;
  ${(props) =>
    props.spinning &&
    css`
      animation: ${spinOnce} 3s ease-out forwards;
    `}
`

const WheelWrap = styled.div`
  position: relative;
  width: 340px;
  height: 340px;
  display: inline-block;
`

const CenterFace = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none; /* clicks pass through */
`

const Controls = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`

function App() {
  const [selected, setSelected] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const activities = [
    { name: 'Activity1', number: 1 },
    { name: 'Activity2', number: 2 },
    { name: 'Activity3', number: 3 },
    { name: 'Activity4', number: 4 },
    { name: 'Activity5', number: 5 },
    { name: 'Activity6', number: 6 }
  ]

  const SPIN_MS = 3000 // spin duration

  const handleSpin = () => {
    if (isSpinning) return // ignore clicks while spinning
    setSelected(null)
    setIsSpinning(true)

    const choice = activities[Math.floor(Math.random() * activities.length)]

    setTimeout(() => {
      setIsSpinning(false)
      setSelected(choice)
      console.log('Chosen:', choice)
    }, SPIN_MS)
  }

  return (
    <div className="App">
      <Header>Vad ska Maki göra?</Header>

      <WheelWrap>
        <WheelImg
          src="depositphotos_103734284-stock-photo-wheel-fortune-5-area.png"
          alt="wheel"
          spinning={isSpinning}
          onClick={handleSpin}
        />

        <CenterFace>
          <FaceImg src="MakiSmile.png" alt="smiling pup face" />
        </CenterFace>
      </WheelWrap>

      <Controls>
        <button onClick={handleSpin} disabled={isSpinning}>
          {isSpinning ? 'Spinning...' : 'Spin'}
        </button>
        <div style={{ minWidth: 160, textAlign: 'center' }}>
          {selected ? `Next: ${selected.name}` : '—'}
        </div>
      </Controls>
    </div>
  )
}

export default App
