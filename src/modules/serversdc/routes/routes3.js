import ServerdcAdd from "../pages/Tambah";

const routes = [
  {
    path: "/serversdc/add",
    name: "serversdc.tambah",
    component: () => import("../pages/Tambah")
  }
];

export default routes;
