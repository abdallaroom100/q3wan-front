import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import BeneficiariesList from "./components/BeneficiariesList";
import Reports from "./components/Reports";
import EditReports from "./components/EditReports";
import Settings from "./components/Settings";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("beneficiaries");

//   useEffect(() => {
//     if (localStorage.getItem("isAdmin") !== "true") {
//       navigate("/admin-login");
//     }
//   }, [navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "beneficiaries":
        return <BeneficiariesList />;
      case "reports":
        return <Reports />;
      case "editReports":
        return <EditReports />;
      case "settings":
        return <Settings />;
      default:
        return <BeneficiariesList />;
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <button 
            className={`${styles.navButton} ${activeTab === "beneficiaries" ? styles.active : ""}`}
            onClick={() => setActiveTab("beneficiaries")}
          >
            المستفيدين
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === "reports" ? styles.active : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            التقارير
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === "editReports" ? styles.active : ""}`}
            onClick={() => setActiveTab("editReports")}
          >
            تعديل التقارير
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === "settings" ? styles.active : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            الإعدادات
          </button>
          <button 
            className={styles.navButton}
            onClick={() => {
          
            }}
          >
            تسجيل الخروج
          </button>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard; 