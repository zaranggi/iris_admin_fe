

const routes = [
  {
    path: "/menu/act/:id",
    name: "menu.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
