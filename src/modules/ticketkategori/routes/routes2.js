
const routes = [
  {
    path: "/ticketkategori/act/:id",
    name: "ticketkategori.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
