import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRequestPage } from "../../application/hooks/useRequestPage";
import { RequestPage } from "./RequestPage";

vi.mock("../../application/hooks/useRequestPage");
vi.mock("../components/RequestCard/RequestCard", () => ({
	RequestCard: ({ request }: any) => (
		<div data-testid="request-card">{request.title}</div>
	),
}));
vi.mock("../components/DeleteModal/DeleteModal", () => ({
	DeleteModal: () => <div data-testid="delete-modal">Delete Modal</div>,
}));
vi.mock("../components/RequestDetailModal/RequestDetailModal", () => ({
	RequestDetailModal: () => <div data-testid="detail-modal">Detail Modal</div>,
}));
vi.mock("../components/RequestHeader/RequestHeader", () => ({
	RequestHeader: () => <div data-testid="request-header">Header Mock</div>,
}));

describe("RequestPage Component", () => {
	const defaultMockReturn = {
		requests: [],
		isSyncing: false,
		pendingDelete: null,
		isDeleting: false,
		pendingDetail: null,
		handleSync: vi.fn(),
		handleDeleteClick: vi.fn(),
		handleDeleteConfirm: vi.fn(),
		handleDeleteCancel: vi.fn(),
		handleCardClick: vi.fn(),
		setPendingDetail: vi.fn(),
		pendingCount: 0,
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(useRequestPage).mockReturnValue(defaultMockReturn as any);
	});

	it("renders header and empty state by default", () => {
		render(<RequestPage />);
		expect(screen.getByTestId("request-header")).toBeInTheDocument();
		expect(screen.getByText(/No requests yet/i)).toBeInTheDocument();
	});

	it("renders request cards mapping without empty state", () => {
		vi.mocked(useRequestPage).mockReturnValue({
			...defaultMockReturn,
			requests: [
				{ id: "1", title: "MOCK REQ 1" },
				{ id: "2", title: "MOCK REQ 2" },
			],
		} as any);

		render(<RequestPage />);
		expect(screen.getAllByTestId("request-card")).toHaveLength(2);
		expect(screen.getByText("MOCK REQ 1")).toBeInTheDocument();
		expect(screen.getByText("MOCK REQ 2")).toBeInTheDocument();
		expect(screen.queryByText(/No requests yet/i)).not.toBeInTheDocument();
	});

	it("shows DeleteModal when pendingDelete condition is met", () => {
		vi.mocked(useRequestPage).mockReturnValue({
			...defaultMockReturn,
			pendingDelete: { id: "1", title: "Wait" },
		} as any);

		render(<RequestPage />);
		expect(screen.getByTestId("delete-modal")).toBeInTheDocument();
	});

	it("shows RequestDetailModal when pendingDetail condition is met", () => {
		vi.mocked(useRequestPage).mockReturnValue({
			...defaultMockReturn,
			pendingDetail: { id: "1", title: "Wait detail" },
		} as any);

		render(<RequestPage />);
		expect(screen.getByTestId("detail-modal")).toBeInTheDocument();
	});
});
