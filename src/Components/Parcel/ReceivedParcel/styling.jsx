import styled from "styled-components";

export const ObjectDetectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetectorContainer = styled.div`
  height: 700px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const TargetImg = styled.img`
  height: 100%;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const SelectButton = styled.button`
  padding: 7px 10px;
  border: 2px solid transparent;
  background-color: #fff;
  color: #0a0f22;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }
`;

// export const TargetBox = styled.div`
//   position: absolute;

//   left: ${({ x }) => x + "px"};
//   top: ${({ y }) => y + "px"};
//   width: ${({ width }) => width + "px"};
//   height: ${({ height }) => height + "px"};

//   border: 4px solid #1ac71a;
//   background-color: transparent;
//   z-index: 20;

//   &::before {
//     content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
//     color: #1ac71a;
//     font-weight: 500;
//     font-size: 17px;
//     position: absolute;
//     top: -1.5em;
//     left: -5px;
//   }
// `;