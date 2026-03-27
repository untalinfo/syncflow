import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "./HomePage";

const navigateMock = vi.fn();
vi.mock("react-router-dom", () => ({
	useNavigate: () => navigateMock,
}));

describe("HomePage Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders title and description", () => {
		render(<HomePage />);
		expect(screen.getByText("SyncFlow")).toBeInTheDocument();
		expect(
			screen.getByText(/Manage your requests efficiently/i),
		).toBeInTheDocument();
	});

	it("navigates to /request when the button is clicked", () => {
		render(<HomePage />);

		const button = screen.getByRole("button", { name: "Start now" });
		fireEvent.click(button);

		expect(navigateMock).toHaveBeenCalledWith("/request");
	});

	it("calls onNavigateToRequest if provided via props", () => {
		const onNavigateMock = vi.fn();
		render(<HomePage onNavigateToRequest={onNavigateMock} />);

		const button = screen.getByRole("button", { name: "Start now" });
		fireEvent.click(button);

		expect(onNavigateMock).toHaveBeenCalledTimes(1);
		expect(navigateMock).toHaveBeenCalledWith("/request");
	});
});
