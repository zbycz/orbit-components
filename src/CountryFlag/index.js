// @flow
import * as React from "react";
import styled from "styled-components";
import { warning } from "@kiwicom/js";

import defaultTokens from "../defaultTokens";
import { baseURL, CODES } from "./consts";

import type { Props } from "./index";

const StyledCountryFlag = styled.img`
  height: ${({ theme }) => theme.orbit.heightCountryFlag};
  width: ${({ theme }) => theme.orbit.widthCountryFlag};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusSmall};
  background-color: ${({ theme }) => theme.orbit.backgroundCountryFlag};
`;

StyledCountryFlag.defaultProps = {
  theme: defaultTokens,
};

export function getCountryProps(code: ?string, name: ?string): { code: string, name: string } {
  const codeNormalized = !code ? "ANYWHERE" : code.toUpperCase();
  warning(CODES[codeNormalized], `Country code not supported: ${JSON.stringify(code)}`);
  const countryCode = CODES[codeNormalized] ? CODES[codeNormalized] : CODES.ANYWHERE;
  const countryName = !name ? "Anywhere" : name;
  return { code: countryCode, name: countryName };
}

const CountryFlag = (props: Props) => {
  const { dataTest } = props;
  const { code, name } = getCountryProps(props.code, props.name);
  return (
    <StyledCountryFlag
      key={code}
      src={`${baseURL}/flags/24x0/flag-${code.toLowerCase()}.jpg`}
      srcSet={`${baseURL}/flags/48x0/flag-${code.toLowerCase()}.jpg 2x`}
      alt={name}
      title={name}
      data-test={dataTest}
    />
  );
};

export default CountryFlag;
