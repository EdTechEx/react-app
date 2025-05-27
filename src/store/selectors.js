// Module 3:
// * create selectors

export const getCoursesSelector = (state) => state.courses;
export const getAuthorsSelector = (state) => state.authors;
export const getUserNameSelector = (state) => state.user.name;
export const getUserRoleSelector = (state) => state.user?.role || null;
export const getUserTokenSelector = (state) => state.user?.token;
