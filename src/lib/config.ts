
export const _Config = {
	publishable_key: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
	sign_up_url: import.meta.env.VITE_CLERK_SIGN_UP_URL,
	sign_in_url: import.meta.env.VITE_CLERK_SIGN_IN_URL,
	after_sign_in: import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
	after_sign_up: import.meta.env.VITE_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
};

export const Config = {
	get(key: keyof typeof _Config) {
			const value = _Config[key]
			if (!value) {
				console.error(`${key} not found`)
				process.exit()
			}
			
		return value
	}
}