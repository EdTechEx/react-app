const baseURL = "http://localhost:4000";

export const createUser = async (data) => {
  const response = await fetch(`${baseURL}/register`, {
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
  const response = await fetch(`${baseURL}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  const data = await response.json();
  return data;
};

export const logout = async () => {
  const response = await fetch(`${baseURL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token || !token.startsWith("Bearer ")) {
    throw new Error("Invalid token");
  }

  const response = await fetch(`${baseURL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = await response.json();
  return data;
};

export const getCourses = async () => {
  const response = await fetch(`${baseURL}/courses/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const createCourse = async (courseData, token) => {
  const response = await fetch(`${baseURL}/courses/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "Failed to create course");
  }

  return await response.json();
};

export const updateCourse = async (id, courseData, token) => {
  const response = await fetch(`${baseURL}/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "Failed to update course");
  }

  return await response.json();
};

export const deleteCourse = async (courseId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authorization token");
  }

  const response = await fetch(`${baseURL}/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete course, status: ${response.status}`);
  }

  return await response.json();
};

export const getAuthors = async () => {
  const response = await fetch(`${baseURL}/authors/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};

export const createAuthor = async (authorData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${baseURL}/authors/add`, {
    method: "POST",
    body: JSON.stringify(authorData),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  return await response.json();
};
