import ServerdcList from "../pages/List";

const routes = [
  {
    path: "/serversdc/list",
    name: "serversdc.list",
    component: () => import("../pages/List")
  }
];

export default routes;
