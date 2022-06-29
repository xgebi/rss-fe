export const useUriValid = (uri: string) => {
	try {
		new URL(uri);
	} catch (e) {
		return false;
	}
	return true;
};