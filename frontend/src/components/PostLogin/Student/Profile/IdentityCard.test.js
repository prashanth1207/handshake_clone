import React from 'react';
import { mount } from 'enzyme';
import IdentityCard from './IdentityCard';

it('should render correctly', () => {
  sessionStorage.setItem('userInfo','{"id":10,"type":"Student","profile":{"id":2,"firstName":"Prashanth","lastName":"Narasimha","currentCollegeName":"San Jose Institue of Technology","city":"San Jose","state":"CA","country":"USA","skillSet":"AJAX,CSS,Front end, Backend,ReactJs,AngularJs","careerObjective":"Hiii, I am a Software Engineering Master’s student with 4 years of prior work experience in the IT industry. Having worked in technology for a long time, I realize the positive impact it can have on people’s lives and want to contribute to society through technology. Professionally, I have worked on several projects at Rochester Institute of Technology, developing and deploying web applications. These projects allowed me to demonstrate my skills in front-end web development using HTML, CSS and JavaScript. I feel that this, along with my previous industry work experience of 4+ years, makes me well suited to work in teams that develop web applications. I am also working as a graduate assistant, assisting my professor on his research on software process improvement frameworks for scientific community who often create customized software for their scientific experiments. I am currently looking for full time positions using my software engineering front end skills. I am available from August 2019 and I look forward to working with you on my next big project.","phoneNumber":"123-456-7891","dob":"2020-02-18","createdAt":"2020-02-18T04:24:51.000Z","updatedAt":"2020-03-11T19:32:46.000Z","userId":10}}');
  let studentProfile = {
    "id": 2,
    "firstName": "Sayantika",
    "lastName": "Bhattacharya",
    "collegeName": "San Jose Institue of Technology",
    "userId": 10,
    "educationDetails": [
        {
            "collegeName": "Rochester Institute of Technology",
            "location": "San Jose",
            "degree": "Masters",
            "major": "Software Engineering",
            "yearOfPassing": 2021,
            "currentCgpa": 4,
            "highestDegree": true,
            "studentProfileId": 2,
        }
    ],
  }
  const component = mount(<IdentityCard studentProfile={studentProfile}/>);
  expect(component).toMatchSnapshot();
});