import { RiCloudLine } from "@remixicon/react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";

interface HomePageProps {
	onNavigateToRequest?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToRequest }) => {
	const navigate = useNavigate();
	return (
		<div className="home-page-container">
			<div className="home-page">
				<div className="home-page__icon">
					<RiCloudLine size={80} />
				</div>
				<h1 className="home-page__title">SyncFlow</h1>
				<p className="home-page__description">
					Manage your requests efficiently. Seamlessly synchronize your data
					online and offline.
				</p>
				<button
					type="button"
					className="btn-primary"
					onClick={() => {
						onNavigateToRequest?.();
						navigate("/request");
					}}
				>
					Start now
				</button>
			</div>
		</div>
	);
};
