import ServerdcForm from "../pages/Edit";

const routes = [
  {
    path: "/serversdc/act/:id",
    name: "serversdc.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
