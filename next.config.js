const config = {
    //trailingSlash: true,
    output: 'export',
    generateBuildId: async () => {
        // Use a stable build ID to prevent rsync from re-uploading unchanged files
        // when the _next directory path changes on every build
        return 'stable'
    },
}

export default config;
