import styled, { css } from 'styled-components'

const Column = ({ height, color, label, rotate }) => {
  return (
    <StyledColumn height={height} color={color} $rotate={rotate}>
      <div className="column">
        <div className="columnInner"></div>
      </div>
      <div className="label">{label}</div>
    </StyledColumn>
  )
}

export default Column

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  overflow: hidden;
  flex: 1;

  .column {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .columnInner {
    height: ${(props) => props.height}%;
    background-color: ${(props) => props.color};
    transition: height 1s;
  }

  .label {
    display: flex;
    height: 40px;
    text-align: "center";

    ${({ $rotate }) =>
      $rotate &&
      css`
        width: 320px;
        align-items: center;
        transform: rotate(-90deg) translate(185px);
        text-align: 'left';
      `}
`
