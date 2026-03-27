import { useState, useEffect } from "react";
import { RiSunLine, RiMoonLine, RiComputerLine } from "@remixicon/react";
import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME } from "../../../application/constants/theme";
import "./ThemeToggle.scss";

type Theme = typeof LIGHT_THEME | typeof DARK_THEME | typeof SYSTEM_THEME;

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem("app-theme");
		if (savedTheme === LIGHT_THEME || savedTheme === DARK_THEME || savedTheme === SYSTEM_THEME) {
			return savedTheme as Theme;
		}
		return SYSTEM_THEME;
	});

	const cycleTheme = () => {
		setTheme((prev) => {
			let nextTheme: Theme = SYSTEM_THEME;
			if (prev === SYSTEM_THEME) nextTheme = LIGHT_THEME;
			else if (prev === LIGHT_THEME) nextTheme = DARK_THEME;
			
			localStorage.setItem("app-theme", nextTheme);
			return nextTheme;
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
