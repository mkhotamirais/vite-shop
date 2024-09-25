import { create } from "zustand";
import axios from "axios";
import { url } from "@/lib/constants";

const axiosCred = axios.create({ withCredentials: true });

export interface V1Products {
  _id: string;
  name: string;
  price: number | string;
  tag: { _id: string; name: string }[];
  category: { _id: string; name: string };
  description: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface V1Categories {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface V1Tags {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type Reference = { _id?: string; refName: string; refLink: string };
export interface V1Kamuss {
  _id: string;
  name: string;
  description: string;
  reference?: Reference[];
  createdAt: string;
  updatedAt: string;
}

export interface V1Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  accessToken: string[];
  createdAt: string;
  updatedAt: string;
}

interface V1State {
  query: { [key: string]: string };
  setQuery: (newQuery: { [ke: string]: string }) => void;
  data: V1Products[];
  loadData: boolean;
  errData: string | null;
  getData: (params?: string) => void;
  singleData: V1Products | null;
  loadSingleData: boolean;
  errSingleData: string | null;
  getDataById: (id: string) => void;
  cat: V1Categories[];
  loadCat: boolean;
  errCat: string | null;
  getCat: () => void;
  singleCat: V1Categories | null;
  loadSingleCat: boolean;
  errSingleCat: string | null;
  getCatById: (id: string) => void;
  tag: V1Tags[];
  loadTag: boolean;
  errTag: string | null;
  getTag: () => void;
  singleTag: V1Tags | null;
  loadSingleTag: boolean;
  errSingleTag: string | null;
  getTagById: (id: string) => void;
  kamus: V1Kamuss[];
  loadKamus: boolean;
  errKamus: string | null;
  getKamus: () => void;
  singleKamus: V1Kamuss | null;
  loadSingleKamus: boolean;
  errSingleKamus: string | null;
  getKamusById: (id: string) => void;
  users: V1Users[];
  loadUsers: boolean;
  errUsers: string | null;
  getUsers: () => void;
  user: V1Users | null;
  loadUser: boolean;
  errUser: string | null;
  getUser: (id: string) => void;
  me: V1Users | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
}

export const useV1 = create<V1State>((set) => ({
  query: {},
  setQuery: (newQuery) => set((state) => ({ query: { ...state.query, ...newQuery } })),
  data: [],
  loadData: false,
  errData: null,
  getData: async (params = "") => {
    set({ loadData: true });
    await axiosCred
      .get(`${url}/v1/product?${params}`)
      .then((res) => {
        set({ data: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errData: err.response.data.error });
        } else set({ errData: err.message });
      })
      .finally(() => set({ loadData: false }));
  },
  singleData: null,
  loadSingleData: false,
  errSingleData: null,
  getDataById: async (id) => {
    set({ loadSingleData: true });
    await axiosCred
      .get(`${url}/v1/product/${id}`)
      .then((res) => {
        set({ singleData: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errSingleData: err.response.data.error });
        } else set({ errSingleData: err.message });
      })
      .finally(() => set({ loadSingleData: false }));
  },
  cat: [],
  loadCat: false,
  errCat: null,
  getCat: async () => {
    set({ loadCat: true });
    await axiosCred
      .get(`${url}/v1/category`)
      .then((res) => {
        set({ cat: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errCat: err.response.data.error });
        } else set({ errCat: err.message });
      })
      .finally(() => set({ loadCat: false }));
  },
  singleCat: null,
  loadSingleCat: false,
  errSingleCat: null,
  getCatById: async (id) => {
    set({ loadSingleCat: true });
    await axiosCred
      .get(`${url}/v1/category/${id}`)
      .then((res) => {
        set({ singleCat: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errSingleCat: err.response.data.error });
        } else set({ errSingleCat: err.message });
      })
      .finally(() => set({ loadSingleCat: false }));
  },
  tag: [],
  loadTag: false,
  errTag: null,
  getTag: async () => {
    set({ loadTag: true });
    await axiosCred
      .get(`${url}/v1/tag`)
      .then((res) => {
        set({ tag: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errTag: err.response.data.error });
        } else set({ errTag: err.message });
      })
      .finally(() => set({ loadTag: false }));
  },
  singleTag: null,
  loadSingleTag: false,
  errSingleTag: null,
  getTagById: async (id) => {
    set({ loadSingleTag: true });
    await axiosCred
      .get(`${url}/v1/tag/${id}`)
      .then((res) => {
        set({ singleTag: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errSingleTag: err.response.data.error });
        } else set({ errSingleTag: err.message });
      })
      .finally(() => set({ loadSingleTag: false }));
  },
  kamus: [],
  loadKamus: false,
  errKamus: null,
  getKamus: async () => {
    set({ loadKamus: true });
    await axiosCred
      .get(`${url}/v1/kamus`)
      .then((res) => {
        set({ kamus: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errKamus: err.response.data.error });
        } else set({ errKamus: err.message });
      })
      .finally(() => set({ loadKamus: false }));
  },
  singleKamus: null,
  loadSingleKamus: false,
  errSingleKamus: null,
  getKamusById: async (id) => {
    set({ loadSingleKamus: true });
    await axiosCred
      .get(`${url}/v1/kamus/${id}`)
      .then((res) => {
        set({ singleKamus: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errSingleKamus: err.response.data.error });
        } else set({ errSingleKamus: err.message });
      })
      .finally(() => set({ loadSingleTag: false }));
  },
  users: [],
  loadUsers: false,
  errUsers: null,
  getUsers: async () => {
    set({ loadUsers: true });
    await axiosCred
      .get(`${url}/v1/user`)
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errUsers: err.response.data.error });
        } else set({ errUsers: err.message });
      })
      .finally(() => set({ loadUsers: false }));
  },
  user: null,
  loadUser: false,
  errUser: null,
  getUser: async (id) => {
    set({ loadUser: true });
    await axiosCred
      .get(`${url}/v1/user/${id}`)
      .then((res) => {
        set({ user: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errUser: err.response.data.error });
        } else set({ errUser: err.message });
      })
      .finally(() => set({ loadUser: false }));
  },
  me: null,
  loadMe: false,
  errMe: null,
  getMe: async () => {
    set({ loadMe: true });
    await axiosCred
      .get(`${url}/v1/me`)
      .then((res) => {
        set({ me: res.data });
      })
      .catch((err) => {
        if (err.response) {
          set({ errMe: err.response.data.error });
        } else set({ errMe: err.message });
      })
      .finally(() => set({ loadMe: false }));
  },
}));
