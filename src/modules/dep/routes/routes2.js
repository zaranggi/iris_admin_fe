

const routes = [
  {
    path: "/dep/act/:id",
    name: "dep.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
