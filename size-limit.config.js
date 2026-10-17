/** @type {import('size-limit').SizeLimitConfig} */
export default [
  {
    name: "main ESM entry",
    path: "dist/index.js",
    limit: "80 kB",
  },
  {
    name: "DataGrid",
    path: "dist/components/DataGrid/index.js",
    limit: "5 kB",
  },
  {
    name: "Chart barrel",
    path: "dist/components/Chart/index.js",
    limit: "5 kB",
  },
]
