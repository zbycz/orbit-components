// @flow
import * as React from "react";
import styled from "styled-components";

import defaultTokens from "../../defaultTokens";
import ChevronDown from "../../icons/ChevronDown";
import { getSize } from "../../Icon";
import { ICON_SIZES } from "../../Icon/consts";

import type { ContextType, Props } from "./index";

const StyledCardSectionIconRight = styled(ChevronDown)`
  align-self: center;
  transition: ${({ theme }) => theme.orbit.durationFast};
`;

StyledCardSectionIconRight.defaultProps = {
  theme: defaultTokens,
};

const StyledCardSectionContent = styled.div`
  font-family: ${({ theme }) => theme.orbit.fontFamily};
  font-size: ${({ theme }) => theme.orbit.fontSizeTextNormal};
  line-height: ${({ theme }) => theme.orbit.lineHeightText};
  color: ${({ theme }) => theme.orbit.colorTextPrimary};
  border-top: ${({ theme, expanded }) =>
    expanded
      ? `1px solid ${theme.orbit.paletteCloudNormal}`
      : `0px solid ${theme.orbit.paletteCloudNormal}`};
  padding-top: ${({ theme, expanded }) => expanded && `${theme.orbit.spaceMedium}`};
  overflow: hidden;
`;

StyledCardSectionContent.defaultProps = {
  theme: defaultTokens,
};

const getMaxHeight = ({ expandable, expanded, contentHeight }) => {
  if (expandable) {
    if (expanded) {
      return `${contentHeight}px`;
    }
    return 0;
  }
  return "auto";
};

export const StyledCardSection = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.orbit.spaceLarge};
  box-sizing: border-box;
  position: relative;
  background: ${({ theme }) => theme.orbit.backgroundCard};

  ${StyledCardSectionContent} {
    max-height: ${getMaxHeight};
  }
`;

StyledCardSection.defaultProps = {
  theme: defaultTokens,
};

const StyledCardSectionHeader = styled.div`
  margin-bottom: ${({ theme, expanded }) => expanded && theme.orbit.spaceMedium};
  display: flex;
  flex-direction: row;
  cursor: pointer;
  position: relative;
  min-height: ${({ expandable }) => expandable && getSize(ICON_SIZES.MEDIUM)};
`;

StyledCardSectionHeader.defaultProps = {
  theme: defaultTokens,
};

export const CardSectionContext: React.Context<ContextType> = React.createContext({
  expandable: false,
  expanded: false,
  handleToggleSection: () => {},
});

class CardSection extends React.Component<any, Props> {
  componentDidMount() {
    const { handleToggleSection, initialExpanded, setInitialExpandedSection } = this.props;

    if (initialExpanded) {
      handleToggleSection();
      setInitialExpandedSection();
    }
  }

  injectCallbackAndToggleSection = () => {
    const { handleToggleSection, onClose, onExpand, expanded } = this.props;
    handleToggleSection(); // First do toggle

    if (expanded && onClose) {
      // If is expanded -> action is closing
      onClose();
    }
    if (!expanded && onExpand) {
      // if is closed > action is expanding
      onExpand();
    }
  };

  render() {
    const { children, dataTest, expandable, expanded } = this.props;
    return (
      <StyledCardSection data-test={dataTest} expandable={expandable} expanded={expanded}>
        <CardSectionContext.Provider
          value={{ expandable, expanded, handleToggleSection: this.injectCallbackAndToggleSection }}
        >
          {children}
        </CardSectionContext.Provider>
      </StyledCardSection>
    );
  }
}

export default CardSection;

export { default as CardSectionHeader } from "./CardSectionHeader";
export { default as CardSectionContent } from "./CardSectionContent";
