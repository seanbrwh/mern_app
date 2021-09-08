export default [
  {
    method: "get",
    path: "/api/test/all",
    handler: (req, res) => {
      //retrieve public content
    },
  },
  {
    method: "get",
    path: "/api/test/user",
    handler: (req, res) => {
      //access a users account
    },
  },
  {
    method: "get",
    path: "/api/test/mod",
    handler: (req, res) => {
      //access a mods account
    },
  },
  {
    method: "get",
    path: "/api/test/admin",
    handler: (req, res) => {
      //access an admin account
    },
  },
];
