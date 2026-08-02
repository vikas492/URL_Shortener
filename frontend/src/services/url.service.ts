import api from "./api";

export const createShortUrl = async (data: {
  originalUrl: string;
  customAlias?: string;
}) => {
  const response = await api.post("/urls", data);

  return response.data;
};

export const getMyUrls = async (
  page: number = 1,
  limit: number = 5,
  search: string = ""
) => {
  const response = await api.get("/urls", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/urls/stats");

  return response.data.data;
};

export const deleteUrl = async (id: string) => {
  const response = await api.delete(`/urls/${id}`);

  return response.data;
};

export const updateUrl = async (
  id: string,
  data: {
    originalUrl: string;
    customAlias: string;
  }
) => {
  const response = await api.put(
    `/urls/${id}`,
    data
  );

  return response.data;
};