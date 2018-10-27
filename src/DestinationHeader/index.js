// @flow
import * as React from "react";
import styled from "styled-components";

import ChevronLeft from "../icons/ChevronLeft";
import Heading from "../Heading";
import Button, { StyledButton } from "../Button";
import BASE_URL from "./consts";
import defaultTokens from "../defaultTokens";

import type { Props } from "./index";

const StyledDestinationHeader = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  background: url(${({ imageURL }) => imageURL}) no-repeat center/cover;
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
`;

StyledDestinationHeader.defaultProps = {
  theme: defaultTokens,
};

const StyledOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-image: linear-gradient(to top, rgba(16, 19, 21, 0.75), rgba(0, 0, 0, 0));
  z-index: 1;
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
`;

StyledOverlay.defaultProps = {
  theme: defaultTokens,
};

const StyledContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  height: 160px; // TODO: create token heightDestinationHeader
  padding: ${({ theme }) => theme.orbit.spaceMedium};
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;

  ${StyledButton} {
    align-self: flex-start;
  }
`;

StyledContent.defaultProps = {
  theme: defaultTokens,
};

const DestinationHeader = (props: Props) => {
  const { destinationCity, goBackText = "Back", onGoBack, dataTest } = props;
  const imageURL = `${BASE_URL}/photos/1200x628/${props.image}.jpg`;

  return (
    <StyledDestinationHeader imageURL={imageURL} data-test={dataTest}>
      <StyledOverlay />
      <StyledContent>
        <Button type="white" size="small" iconLeft={<ChevronLeft />} onClick={onGoBack}>
          {goBackText}
        </Button>
        <Heading inverted type="display">
          {destinationCity}
        </Heading>
      </StyledContent>
    </StyledDestinationHeader>
  );
};

export default DestinationHeader;
