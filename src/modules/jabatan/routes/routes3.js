import JabatanAdd from "../pages/Tambah";

const routes = [
  {
    path: "/jabatan/add",
    name: "jabatan.tambah",
    component: () => import("../pages/Tambah")
  }
];

export default routes;
