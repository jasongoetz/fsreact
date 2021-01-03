export const requireEnv = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error("Expected to have environment variable " + name);
    }
    return value;
};
