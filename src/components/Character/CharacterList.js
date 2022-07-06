import CharacterCard from './CharacterCard'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

const StyledCharacterList = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;

  h3 {
    font-size: 24px;
    font-weight: 700;
  }

  &.side-1 article {
    background-color: brown;
    color: white;
    transition: background-color 1s;
  }

  &.side-0 article {
    background-color: skyblue;
    color: black;
    transition: background-color 1s;
  }
`

const CharacterList = ({ id, name, title, characters }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <StyledCharacterList
          className={id}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h3>{title}</h3>
          {characters.map((character, index) => (
            <CharacterCard
              index={index}
              key={character.id}
              title={character.title}
              description={character.description}
              url={character.url}
              force={character.force}
              side={id}
              id={character.id}
            />
          ))}
          <div style={{ visibility: 'hidden' }}>{provided.placeholder}</div>
        </StyledCharacterList>
      )}
    </Droppable>
  )
}

export default CharacterList
