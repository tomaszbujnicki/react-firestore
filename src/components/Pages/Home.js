import { useState } from 'react'
import styled from 'styled-components'
import CharacterChart from '../Character/CharacterChart'
import CharacterForm from '../Character/CharacterForm'
import { Button } from '../UI/Button'
import CharacterBoard from '../Character/CharacterBoard'

const StyledHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  .chart {
    width: 100%;
    padding: 20px;
    border: 1px solid black;
  }
`

const Home = () => {
  const [isChartOpen, setIsChartOpen] = useState(true)

  const toggleChartDisplay = () => {
    setIsChartOpen((prev) => !prev)
  }

  return (
    <StyledHome>
      <CharacterForm />
      <CharacterBoard />
      <Button onClick={toggleChartDisplay} className="secondary">
        {isChartOpen ? 'Hide chart' : 'Show chart'}
      </Button>
      {isChartOpen && <CharacterChart />}
    </StyledHome>
  )
}

export default Home
