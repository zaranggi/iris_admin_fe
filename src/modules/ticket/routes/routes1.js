

const routes = [
  {
    path: "/ticket/list",
    name: "ticket.list",
    component: () => import("../pages/List")
  }
];

export default routes;
