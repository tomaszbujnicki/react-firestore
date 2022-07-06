import { useState, useEffect, useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import DataContext from '../../store/DataContext'
import { AwsomeButton } from '../UI/Button'
import DeleteControl from './DeleteControl'
import ForceControl from './ForceControl'

const StyledCharacterCard = styled.article`
  height: 150px;
  width: 100%;
  color: black;
  outline: 2px solid black;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  position: relative;
  transition: background-color 1s;
  background-color: ${(props) => (props.isDragging ? 'purple !important' : '')};

  &.pending {
    overflow: hidden;
    &::after {
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: pending;
      display: block;
    }
  }

  &.resolve {
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-name: green;
    &::after,
    &::before {
      animation-duration: 2s;
      animation-iteration-count: 1;
      animation-name: opacity;
    }
    .image {
      animation-duration: 2s;
      animation-iteration-count: 1;
      animation-name: flipY;
    }
  }

  &.update {
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-name: yellow;
    &::after,
    &::before {
      animation-duration: 2s;
      animation-iteration-count: 1;
      animation-name: opacity;
    }
  }

  &.reject {
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-name: red;
    &::after,
    &::before {
      animation-duration: 2s;
      animation-iteration-count: 1;
      animation-name: opacity;
    }
  }

  &.delete {
    animation-duration: 4s;
    animation-iteration-count: 1;
    animation-name: delete;
    animation-fill-mode: forwards;
  }

  .body {
    height: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  h4 {
    font-size: 24px;
    line-height: 1.5;
  }

  p {
    font-size: 18px;
  }

  .image {
    transform: perspective(1000px) rotateY(0deg);

    width: 110px;
    height: 110px;
    overflow: hidden;
    border-radius: 50%;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  :hover button {
    opacity: 1;
  }

  button {
    display: ${({ status }) =>
      status === 'ready' || status === 'editing' ? '' : 'none'};
    opacity: 0;
    transition: opacity 1s;
  }

  .remove-icon {
    position: absolute;
    bottom: 5px;
    left: 5px;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .save-icon {
    display: ${({ status }) => (status === 'editing' ? '' : 'none')};
    position: absolute;
    top: 5px;
    left: 5px;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .discard-icon {
    display: ${({ status }) => (status === 'editing' ? '' : 'none')};
    position: absolute;
    top: 30px;
    left: 5px;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 10%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    transform: translateX(-100%);
    display: none;
  }

  &.resolve {
    &::before,
    &::after {
      position: absolute;
      content: '';
      top: -10%;
      left: -5%;
      width: 110%;
      height: 120%;
      background: linear-gradient(135deg, green, greenyellow);
      filter: blur(30px);
      opacity: 0;
      z-index: -1;
    }
    &::after {
      filter: blur(50px);
    }
  }

  &.update {
    &::before,
    &::after {
      position: absolute;
      content: '';
      top: -10%;
      left: -5%;
      width: 110%;
      height: 120%;
      background: linear-gradient(135deg, blue, violet);
      filter: blur(30px);
      opacity: 0;
      z-index: -1;
    }
    &::after {
      filter: blur(50px);
    }
  }

  &.reject {
    &::before,
    &::after {
      position: absolute;
      content: '';
      top: -10%;
      left: -5%;
      width: 110%;
      height: 120%;
      background: linear-gradient(135deg, red, orange);
      filter: blur(30px);
      opacity: 0;
      z-index: -1;
    }
    &::after {
      filter: blur(50px);
    }
  }

   {
    outline-style: ${({ status }) => (status === 'ready' ? '' : 'dashed')};
  }

  @keyframes pending {
    100% {
      transform: translateX(1010%);
    }
  }
  @keyframes opacity {
    50% {
      opacity: 1;
    }
  }
  @keyframes green {
    50% {
      background-color: green;
    }
  }
  @keyframes yellow {
    50% {
      background-color: violet;
    }
  }
  @keyframes red {
    50% {
      background-color: red;
    }
  }
  @keyframes flipY {
    0% {
    }
    50% {
      transform: perspective(1000px) rotateY(180deg);
    }
    100% {
      transform: perspective(1000px) rotateY(360deg);
    }
  }

  @keyframes delete {
    0% {
      opacity: 1;
      transform: rotateZ(0);
      transform-origin: 0% 100%;
    }

    100% {
      display: none;
      opacity: 0;
      transform: translateY(600px) rotateZ(90deg);
      transform-origin: 0% 100%;
    }
  }
`
/* 
  STATUS TYPE 
  ready
  editing
  updating
  pending
  resolved
  rejected
*/
const CharacterCard = ({ id, title, description, url, force, side, index }) => {
  const [localForce, setLocalForce] = useState(force)
  const [animation, setAnimation] = useState('')
  const [status, setStatus] = useState('ready')
  const dataCtx = useContext(DataContext)

  useEffect(() => {
    switch (status) {
      case 'ready':
        if (localForce !== force) {
          setLocalForce(force)
          setStatus('updating')
          setAnimation('update')
        }
        break

      default:
        break
    }
  }, [status, force, localForce])

  const savechanges = () => {
    setAnimation('pending')
    setStatus('pending')
    const resolve = () => {
      console.log('resolve')
      setStatus('resolved')
    }
    const reject = () => {
      console.log('reject')
      setStatus('rejected')
    }
    dataCtx.updateOneCharacter(id, { force: localForce }, resolve, reject)
  }

  const discardChanges = () => {
    setStatus('ready')
    setLocalForce(force)
  }

  const deleteCharacter = () => {
    setStatus('deleting')
    setAnimation('delete')
  }

  const increaseForce = () => {
    if (localForce < 100) {
      setStatus('editing')
      setLocalForce((prev) => prev + 1)
    }
  }

  const decreaseForce = () => {
    if (localForce > 0) {
      setStatus('editing')
      setLocalForce((prev) => prev - 1)
    }
  }

  const handleAnimationIteration = ({ animationName }) => {
    // "pending"
    if (status === 'resolved') {
      setAnimation('resolve')
    }
    if (status === 'rejected') {
      setAnimation('reject')
    }
  }

  const handleAnimationEnd = ({ animationName }) => {
    switch (animationName) {
      case 'green':
        setAnimation('')
        setStatus('ready')
        break
      case 'red':
        setAnimation('')
        setStatus('editing')
        break
      case 'yellow':
        setAnimation('')
        setStatus('ready')
        break
      case 'delete':
        setStatus('deleted')
        dataCtx.removeCharacterFromList(side, id)
        //dataCtx.deleteOneCharacter(id);
        break
      default:
        break
    }
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <StyledCharacterCard
          className={animation}
          status={status}
          onAnimationIteration={handleAnimationIteration}
          onAnimationEnd={handleAnimationEnd}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="image">
            <img
              src={url}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src =
                  'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png'
              }}
            />
          </div>
          <div className="body">
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <ForceControl
            force={localForce}
            increase={increaseForce}
            decrease={decreaseForce}
          />
          <DeleteControl deleteCharacter={deleteCharacter} />

          <AwsomeButton
            onClick={savechanges}
            icon="fa-solid fa-floppy-disk"
            className="icon save-icon small"
          />
          <AwsomeButton
            onClick={discardChanges}
            icon="fa-solid fa-xmark"
            className="icon discard-icon small"
          />
        </StyledCharacterCard>
      )}
    </Draggable>
  )
}

export default CharacterCard
