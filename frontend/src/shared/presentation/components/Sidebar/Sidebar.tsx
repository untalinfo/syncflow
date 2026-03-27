import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import {
	RiFolderSharedLine,
	RiGitPrDraftLine,
	RiHome3Line,
	RiQuestionLine,
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiAddLine
} from "@remixicon/react";

interface SidebarProps {
	onOpenNewRequest: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOpenNewRequest }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<aside className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
			<div className="sidebar__header">
				<div className="sidebar__brand">
					<div className="sidebar__logo">
						<img
							alt="Organization Logo"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_0vd2--JRwoVLkb1p7uQo0f32XKS_8e4L6nCZD9jd25W2H24cOUDANbBM_Os1Xnx4tog0edJGQ0MbwJWFS7vOToGU4wRguwSOHQRB0E7QgAq5UGJU1bln6eOtTSyNX_NxZl0orwqGIuJy69beW6kh6xFm_uv633zkcwUObIEPjXDCOkeVO0z7macvFQlEjf125oPhDKkt2ptEgAvU6eBZD5e4PhdULYY1V47fs3w6R6sSk5g2YiljtYvjfU4IZ2v6ZYJx2QA_ofYy"
						/>
					</div>
					{!isCollapsed && (
						<div className="sidebar__titles">
							<h1 className="sidebar__title">Atelier Admin</h1>
							<p className="sidebar__subtitle">Offline Ready</p>
						</div>
					)}
				</div>
				
				<button type="button" className="sidebar__toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
					{isCollapsed ? <RiArrowRightSLine size={20} /> : <RiArrowLeftSLine size={20} />}
				</button>
			</div>

			<nav className="sidebar__nav">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
					}
					title={isCollapsed ? "Home" : ""}
				>
					{({ isActive }) => (
						<>
							<span
								className="material-symbols-outlined"
								style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
							>
								<RiHome3Line size={20} />
							</span>
							{!isCollapsed && <span>Home</span>}
						</>
					)}
				</NavLink>
				<NavLink
					to="/request"
					className={({ isActive }) =>
						`sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
					}
					title={isCollapsed ? "Requests" : ""}
				>
					{({ isActive }) => (
						<>
							<span
								className="material-symbols-outlined"
								style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
							>
								<RiGitPrDraftLine size={20} />
							</span>
							{!isCollapsed && <span>Requests</span>}
						</>
					)}
				</NavLink>
				<NavLink
					to="/groups"
					className={({ isActive }) =>
						`sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
					}
					title={isCollapsed ? "Groups" : ""}
				>
					{({ isActive }) => (
						<>
							<span
								className="material-symbols-outlined"
								style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
							>
								<RiFolderSharedLine size={20} />
							</span>
							{!isCollapsed && <span>Groups</span>}
						</>
					)}
				</NavLink>
			</nav>
			<div className="sidebar__footer">
				<button
					type="button"
					className="sidebar__action-btn"
					onClick={onOpenNewRequest}
					title={isCollapsed ? "New Request" : ""}
				>
					{isCollapsed ? <RiAddLine size={20} /> : "New Request"}
				</button>
				<a className="sidebar__help-link" href="#" title={isCollapsed ? "Help Center" : ""}>
					<RiQuestionLine size={20} />
					{!isCollapsed && <span>Help Center</span>}
				</a>
			</div>
		</aside>
	);
};

export default Sidebar;
