import WebServer from "./web-server";

describe("Server check Started ", () => {
	let webServer = null;
	beforeAll(() => {
		webServer = new WebServer();
	});

	test("should be started and trigger a callback", async () => {
		let promise = webServer.start();
		await expect(promise).resolves.toEqual("Started");
	});

	test("should be stopped and trigger a callback", async () => {
		let promise = webServer.stop();
		await expect(promise).resolves.toEqual("Stopped");
	});
});