

const routes = [
  {
    path: "/menuadmin/act/:id",
    name: "menuadmin.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
