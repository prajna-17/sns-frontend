"use client";

import { useEffect, useState } from "react";

export default function InstallButton() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [isInstalled, setIsInstalled] = useState(false);
	const [showHint, setShowHint] = useState(false);

	useEffect(() => {
		// Detect standalone mode
		if (window.matchMedia("(display-mode: standalone)").matches) {
			setIsInstalled(true);
		}

		const handler = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
		};

		window.addEventListener("beforeinstallprompt", handler);

		return () =>
			window.removeEventListener("beforeinstallprompt", handler);
	}, []);

	const handleInstall = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			await deferredPrompt.userChoice;
			setDeferredPrompt(null);
		} else {
			setShowHint(true);
			setTimeout(() => setShowHint(false), 4000);
		}
	};

	if (isInstalled) return null;

	return (
		<div className="relative">
			<button
				onClick={handleInstall}
				className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition w-full text-start"
			>
				Install SNS
			</button>
		</div>
	);
}
