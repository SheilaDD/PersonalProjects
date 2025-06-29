const roadmapSteps = [
  "Learn HTML, CSS, JavaScript",
  "Build simple web projects",
  "Learn Git & GitHub",
  "Understand Web APIs",
  "Learn Frontend Framework (React/Vue)",
  "Build a Portfolio",
  "Apply for Internships",
  "Prepare for Technical Interviews",
  "Get your first Job",
  "Continue Learning and Upskilling",
];

const container = document.getElementById("roadmap-container");

roadmapSteps.forEach((step, index) => {
  const div = document.createElement("div");
  div.className = "roadmap-step";
  div.textContent = `${index + 1}. ${step}`;

  div.addEventListener("click", () => {
    div.classList.toggle("completed");
  });

  container.appendChild(div);
});
