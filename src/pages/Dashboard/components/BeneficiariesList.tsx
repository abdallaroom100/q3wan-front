import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Dashboard.module.css";
import { Beneficiary, Housemate, IncomeSource } from "../types";
import { useGetCurrentAdminTasks } from "../hooks/useGetCurrentAdminTasks";

const mockBeneficiaries: Beneficiary[] = [
  {
    id: "1",
    firstName: "أحمد",
    secondName: "محمد",
    thirdName: "علي",
    lastName: "الصمد",
    fullName: "أحمد محمد علي الصمد",
    email: "ahmad@email.com",
    identityNumber: "1030304050",
    nationality: "سعودي",
    gender: "ذكر",
    phone: "0501234567",
    birthDate: "15/03/1985",
    dateType: "ميلادي",
    maritalStatus: "متزوج",
    idImagePath: "/img/logo.png",
    cityOfResidence: "الرياض",
    district: "حي الياسمين",
    housingType: "ملك",
    jobStatus: "موظف",
    healthStatus: "سليم",
    bankName: "البنك الأهلي السعودي",
    ibanImage: "/img/logo.png",
    numberOfFacilities: 2,
    numberOfMales: 1,
    housemates: [
      {
        name: "أسماء علي الصمد",
        birthDate: "20/05/1990",
        identityNumber: "1030304051",
        gender: "أنثى",
        kinship: "زوجة",
        studyLevel: "جامعي",
        healthStatus: "سليم",
        dateType: "ميلادي"
      },
      {
        name: "سالم محمد الصمد",
        birthDate: "10/08/2015",
        identityNumber: "1030304052",
        gender: "ذكر",
        kinship: "ابن",
        studyLevel: "ابتدائي",
        healthStatus: "سليم",
        dateType: "ميلادي"
      }
    ],
    incomeSources: [
      {
        sourceType: "راتب وظيفي",
        sourceAmount: "8000",
        sourceImage: "/img/logo.png"
      },
      {
        sourceType: "عمل إضافي",
        sourceAmount: "2000",
        sourceImage: "/img/logo.png"
      }
    ],
    requestDate: "12 يونيو 2025",
    status: "pending",
    companions: "أسماء علي - زوجة، سالم محمد - ابن"
  },
  {
    id: "2",
    firstName: "نورة",
    secondName: "عبدالله",
    thirdName: "محمد",
    lastName: "العنزي",
    fullName: "نورة عبدالله محمد العنزي",
    email: "noura@email.com",
    identityNumber: "1076543210",
    nationality: "سعودية",
    gender: "أنثى",
    phone: "0551234567",
    birthDate: "22/07/1988",
    dateType: "ميلادي",
    maritalStatus: "متزوجة",
    idImagePath: "/img/logo.png",
    cityOfResidence: "جدة",
    district: "حي الشاطئ",
    housingType: "إيجار",
    rentAmount: "3000",
    rentContractFile: "/img/logo.png",
    jobStatus: "عاطل",
    healthStatus: "غير سليم",
    disabilityType: "مريض",
    bankName: "بنك الراجحي",
    ibanImage: "/img/logo.png",
    numberOfFacilities: 3,
    numberOfMales: 2,
    housemates: [
      {
        name: "محمد العنزي",
        birthDate: "05/01/1985",
        identityNumber: "1076543211",
        gender: "ذكر",
        kinship: "زوج",
        studyLevel: "جامعي",
        healthStatus: "سليم",
        dateType: "ميلادي"
      },
      {
        name: "فاطمة العنزي",
        birthDate: "15/09/2012",
        identityNumber: "1076543212",
        gender: "أنثى",
        kinship: "ابنة",
        studyLevel: "متوسط",
        healthStatus: "سليم",
        dateType: "ميلادي"
      }
    ],
    incomeSources: [
      {
        sourceType: "مساعدة اجتماعية",
        sourceAmount: "1500",
        sourceImage: "/img/logo.png"
      }
    ],
    requestDate: "06 يونيو 2025",
    status: "rejected",
    companions: "محمد العنزي - زوج، فاطمة العنزي - ابنة"
  },
  {
    id: "3",
    firstName: "سعاد",
    secondName: "علي",
    thirdName: "عبدالله",
    lastName: "المطيري",
    fullName: "سعاد علي عبدالله المطيري",
    email: "suaad@email.com",
    identityNumber: "1099931122",
    nationality: "سعودية",
    gender: "أنثى",
    phone: "0533334444",
    birthDate: "30/11/1992",
    dateType: "ميلادي",
    maritalStatus: "متزوجة",
    idImagePath: "/img/logo.png",
    cityOfResidence: "الدمام",
    district: "حي الشاطئ",
    housingType: "ملك",
    jobStatus: "موظف",
    healthStatus: "سليم",
    bankName: "البنك السعودي الفرنسي",
    ibanImage: "/img/logo.png",
    numberOfFacilities: 1,
    numberOfMales: 1,
    housemates: [
      {
        name: "عبدالله المطيري",
        birthDate: "12/04/1988",
        identityNumber: "1099931123",
        gender: "ذكر",
        kinship: "زوج",
        studyLevel: "جامعي",
        healthStatus: "سليم",
        dateType: "ميلادي"
      }
    ],
    incomeSources: [
      {
        sourceType: "راتب وظيفي",
        sourceAmount: "6000",
        sourceImage: "/img/logo.png"
      }
    ],
    requestDate: "10 يونيو 2025",
    status: "approved",
    companions: "عبدالله المطيري - زوج"
  }
];

