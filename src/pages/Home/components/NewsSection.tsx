import styles from "./NewsSection.module.css";

const NewsSection = () => (
  <section className={styles.newsSection}>
    <div className={styles.container}>
      {/* <h2 className={styles.sectionTitle + ' ' + styles.centerTitle}>احدث الاخبار </h2> */}
      <h2 className="my-section-title !text-3xl md:!text-4xl !mb-12 text-center mx-auto !flex !justify-center !items-center !w-fit"> أحدث الأخبار </h2>
      <div className={styles.cards} style={{direction:"rtl"}}>
        {[
          {
            img: "/img/q3wan1.jpg",
            title: " نبادر بالأضاحي.. لنرسم فرحة العيد" ,
            text: "",
          },
          {
            img: "/img/q3wan2.jpg",
            title: "سخاؤكم جعل صيفهم أطيب",
            text: "",
          },
          {
            img: "/img/q3wan3.jpg",
            title: "شكرًا لمن سعى وشكرًا لمن دعم",
            text: "",
          },
        ].map(({ img, title, text }, i) => (
          <div className={styles.card} key={i}>
            <span className={styles.badge}>جديد</span>
            <img className={styles.cardImg} src={img} alt={`خبر ${i + 1}`} />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle + ' ' + styles.centerCardTitle}>{title}</h2>
              <p className={styles.cardText + ' ' + styles.centerCardText}>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
