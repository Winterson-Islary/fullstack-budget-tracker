
export const _Config = {
	publishable_key: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
};

export const Config = {
	get(key: keyof typeof _Config) {
			const value = _Config[key]
			if (!value) {
				console.error(`${key} not found`)
				console.log(value)
				process.exit()
			}
			
		return value
	}
}