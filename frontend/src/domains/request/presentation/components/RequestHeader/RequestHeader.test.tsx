import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RequestHeader } from "./RequestHeader";

describe("RequestHeader component", () => {
	it("renders the title and description", () => {
		render(
			<RequestHeader handleSync={vi.fn()} isSyncing={false} pendingCount={0} />,
		);
		expect(screen.getByText("Request Thread")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Manage and synchronize your data requests across environments.",
			),
		).toBeInTheDocument();
	});

	it("shows correct sync button text based on pendingCount", () => {
		render(
			<RequestHeader handleSync={vi.fn()} isSyncing={false} pendingCount={5} />,
		);
		expect(screen.getByText("Sync All (5)")).toBeInTheDocument();
	});

	it("disables the sync button when isSyncing is true", () => {
		render(
			<RequestHeader handleSync={vi.fn()} isSyncing={true} pendingCount={2} />,
		);
		expect(screen.getByRole("button")).toBeDisabled();
		expect(screen.getByText(/Syncing.../)).toBeInTheDocument();
	});

	it("disables the sync button when pendingCount is 0", () => {
		render(
			<RequestHeader handleSync={vi.fn()} isSyncing={false} pendingCount={0} />,
		);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("calls handleSync when the sync button is clicked", () => {
		const handleSync = vi.fn();
		render(
			<RequestHeader
				handleSync={handleSync}
				isSyncing={false}
				pendingCount={1}
			/>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(handleSync).toHaveBeenCalledTimes(1);
	});
});
