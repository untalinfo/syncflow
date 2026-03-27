import { useState, useEffect } from "react";
import {
	RiLoopLeftLine,
	RiNotification2Line,
	RiSunLine,
	RiMoonLine,
	RiComputerLine,
} from "@remixicon/react";
import "./Header.scss";

interface HeaderProps {
	onOpenNewRequest: () => void;
	pendingCount?: number;
	syncStatus?: "idle" | "success" | "error";
}

type Theme = "light" | "dark" | "system";

const Header: React.FC<HeaderProps> = ({
	onOpenNewRequest,
	pendingCount = 0,
	syncStatus = "idle",
}) => {
	const [theme, setTheme] = useState<Theme>("system");

	const handleSync = () => {
		window.dispatchEvent(new CustomEvent("sync-requests"));
	};

	const cycleTheme = () => {
		setTheme((prev) => {
			if (prev === "system") return "light";
			if (prev === "light") return "dark";
			return "system";
		});
	};

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "system") {
			root.removeAttribute("data-theme");
			// You can optionally add logic to listen to system preference changes here
		} else {
			root.setAttribute("data-theme", theme);
		}
	}, [theme]);

	const getThemeIcon = () => {
		switch (theme) {
			case "light":
				return <RiSunLine size={20} />;
			case "dark":
				return <RiMoonLine size={20} />;
			case "system":
			default:
				return <RiComputerLine size={20} />;
		}
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
				<button
					type="button"
					className="header__icon-btn"
					onClick={cycleTheme}
					title={`Switch theme (current: ${theme})`}
				>
					{getThemeIcon()}
				</button>
			</div>
		</header>
	);
};

export default Header;
