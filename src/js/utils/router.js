import Navigo from 'navigo';

const root = '/';
const useHash = false; // Defaults to: false
const hash = '#!'; // Defaults to: '#'
const router = new Navigo(root, useHash, hash);

export { router };
