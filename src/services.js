const baseURL = "http://localhost:4000/";

// const API = {
//   post: async (endpoint, body) => {
//     try {
//       const response = await fetch(`${baseURL}${endpoint}`, {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json().catch(() => null);

//       return data;
//     } catch (error) {
//       console.error("Network/API Error:", error);
//     }
//   },
// };

// export const createUser = async (newUser) =>
//   await API.post("register", newUser);

export const createUser = async (data) => {
  const response = await fetch(`${baseURL}register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const login = async (user) => {
  const response = await fetch(`${baseURL}login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const getCourses = async () => {
  const response = await fetch(`${baseURL}courses/all`, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const getAuthors = async () => {
  const response = await fetch(`${baseURL}authors/all`, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

// export const getCurrentUser = async () => {
//   // write your code here
//   return await response.json();
// };

// export const updateCourseService = async () => {
//   // write your code here
//   return await response.json();
// };

// export const logout = async () => {
//   // write your code here
//   return await response.json();
// };

// export const deleteCourseService = async () => {
//   // write your code here
//   return await response.json();
// };

// export const createCourse = async () => {
//   // write your code here
//   return await response.json();
// };

// export const createAuthor = async () => {
//   // write your code here
//   return await response.json();
// };
