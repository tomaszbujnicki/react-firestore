import { useContext } from 'react'
import DataContext from '../../store/DataContext'
import ThemeContext from '../../store/ThemeContext'
import { Chart, Column } from '../Chart'

const colors = {
  'side-0': 'skyblue',
  'side-1': 'brown',
}

const CharacterChart = () => {
  const themeCtx = useContext(ThemeContext)
  const dataCtx = useContext(DataContext)
  return (
    <Chart background={themeCtx.chart.background}>
      {dataCtx.characters.map((character) => {
        if (!character.isShown) return null
        return (
          <Column
            key={character.id}
            height={character.force}
            color={colors[character.sideId]}
            label={character.title}
            rotate={dataCtx.characters.length > 10}
          />
        )
      })}
    </Chart>
  )
}

export default CharacterChart
