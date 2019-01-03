import ipfsClient from 'ipfs-http-client';

export const ipfs = ipfsClient('ipfs.infura.io', process.env.IPFS_PORT, { protocol: 'https' });

export default ipfs;
