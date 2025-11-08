const isDev = process.env.NEXT_PUBLIC_SITE_URL?.includes('dev.embankment.org');

const config = {
    //trailingSlash: true,
    output: 'export',
    // Use separate output directories for dev and prod builds
    // This prevents conflicts with the dev server and allows different builds to coexist
    // Dev server uses default .next directory, builds use .next-dev or .next-prod
    distDir: isDev ? '.next-dev' : '.next-prod',
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
