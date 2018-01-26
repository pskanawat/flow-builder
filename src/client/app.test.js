import App from "./app";
import React from 'react';
import {shallow} from 'enzyme';

describe("App", () => {
	test("Should match the text node", () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find("div").text()).toBe("Welcome to React JS App");
		expect(wrapper).toMatchSnapshot();
	});
});