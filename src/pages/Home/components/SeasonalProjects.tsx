import ProjectCard from "../../../components/cards";

const seasonalProjects = [
  {
    img: "img/SLID 2.jpg",
    title: "مشروع رقم 1",
    desc: "وصف مختصر عن المشروع يوضح فكرته وأهدافه بطريقة بسيطة."
  },
  {
    img: "img/SLID Q.jpg",
    title: "مشروع رقم 1",
    desc: "وصف مختصر عن المشروع يوضح فكرته وأهدافه بطريقة بسيطة."
  },
  {
    img: "img/كارد 1.png",
    title: "مشروع رقم 1",
    desc: "وصف مختصر عن المشروع يوضح فكرته وأهدافه بطريقة بسيطة."
  }
];

const SeasonalProjectsSection = () => (
  <section className="projects-section ">
    <h2 className="my-section-title !mb-12">مشاريعنا </h2>
    {/* <div className="projects-grid">
      {seasonalProjects.map(({ img, title, desc }, i) => (
        <div className="project-card" key={i}>
          <img src={img} alt="صورة المشروع" />
          <div className="card-content">
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href="#" className="card-btn">اعرف أكثر</a>
          </div>
        </div>
      ))}
    </div> */}
 <ProjectCard />
    <div className="show-more-container">
      {/* <button id="show-more-btn">عرض جميع المشاريع</button> */}
    </div>
  </section>
);

export default SeasonalProjectsSection;
