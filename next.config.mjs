/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['raw.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ]
    }
};

export default nextConfig;
