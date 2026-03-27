import {
	RiLoopLeftLine,
	RiNotification2Line,
} from "@remixicon/react";
import "./Header.scss";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

interface HeaderProps {
	onOpenNewRequest: () => void;
	pendingCount?: number;
	syncStatus?: "idle" | "success" | "error";
}

const Header: React.FC<HeaderProps> = ({
	onOpenNewRequest,
	pendingCount = 0,
	syncStatus = "idle",
}) => {
	const handleSync = () => {
		window.dispatchEvent(new CustomEvent("sync-requests"));
	};

	return (
		<header className="header">
			<div className="header__brand">
				<span className="header__title">SyncFlow</span>
			</div>
			<div className="header__actions">
				{syncStatus === "success" && (
					<span className="header__sync-status header__sync-status--success">
						✓ Sync complete
					</span>
				)}
				{syncStatus === "error" && (
					<span className="header__sync-status header__sync-status--error">
						✗ Sync failed
					</span>
				)}
				<button
					type="button"
					className="header__icon-btn"
					onClick={handleSync}
					disabled={pendingCount === 0}
				>
					<RiLoopLeftLine size={20} />
				</button>
				<button
					type="button"
					className="header__icon-btn header__icon-btn--notify"
					title={`${pendingCount} pending requests`}
				>
					<RiNotification2Line size={20} />
					{pendingCount > 0 && (
						<span className="header__notify-badge">{pendingCount}</span>
					)}
				</button>
				<button
					type="button"
					className="header__primary-btn"
					onClick={onOpenNewRequest}
				>
					Create Request
				</button>
				<ThemeToggle />
			</div>
		</header>
	);
};

export default Header;
