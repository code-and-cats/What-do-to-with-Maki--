import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import activities from './activities.json'

const Header = styled.h1`
  font-family: 'Leckerli One', cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 52px;
  color: #8f1fab;
`

// Makis Fejs
const FaceImg = styled.img`
  width: 100px;
`

// keyframes for wheel spin
const spinWheel = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(1080deg); }
`

const WheelImg = styled.img`
  width: 340px;
  height: 340px;

  &.spinning {
    animation: ${spinWheel} 3s ease-out forwards;
  }
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
  pointer-events: none;
`

const Result = styled.div`
  font-family: 'Lato', sans-serif;
  margin-top: 24px;
  font-size: 24px;
  font-weight: 600;
`

function App() {
  const [selected, setSelected] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const SPIN_MS = 3000

  const handleSpin = () => {
    if (isSpinning) return
    setSelected(null)
    setIsSpinning(true)

    const choice = activities[Math.floor(Math.random() * activities.length)]

    setTimeout(() => {
      setIsSpinning(false)
      setSelected(choice)
    }, SPIN_MS)
  }

  return (
    <div className="App">
      <Header>Vad ska Maki göra?</Header>

      <WheelWrap>
        <WheelImg
          src="wheel.png"
          alt="wheel"
          className={isSpinning ? 'spinning' : ''}
          onClick={handleSpin}
        />

        <CenterFace>
          <FaceImg src="MakiSmile.png" alt="smiling dog face" />
        </CenterFace>
      </WheelWrap>

      <Result>
        {selected ? (
          <>
            <div>{selected.name}</div>
            {selected.status && (
              <div
                style={{ fontSize: '18px', color: '#666', marginTop: '8px' }}>
                Status: {selected.status}
              </div>
            )}
          </>
        ) : (
          ''
        )}
      </Result>
    </div>
  )
}

export default App
