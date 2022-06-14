

const routes = [
  {
    path: "/server/act/:id",
    name: "server.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
