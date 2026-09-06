"use client";

import type { MouseEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordRevealToggleProps {
	visible: boolean;
	onToggle: () => void;
	disabled?: boolean;
}

export function PasswordRevealToggle({
	visible,
	onToggle,
	disabled = false,
}: PasswordRevealToggleProps) {
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		onToggle();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={disabled}
			className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
			style={{
				position: "relative",
				zIndex: 10,
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: "2rem",
				height: "2rem",
			}}
			tabIndex={-1}
			aria-label={visible ? "Hide password" : "Show password"}
			aria-pressed={visible}
		>
			{visible ? (
				<EyeOff className="h-4 w-4 pointer-events-none" aria-hidden="true" />
			) : (
				<Eye className="h-4 w-4 pointer-events-none" aria-hidden="true" />
			)}
		</button>
	);
}
