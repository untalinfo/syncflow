import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGroups } from "../../../application/hooks/useGroups";
import { GroupsPage } from "./GroupsPage";

vi.mock("../../../application/hooks/useGroups");
vi.mock("../../components/GroupCard/GroupCard", () => ({
	GroupCard: () => <div data-testid="group-card">Group Card</div>,
}));

describe("GroupsPage Component", () => {
	const defaultMockReturn = {
		storedGroups: [],
		composites: [],
		allRequests: [],
		newGroupName: "",
		isCreating: false,
		setNewGroupName: vi.fn(),
		handleCreateGroup: vi.fn((e) => e?.preventDefault()),
		handleDelete: vi.fn(),
		handleAddRequest: vi.fn(),
		handleRemoveRequest: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useGroups).mockReturnValue(defaultMockReturn as any);
	});

	it("renders header, pattern explanation, and empty state when no groups exist", () => {
		render(<GroupsPage />);
		expect(screen.getByText("Request Groups")).toBeInTheDocument();
		expect(screen.getByText("Composite:")).toBeInTheDocument();
		expect(screen.getByText("No groups yet")).toBeInTheDocument();
	});

	it("disables the create group button when input is empty", () => {
		render(<GroupsPage />);
		const btn = screen.getByRole("button", { name: /create group/i });
		expect(btn).toBeDisabled();
	});

	it("enables the submit button and fires submit handler when input is populated", () => {
		vi.mocked(useGroups).mockReturnValue({
			...defaultMockReturn,
			newGroupName: "New Application Group",
		} as any);

		render(<GroupsPage />);
		const btn = screen.getByRole("button", { name: /create group/i });
		expect(btn).not.toBeDisabled();

		// Simulate finding the form or clicking the button
		fireEvent.click(btn);
		expect(defaultMockReturn.handleCreateGroup).toHaveBeenCalled();
	});

	it("displays a list of groups when storedGroups is not empty", () => {
		vi.mocked(useGroups).mockReturnValue({
			...defaultMockReturn,
			storedGroups: [
				{ id: "1", name: "G1", items: [] },
				{ id: "2", name: "G2", items: [] },
			],
			composites: [{}, {}],
		} as any);

		render(<GroupsPage />);
		expect(screen.getAllByTestId("group-card")).toHaveLength(2);
		expect(screen.queryByText("No groups yet")).not.toBeInTheDocument();
	});
});
