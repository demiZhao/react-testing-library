import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import userEvent from "@testing-library/user-event";

import { DigitalClock } from "./clock";
//Thu Dec 24 2020 12:00:00 GMT-0500 (Eastern Standard Time)
//new Date(2020, 11, 24, 12, 0);

const mockTime = new Date(2020, 11, 24, 12, 0).getTime();
const mockCtx = { time: mockTime, setTime: jest.fn((x) => x) };
jest.spyOn(React, "useContext").mockImplementation(() => mockCtx);

describe("Component render", () => {
  it("<DigitalClock> render time", () => {
    render(<DigitalClock title="Digital"></DigitalClock>);

    expect(screen.getByText(/digital/i).textContent).toBe("Digital");
    expect(screen.getByTestId("time").textContent).toBe("12:00:00");
  });

  it("<DigitalClock> render error on invalid input", () => {
    render(<DigitalClock title="Digital"></DigitalClock>);
    const hhInput = screen.getByTestId(/hh/i);
    userEvent.type(hhInput, "aa");
    const btn = screen.getByText("Set");
    userEvent.click(btn);

    expect(screen.getByText(/Error!/)).toBeInTheDocument();
    expect(mockCtx.setTime).not.toHaveBeenCalled();
  });

  it("<DigitalClock> setTime on valid input", () => {
    render(<DigitalClock title="Digital"></DigitalClock>);
    const hhInput = screen.getByTestId(/hh/i);
    userEvent.type(hhInput, "11");
    const mmInput = screen.getByTestId(/mm/i);
    userEvent.type(mmInput, "11");
    const ssInput = screen.getByTestId(/ss/i);
    userEvent.type(ssInput, "11");
    const btn = screen.getByText("Set");
    userEvent.click(btn);

    expect(screen.queryByText(/error/i)).toBeNull();
    expect(hhInput.value).toBeFalsy();
    expect(mmInput.value).toBeFalsy();
    expect(ssInput.value).toBeFalsy();
    expect(mockCtx.setTime).toHaveBeenCalledTimes(1);
  });
});
