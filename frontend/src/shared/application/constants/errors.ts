import type { ErrorConfig } from "../types/errorPage";

export const errorConfigs: Record<string, ErrorConfig> = {
	"404": {
		code: "404",
		title: "Page Not Found",
		description: "The page you are looking for does not exist.",
		color: "neutral",
	},
	"500": {
		code: "500",
		title: "Internal Server Error",
		description: "Something went wrong on our end. Please try again later.",
		color: "error",
	},
	"403": {
		code: "403",
		title: "Forbidden",
		description: "You do not have permission to access this page.",
		color: "warning",
	},
	"401": {
		code: "401",
		title: "Unauthorized",
		description: "You need to log in to access this page.",
		color: "info",
	},
	default: {
		code: "Error",
		title: "An Error Occurred",
		description: "Something unexpected happened. Please try again.",
		color: "error",
	},
};
