
const routes = [
  {
    path: "/jabatan/act/:id",
    name: "jabatan.details",
    component: () => import("../pages/Edit")
  }
];

export default routes;
