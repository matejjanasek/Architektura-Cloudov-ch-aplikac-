async function Call(baseUri, useCase, dtoIn, method) {//url address, specific route, data input, HTTP method (GET...)

  let response;

  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:8888";

const FetchHelper = {
  medicalEntries: {
    get: async (dtoIn) => {
      return await Call(baseUri, "medicalEntries/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "medicalEntries/create", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "medicalEntries/delete", dtoIn, "post");
    },
    list: async (dtoIn) => {
      return await Call(baseUri, "medicalEntries/list", dtoIn, "get");
    },
  },

  passport: {
    get: async (dtoIn) => {
      return await Call(baseUri, "passport/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "passport/create", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "passport/delete", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "passport/list", null, "get");
    },
  },
};

export default FetchHelper;
