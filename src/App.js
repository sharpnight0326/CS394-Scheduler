import React from 'react';
import './App.css';
import {useState, useEffect} from "react";
import CourseList from './components/CourseList';
import { useData } from './utilities/firebase.js';
import {addScheduleTimes} from "./utilities/times";

function App() {
    // const [schedule, setSchedule] = useState();
    const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
    // const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;
    // const timeParts = meets => {
    //     const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
    //     return !match ? {} : {
    //         days,
    //         hours: {
    //             start: hh1 * 60 + mm1 * 1,
    //             end: hh2 * 60 + mm2 * 1
    //         }
    //     };
    // };
    // const addCourseTimes = course => ({
    //     ...course,
    //     ...timeParts(course.meets)
    // });
    // const mapValues = (fn, obj) => (
    //     Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
    // );
    // const addScheduleTimes = schedule => ({
    //     title: schedule.title,
    //     courses: mapValues(addCourseTimes, schedule.courses)
    // });
    // useEffect(() => {
    //     const fetchSchedule = async () => {
    //         const response = await fetch(url);
    //         if (!response.ok) throw response;
    //         const json = await response.json();
    //         setSchedule(addScheduleTimes(json));
    //     }
    //     fetchSchedule();
    // }, [])
    // if (!schedule) return <h1>Loading schedule...</h1>;
    const Banner = ({ title }) => (
        <h1>{ title }</h1>
    );

    const [schedule, loading, error] = useData('/', addScheduleTimes);

    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the schedule...</h1>

  return (
      <div className="container">
          <Banner title={ schedule.title } />
          <CourseList courses={ schedule.courses } />
      </div>
  );
}

export default App;
