import React from 'react'

const Course = ({ course }) =>
{
  //console.log(course)
  return (
    <div>
      <Header name={ course.name } />
      { course.parts.map(part =>
        <Content key={ part.id } part={ part } />
      ) }
      <Sum course={course} />
    </div>
  )
}

const Header = (props) =>
{
  return (
    <h1>{ props.name }</h1>
  )
}

const Content = (props) =>
{
  return (
    <div>
      { props.part.name } { props.part.exercises }
    </div>
  )
}

const Sum = (props) =>
{
  let sum = props.course.parts.reduce(function (accumulator, current)
  {
    return accumulator + current.exercises;
  }, 0)
  //console.log(sum);
  return (
    <div><b>total of { sum } exercises</b></div>
  )
}

export default Course