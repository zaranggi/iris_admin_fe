
const routes = [
  {
    path: "/uadmin/menuclient/:id",
    name: "uadmin.menuclient",
    component: () => import("../pages/Menuclient")
  }
];

export default routes;
