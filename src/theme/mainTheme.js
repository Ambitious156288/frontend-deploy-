const breakpoints = {
  smallSmartphone: 320,
  smartphone: 480,

  smallTablet: 600,
  tablet: 801,
  bigTablet: 1000,

  laptops: 1281,

  smallDesktop: 1366,
  Desktop: 1735,
  bigDesktop: 1920,
};

export const theme = {
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (max-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),

  mi: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {}),

  dq: Object.keys(breakpoints).reduce((acc, breakpointLower, breakpointHigher) => {
    acc[
      (breakpointLower, breakpointHigher)
    ] = `@media (max-width: ${breakpoints[breakpointHigher]}px) and (min-width: ${breakpoints[breakpointLower]}px)`;
    return acc;
  }, {}),
};