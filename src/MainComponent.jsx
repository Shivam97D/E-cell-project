import React, { cloneElement, useEffect, useState } from "react";

function MainComponent() {
  const [courses, setCourses] = useState([]);               // teh json object from the api
  const [courseToShow, setShow] = useState([]);             // the filtered courses to show on page
  const [loading, setLoading] = useState(true);             // to wait for the api to response , boolean to denote the status true means it is proccessing 
  const [error, setError] = useState(null);                 // to give the error messege on failure to load rthe api response

  useEffect(() => {
    fetch("https://codehelp-apis.vercel.app/api/get-top-courses")       // api to fetch cources from
      .then((response) => response.json())                      
      .then((data) => { 
        const allCourses = [
          ...data.data.Development,
          ...data.data.Business,
          ...data.data.Design,
          ...data.data.Lifestyle,
        ];                                          // updating the array of the cources object
        setCourses(allCourses); 
        setShow(allCourses);                        // Show all courses initially
        setLoading(false);                          // loadig is completed
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);                       // will be loaded on the mount only

  const handleCategoryChange = (event) => {                     // to filter the cources according to the choice of teh user

    if (event.target.value === "0") setShow(courses);
    else if (event.target.value === "Development") setShow(courses.slice(0, 5));
    else if (event.target.value === "Business") setShow(courses.slice(5, 10));
    else if (event.target.value === "Design") setShow(courses.slice(10, 14));
    else if (event.target.value === "Lifestyle") setShow(courses.slice(14, 17));
  };

//   console.log(courses);                  // verifing the correct loading of the objects

  if (loading) return <p className="loading">Loading...</p>;
  if (error)    return <p className="errorr">🚨 Error while fetching data: {error.message}</p>;

  return (
    <>
      <div className="filters">
        <div>
          <button className="choice-button" onClick={handleCategoryChange} value="0"> All </button>
          <button className="choice-button" onClick={handleCategoryChange} value="Development" > Development </button>
          <button className="choice-button" onClick={handleCategoryChange} value="Business" > Business</button>
          <button className="choice-button" onClick={handleCategoryChange} value="Design" > Design</button>
          <button   className="choice-button" onClick={handleCategoryChange} value="Lifestyle" > Lifestyle</button>
        </div>
      </div>

      <div>
        <div className="card-area">
          {courseToShow.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}

const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="card-img">
      <img className="actual-img" src={course.image.url} alt={course.title} />
      <svg
        className="like-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
    <div className="card-title">{course.title}</div>
    <div className="card-description">
      {course.description.substring(0, 150) + "..."}
    </div>
  </div>
);

export default MainComponent;
