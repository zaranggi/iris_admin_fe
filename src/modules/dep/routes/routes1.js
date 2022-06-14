const routes = [
  {
    path: "/dep/list",
    name: "dep.list",
    component: () => import("../pages/List")
  }
];

export default routes;
