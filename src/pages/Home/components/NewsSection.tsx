const NewsSection = () => (
  <section className="new-section">
    <div className="container">
      <h2 className="section-title">احدث الاخبار </h2>
      <div className="cards">
        {[
          {
            img: "img/SLID 3.jpg",
            title: "تقرير الثلث الأول من عام 2025",
            text: "عطاؤكم حياة لأكثر من 500 أسرة...",
          },
          {
            img: "img/SLID 2.jpg",
            title: "نتائج قياس رضا المستفيدين",
            text: "أعلنت الجمعية عن نتائج قياس رضا...",
          },
          {
            img: "img/SLID Q.jpg",
            title: "صرف احتياجات شهر مايو",
            text: "في إطار دعم الأسر المكفولة...",
          },
        ].map(({ img, title, text }, i) => (
          <div className="card" key={i}>
            <img src={img} alt={`خبر ${i + 1}`} />
            <div className="card-content">
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
