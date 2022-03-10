import styled from "styled-components";

export const MapWrapper = styled.div`
  width: 300px;
  height: 300px;
`;

export const LocationLatLongDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2px;
  margin: 5px;
  color: black;
  position: absolute;
  top: 0;
  z-index: 1;
  margin: 5px 0px 0px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
    top: auto;
    bottom: 0;
  }
  @media (max-width: 480px) {
    font-size: 8px;
    top: auto;
    bottom: 0;
  }
`;

export const ButtonDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 1;
  margin: 5px 0px 0px 10px;
  cursor: pointer;
  text-align: right;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ChooseMapStyleSelect = styled.select`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2px;
  margin: 5px;
  color: black;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  margin: 5px 0px 0px 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
