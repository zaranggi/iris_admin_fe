const routes = [
  {
    path: "/cabang/act/:id",
    name: "cabang.details",
    component: () => import("../pages/Edit"),
  }
];

export default routes;
