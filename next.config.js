const isDev = process.env.NEXT_PUBLIC_SITE_URL?.includes('dev.embankment.org');

const config = {
    //trailingSlash: true,
    output: 'export',
    // Use separate output directories for dev and prod builds
    // This prevents conflicts and allows different builds to coexist
    distDir: isDev ? '.next-dev' : '.next',
    generateBuildId: async () => {
        // Use a stable build ID to prevent rsync from re-uploading unchanged files
        // when the _next directory path changes on every build
        return 'stable'
    },
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://embankment.org',
    },
}

export default config;
