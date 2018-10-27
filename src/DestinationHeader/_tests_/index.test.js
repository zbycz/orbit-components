// @flow
import * as React from "react";
import { shallow } from "enzyme";

import DestinationHeader from "../index";
import BASE_URL from "../consts";

describe("DestinationHeader", () => {
  const destinationCity = "Dubai";
  const image = "dubai_ae";
  const goBackText = "Zpět";
  const dataTest = "test";
  const onGoBack = jest.fn();

  const component = shallow(
    <DestinationHeader
      destinationCity={destinationCity}
      image={image}
      goBackText={goBackText}
      onGoBack={onGoBack}
      dataTest={dataTest}
    />,
  );
  const imageURL = `${BASE_URL}/photos/1200x628/${image}.jpg`;
  const button = component.find("Button");
  const heading = component.find("Heading");
  it("should have passed props", () => {
    expect(button.children().text()).toBe(goBackText);
    expect(component.prop("imageURL")).toBe(imageURL);
    expect(heading.children().text()).toBe(destinationCity);
    expect(component.render().prop("data-test")).toBe(dataTest);
  });
  it("should execute onGoBack method", () => {
    button.simulate("click");
    expect(onGoBack).toHaveBeenCalled();
  });
  it("should match snapshot", () => {
    expect(component).toMatchSnapshot();
  });
});
