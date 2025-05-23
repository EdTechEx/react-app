import { useNavigate } from "react-router-dom";
import { Button } from "../../../../common";

export const EmptyCourseList = () => {
  const navigate = useNavigate();

  return (
    <div data-testid="emptyContainer">
      <h1>Your List Is Empty</h1>
      <p>Please use "Add New Course" button to add your first course</p>
      <Button
        data-testid="addCourse"
        buttonText="Add New Course"
        handleClick={() => navigate("add")}
      />
    </div>
  );
};
