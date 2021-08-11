import React from "react";
import { render } from "@testing-library/react-native";
import App from "./App.js";
import { NativeModules } from "react-native";
describe("App", () => {
  beforeEach(() => {
    NativeModules.TestModule = { test: jest.fn() };
  });
  v;
  test("should render correctly", () => {
    const wrapper = render(<App />);
    wrapper.getByTestId("app");
  });
});
