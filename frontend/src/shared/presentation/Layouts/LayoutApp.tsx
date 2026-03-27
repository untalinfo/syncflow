import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CreateRequestModal from "../../../domains/request/presentation/components/CreateRequestModal/CreateRequestModal";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./LayoutApp.scss";

const getPendingCount = (): number => {
	const data = localStorage.getItem("syncflow_requests");
	if (!data) return 0;
	try {
		const items = JSON.parse(data) as { status: string }[];
		return items.filter((r) => r.status === "Pending").length;
	} catch {
		return 0;
	}
};

const LayoutApp = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pendingCount, setPendingCount] = useState(getPendingCount);
	const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">(
		"idle",
	);

	const refreshPending = useCallback(() => {
		setPendingCount(getPendingCount());
	}, []);

	useEffect(() => {
		const handleSyncResult = (e: Event) => {
			const { success } = (e as CustomEvent<{ success: boolean }>).detail;
			setSyncStatus(success ? "success" : "error");
			setTimeout(() => setSyncStatus("idle"), 3000);
		};

		window.addEventListener("request-created", refreshPending);
		window.addEventListener("sync-completed", refreshPending);
		window.addEventListener("sync-result", handleSyncResult);
		return () => {
			window.removeEventListener("request-created", refreshPending);
			window.removeEventListener("sync-completed", refreshPending);
			window.removeEventListener("sync-result", handleSyncResult);
		};
	}, [refreshPending]);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<div className="layout-app">
			<Sidebar onOpenNewRequest={handleOpenModal} />
			<main className="layout-app__main">
				<Header
					onOpenNewRequest={handleOpenModal}
					pendingCount={pendingCount}
					syncStatus={syncStatus}
				/>
				<div className="layout-app__content">
					<Outlet />
				</div>
			</main>

			<CreateRequestModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default LayoutApp;
