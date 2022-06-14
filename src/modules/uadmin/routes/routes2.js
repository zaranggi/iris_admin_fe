
const routes = [
  {
    path: "/uadmin/act/:id",
    name: "uadmin.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
