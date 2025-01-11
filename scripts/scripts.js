
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function calculateTotalCredits(coursesToCalculate) {
    const totalCredits = coursesToCalculate.reduce((total, course) => total + course.credits, 0);
    const totalCreditsElement = document.getElementById('total-credits');
    totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

// Function to render the courses and calculate credits
function renderCourses(filteredCourses) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Limpa a lista de cursos

    filteredCourses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');

        // Verifica se o curso foi completado e adiciona a classe correspondente
        if (course.completed) {
            courseItem.classList.add('completed-course');
            courseItem.innerHTML = `
                <p>
                    ${course.subject} ${course.number} 
                    <span class="checkmark">✔</span>
                </p>`;
        } else {
            courseItem.classList.add('incomplete-course');
            courseItem.innerHTML = `<p>${course.subject} ${course.number}</p>`;
        }
        
        courseList.appendChild(courseItem);
    });

    calculateTotalCredits(filteredCourses);
}

// Function to filter courses
function filterCourses(subject) {
    if (subject === 'All') {
        renderCourses(courses); // Show all courses
    } else {
        const filteredCourses = courses.filter(course => course.subject === subject);
        renderCourses(filteredCourses); // Show filtered courses
    }
}

document.getElementById('filter-all').addEventListener('click', () => filterCourses('All'));
document.getElementById('filter-cse').addEventListener('click', () => filterCourses('CSE'));
document.getElementById('filter-wdd').addEventListener('click', () => filterCourses('WDD'));

window.addEventListener('DOMContentLoaded', () => renderCourses(courses));

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

const lastModifiedDate = document.lastModified;
document.getElementById('last-modified-date').textContent = lastModifiedDate;


