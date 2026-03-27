import { useState, useEffect } from "react";
import { RiSunLine, RiMoonLine, RiComputerLine } from "@remixicon/react";
import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME } from "../../../application/constants/theme";
import "./ThemeToggle.scss";

type Theme = typeof LIGHT_THEME | typeof DARK_THEME | typeof SYSTEM_THEME;

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(SYSTEM_THEME);

	const cycleTheme = () => {
		setTheme((prev) => {
			if (prev === SYSTEM_THEME) return LIGHT_THEME;
			if (prev === LIGHT_THEME) return DARK_THEME;
			return SYSTEM_THEME;
		});
	};

	useEffect(() => {
		const root = document.documentElement;
		if (theme === SYSTEM_THEME) {
			root.removeAttribute("data-theme");
		} else {
			root.setAttribute("data-theme", theme);
		}
	}, [theme]);

	const getThemeIcon = () => {
		switch (theme) {
			case LIGHT_THEME:
				return <RiSunLine size={20} />;
			case DARK_THEME:
				return <RiMoonLine size={20} />;
			case SYSTEM_THEME:
			default:
				return <RiComputerLine size={20} />;
		}
	};

	return (
		<button
			type="button"
			className="theme-toggle-btn"
			onClick={cycleTheme}
			title={`Switch theme (current: ${theme})`}
		>
			{getThemeIcon()}
		</button>
	);
};
