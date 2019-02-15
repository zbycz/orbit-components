// @flow

export const DEVICES = {
  largeDesktop: 1200,
  desktop: 992,
  tablet: 768,
  largeMobile: 576,
  mediumMobile: 414,
  smallMobile: 0,
};

export const QUERIES = {
  largeDesktop: { min: DEVICES.largeDesktop },
  desktop: { min: DEVICES.desktop },
  tablet: { min: DEVICES.tablet },
  largeMobile: { min: DEVICES.largeMobile },
  mediumMobile: { min: DEVICES.mediumMobile },
};