interface BeneficiariesListProps {
  onSelectBeneficiary?: (beneficiary: Beneficiary) => void;
  selectedBeneficiary?: Beneficiary | null;
}

const BeneficiariesList = ({ onSelectBeneficiary, selectedBeneficiary }: BeneficiariesListProps) => {
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState("2025-06-12");
  const [searchYear, setSearchYear] = useState("");
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState(mockBeneficiaries);
  

  //  useGetCurrentAdminTasks()
  const handleSearch = () => {
    // هنا يمكن إضافة منطق البحث حسب التاريخ والسنة
    console.log("Searching with date:", searchDate, "and year:", searchYear);
  };

  const handleBeneficiaryClick = (beneficiary: Beneficiary) => {
    // الانتقال لصفحة تفاصيل المستفيد
    navigate(`/beneficiary/${beneficiary.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      case "pending":
        return styles.statusPending;
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "مقبول";
      case "rejected":
        return "مرفوض";
      case "pending":
        return "قيد المراجعة";
      default:
        return "غير محدد";
    }
  };

  return (
    <div className={styles.beneficiariesContainer}>
      {/* شريط البحث */}
      <div className={styles.searchBar}>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="number"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          placeholder="السنة"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          🔍 بحث
        </button>
      </div>

      {/* قائمة المستفيدين */}
      <section className={styles.beneficiariesSection}>
        <h2 className={styles.sectionTitle}>قائمة المستفيدين</h2>
        <div className={styles.beneficiariesGrid}>
          {filteredBeneficiaries.map((beneficiary) => (
            <div
              key={beneficiary.id}
              className={styles.beneficiaryCard}
              onClick={() => handleBeneficiaryClick(beneficiary)}
            >
              <div className={styles.beneficiaryInfo}>
                <img
                  src={beneficiary.idImagePath}
                  alt={beneficiary.fullName}
                  className={styles.beneficiaryImage}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/img/logo.png";
                  }}
                />
                <div className={styles.beneficiaryDetails}>
                  <h3 className={styles.beneficiaryName}>{beneficiary.fullName}</h3>
                  <p className={styles.beneficiaryId}>رقم الهوية: {beneficiary.identityNumber}</p>
                  <p className={styles.beneficiaryDate}>تاريخ الطلب: {beneficiary.requestDate}</p>
                  <span className={`${styles.statusBadge} ${getStatusColor(beneficiary.status)}`}>
                    {getStatusText(beneficiary.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BeneficiariesList; 