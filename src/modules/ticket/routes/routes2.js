

const routes = [
  {
    path: "/ticket/act/:id",
    name: "ticket.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
