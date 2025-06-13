import { useState, useRef, useEffect } from "react";
import styles from "./SignFamily.module.css";
import hotToast from "../../common/hotToast";
import useUpdateUserData from "../../hooks/Auth/update/useUpdateUserData";
import React from "react";
import { FaUser, FaHome, FaUsers } from 'react-icons/fa';
import ProgressSteps from '../../components/ProgressSteps';

const steps = ["البيانات الشخصية", "السكن", "المنزل والمرافقين"];

type Housemate = {
  name: string;
  birthDate: string;
  identityNumber: string;
  gender: "ذكر" | "أنثى";
  kinship: string;
};

type Home = {
  homeNickname: string;
  city: string;
  district: string;
  housemates: Housemate[];
  addtionalHomes?: {
    homeNickname: string;
    city: string;
    district: string;
    housemates: Housemate[];
  }[];
};

interface UserData {
  firstName: string;
  secondName: string;
  thirdName: string;
  lastName: string;
  email: string;
  identityNumber: string;
  nationality: string;
  gender: "ذكر" | "أنثى";
  phone: string;
  birthDate: string;
  maritalStatus: string;
  idImagePath: string;
  cityOfResidence: string;
  home: Home;
}

const SignFamily = ({
  userData,
}: {
  userData: UserData | undefined;
}) => {
  const {updateUserData} = useUpdateUserData()
  const [step, setStep] = useState(1);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState<UserData>({
    firstName: userData?.firstName || "",
    secondName: userData?.secondName || "",
    thirdName: userData?.thirdName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    identityNumber: userData?.identityNumber || "",
    nationality: userData?.nationality || "",
    gender: userData?.gender || "ذكر",
    phone: userData?.phone || "",
    birthDate: userData?.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : "",
    maritalStatus: userData?.maritalStatus || "",
    idImagePath: userData?.idImagePath || "",
    cityOfResidence: userData?.cityOfResidence || "",
    home: {
      homeNickname: userData?.home?.homeNickname || "",
      city: userData?.home?.city || "",
      district: userData?.home?.district || "",
      housemates: userData?.home?.housemates?.map((housemate: Housemate) => ({
        name: housemate.name || "",
        identityNumber: housemate.identityNumber || "",
        birthDate: housemate.birthDate ? new Date(housemate.birthDate).toISOString().split('T')[0] : "",
        gender: housemate.gender || "ذكر",
        kinship: housemate.kinship || ""
      })) || [],
      addtionalHomes: userData?.home?.addtionalHomes?.map((home: Home) => ({
        homeNickname: home.homeNickname || "",
        city: home.city || "",
        district: home.district || "",
        housemates: home.housemates?.map((housemate: Housemate) => ({
          name: housemate.name || "",
          identityNumber: housemate.identityNumber || "",
          birthDate: housemate.birthDate ? new Date(housemate.birthDate).toISOString().split('T')[0] : "",
          gender: housemate.gender || "ذكر",
          kinship: housemate.kinship || ""
        })) || []
      })) || []
    }
  });

  const formContainerRef = useRef<HTMLDivElement>(null);
  const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);

  const stepIcons = [<FaUser />, <FaHome />, <FaUsers />];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async () => {
    // التحقق من البيانات
    for (let [key, value] of Object.entries(formData)) {
      if (key !== "home") {
        if (value === "") {
          hotToast({ type: "error", message: "يجب عليك إدخال جميع البيانات" });
          return;
        }
      } else {
        if (!value.homeNickname || !value.city || !value.district) {
          hotToast({ type: "error", message: "يجب عليك إدخال جميع البيانات" });
          return;
        }
        if (value.housemates.length === 0) {
          hotToast({
            type: "error",
            duration: 1500,
            message: "يجب ان يكون لديك علي الاقل مرافق واحد في المنزل الاساسي",
          });
          return;
        } else {
          for (let i of value.housemates) {
            if (
              !i.name ||
              !i.identityNumber ||
              !i.birthDate ||
              !i.gender ||
              !i.kinship
            ) {
              hotToast({
                type: "error",
                duration: 1500,
                message: "بيانات المرافق المدخلة غير كاملة",
              });
              return;
            }
          }
        }
      }
    }

    // إنشاء FormData وإضافة البيانات
    const formDataToSend = new FormData();

    // إضافة البيانات الأساسية
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'home') {
        // تحويل بيانات المنزل إلى JSON string
        formDataToSend.append('home', JSON.stringify(value));
      } else if (key === 'idImagePath' && value instanceof File) {
        // إضافة ملف صورة الهوية
        formDataToSend.append('idImagePath', value);
      } else {
        // إضافة باقي البيانات كنص
        formDataToSend.append(key, value as string);
      }
    });

    try {
      const result = await updateUserData(formDataToSend);
      if (result.success) {
        hotToast({ type: "success", message: result.message });
        // يمكنك إضافة إعادة التوجيه هنا إذا كنت تريد
      } else {
        hotToast({ type: "error", message: result.error });
      }
    } catch (error) {
      hotToast({ type: "error", message: "حدث خطأ أثناء تحديث البيانات" });
    }
  };
  // تحديث البيانات
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file" && e.target instanceof HTMLInputElement) {
      const input = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: input.files && input.files[0] ? input.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    setAnimDir("right");
    setStep((s) => Math.min(s + 1, 3));
  };
  const handleBack = () => {
    setAnimDir("left");
    setStep((s) => Math.max(s - 1, 1));
  };

  // محتوى كل خطوة
  const renderStep = () => {
    if (step === 1) {
      return (
        <div className={styles.card}>
          <h2 className={styles.title}>البيانات الأساسية</h2>
          {isMobile && (
            <div className="mb-6" style={{ textAlign: 'center' }}>
              <ProgressSteps step={step} steps={steps} isMobile={isMobile} stepIcons={stepIcons} />
            </div>
          )}
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>الاسم الأول</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>الاسم الثاني</label>
              <input
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>الاسم الثالث</label>
              <input
                name="thirdName"
                value={formData.thirdName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>اسم العائلة</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>الجنس</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="ذكر"
                    checked={formData.gender === "ذكر"}
                    onChange={handleChange}
                  />{" "}
                  ذكر
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="أنثى"
                    checked={formData.gender === "أنثى"}
                    onChange={handleChange}
                  />{" "}
                  أنثى
                </label>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>الجنسية</label>
              <input
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>رقم الهوية</label>
              <input
                name="identityNumber"
                value={formData.identityNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>ارفاق صورة الهوية</label>
              <input type="file" name="idImagePath" onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>الحالة الاجتماعية</label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">اختر الحالة الاجتماعية</option>
                <option value="single">أعزب</option>
                <option value="married">متزوج</option>
                <option value="divorced">مطلق</option>
                <option value="widow">أرمل</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>تاريخ الميلاد</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>رقم الجوال</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className={styles.card}>
          <h2 className={styles.title}>بيانات السكن</h2>
          {isMobile && (
            <div className="mb-6" style={{ textAlign: 'center' }}>
              <ProgressSteps step={step} steps={steps} isMobile={isMobile} stepIcons={stepIcons} />
            </div>
          )}
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label>مدينة سكنك</label>
              <input
                name="cityOfResidence"
                value={formData.cityOfResidence}
                onChange={handleChange}
                placeholder="ما هي مدينة سكنك الحالية؟"
              />
            </div>
            <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
              <label>مواليد هذه المدينة</label>
              <select name="bornInSameCity" onChange={handleChange}>
                <option value="">هل ولدت في نفس المدينة التي تسكن فيها؟</option>
                <option value="yes">نعم</option>
                <option value="no">لا</option>
              </select>
            </div>
          </div>
        </div>
      );
    }
    if (step === 3) {
      return (
        <div>
          <div className={styles.card}>
            <h2 className={styles.title}>البيانات الرئيسية للمنزل</h2>
            {isMobile && (
              <div className="mb-6" style={{ textAlign: 'center' }}>
                <ProgressSteps step={step} steps={steps} isMobile={isMobile} stepIcons={stepIcons} />
              </div>
            )}
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label>الاسم المستعار للمنزل</label>
                <input
                  name="homeNickname"
                  value={formData.home.homeNickname}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      home: { ...formData.home, homeNickname: e.target.value },
                    });
                  }}
                  placeholder="مثال: منزل العائلة"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>المدينة</label>
                <input
                  name="city"
                  value={formData.home.city}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      home: { ...formData.home, city: e.target.value },
                    });
                  }}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>الحي</label>
                <input
                  name="district"
                  value={formData.home.district}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      home: { ...formData.home, district: e.target.value },
                    });
                  }}
                />
              </div>
            </div>
            {/* زر إضافة مرافقين */}
            <div style={{ margin: "16px 0", textAlign: "left" }}>
              <button
                className={styles.addBtn}
                type="button"
                onClick={() => {
                  const home = { ...formData.home };
                  home.housemates = home.housemates || [];
                  home.housemates.push({
                    name: "",
                    identityNumber: "",
                    birthDate: "",
                    gender: "ذكر",
                    kinship: "",
                  });
                  setFormData({ ...formData, home });
                }}
              >
                + إضافة مرافقين يعيشون في هذا المنزل
              </button>
            </div>
            {/* جدول المرافقين */}
            {formData.home.housemates &&
              formData.home.housemates.length > 0 && (
                <div className={styles.companionTable}>
                  <div className={styles.companionHeader}>
                    <span>الاسم</span>
                    <span>رقم الهوية</span>
                    <span>تاريخ الميلاد</span>
                    <span>الجنس</span>
                    <span>صلة القرابة</span>
                    <span>إجراءات</span>
                  </div>
                  {formData.home.housemates.map((housemate, idx) => (
                    <div className={styles.companionRow} key={idx}>
                      <input
                        value={housemate.name}
                        placeholder="الاسم"
                        onChange={(e) => {
                          const home = { ...formData.home };
                          home.housemates[idx].name = e.target.value;
                          setFormData({ ...formData, home });
                        }}
                      />
                      <input
                        value={housemate.identityNumber}
                        placeholder="رقم الهوية"
                        onChange={(e) => {
                          const home = { ...formData.home };
                          home.housemates[idx].identityNumber = e.target.value;
                          setFormData({ ...formData, home });
                        }}
                      />
                      <input
                        type="date"
                        value={housemate.birthDate}
                        onChange={(e) => {
                          const home = { ...formData.home };
                          home.housemates[idx].birthDate = e.target.value;
                          setFormData({ ...formData, home });
                        }}
                      />
                      <select
                        value={housemate.gender}
                        onChange={(e) => {
                          const home = { ...formData.home };
                          home.housemates[idx].gender = e.target.value as
                            | "ذكر"
                            | "أنثى";
                          setFormData({ ...formData, home });
                        }}
                      >
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                      </select>
                      <input
                        value={housemate.kinship}
                        placeholder="صلة القرابة"
                        onChange={(e) => {
                          const home = { ...formData.home };
                          home.housemates[idx].kinship = e.target.value;
                          setFormData({ ...formData, home });
                        }}
                      />
                      <button
                        className={styles.deleteBtn}
                        type="button"
                        title="حذف المرافق"
                        onClick={() => {
                          const home = { ...formData.home };
                          home.housemates.splice(idx, 1);
                          setFormData({ ...formData, home });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>
          {/* زر إضافة منزل آخر */}
          <div style={{ textAlign: "left", marginTop: 12 }}>
            <button
              className={styles.addBtn}
              type="button"
              onClick={() => {
                const home = { ...formData.home };
                home.addtionalHomes = home.addtionalHomes || [];
                home.addtionalHomes.push({
                  homeNickname: "",
                  city: "",
                  district: "",
                  housemates: [],
                });
                setFormData({ ...formData, home });
              }}
            >
              + إضافة منزل آخر
            </button>
          </div>
          {/* عرض المنازل الإضافية */}
          {formData.home.addtionalHomes &&
            formData.home.addtionalHomes.map((additionalHome, idx) => (
              <div className={styles.card} key={idx} style={{ marginTop: 24 }}>
                <button
                  className={styles.houseDeleteBtn}
                  type="button"
                  title="حذف المنزل"
                  onClick={() => {
                    const home = { ...formData.home };
                    home.addtionalHomes?.splice(idx, 1);
                    setFormData({ ...formData, home });
                  }}
                >
                  ×
                </button>
                <h2 className={styles.title}>منزل إضافي {idx + 1}</h2>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label>الاسم المستعار للمنزل</label>
                    <input
                      value={additionalHome.homeNickname}
                      onChange={(e) => {
                        const home = { ...formData.home };
                        if (home.addtionalHomes) {
                          home.addtionalHomes[idx].homeNickname =
                            e.target.value;
                          setFormData({ ...formData, home });
                        }
                      }}
                      placeholder="مثال: منزل العائلة"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>المدينة</label>
                    <input
                      value={additionalHome.city}
                      onChange={(e) => {
                        const home = { ...formData.home };
                        if (home.addtionalHomes) {
                          home.addtionalHomes[idx].city = e.target.value;
                          setFormData({ ...formData, home });
                        }
                      }}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>الحي</label>
                    <input
                      value={additionalHome.district}
                      onChange={(e) => {
                        const home = { ...formData.home };
                        if (home.addtionalHomes) {
                          home.addtionalHomes[idx].district = e.target.value;
                          setFormData({ ...formData, home });
                        }
                      }}
                    />
                  </div>
                </div>
                {/* زر إضافة مرافقين للمنزل الإضافي */}
                <div style={{ margin: "16px 0", textAlign: "left" }}>
                  <button
                    className={styles.addBtn}
                    type="button"
                    onClick={() => {
                      const home = { ...formData.home };
                      if (home.addtionalHomes) {
                        home.addtionalHomes[idx].housemates =
                          home.addtionalHomes[idx].housemates || [];
                        home.addtionalHomes[idx].housemates.push({
                          name: "",
                          identityNumber: "",
                          birthDate: "",
                          gender: "ذكر",
                          kinship: "",
                        });
                        setFormData({ ...formData, home });
                      }
                    }}
                  >
                    + إضافة مرافقين يعيشون في هذا المنزل
                  </button>
                </div>
                {/* جدول المرافقين للمنزل الإضافي */}
                {additionalHome.housemates &&
                  additionalHome.housemates.length > 0 && (
                    <div className={styles.companionTable}>
                      <div className={styles.companionHeader}>
                        <span>الاسم</span>
                        <span>رقم الهوية</span>
                        <span>تاريخ الميلاد</span>
                        <span>الجنس</span>
                        <span>صلة القرابة</span>
                        <span>إجراءات</span>
                      </div>
                      {additionalHome.housemates.map((housemate, hIdx) => (
                        <div className={styles.companionRow} key={hIdx}>
                          <input
                            value={housemate.name}
                            placeholder="الاسم"
                            onChange={(e) => {
                              const home = { ...formData.home };
                              if (home.addtionalHomes) {
                                home.addtionalHomes[idx].housemates[hIdx].name =
                                  e.target.value;
                                setFormData({ ...formData, home });
                              }
                            }}
                          />
                          <input
                            value={housemate.identityNumber}
                            placeholder="رقم الهوية"
                            onChange={(e) => {
                              const home = { ...formData.home };
                              if (home.addtionalHomes) {
                                home.addtionalHomes[idx].housemates[
                                  hIdx
                                ].identityNumber = e.target.value;
                                setFormData({ ...formData, home });
                              }
                            }}
                          />
                          <input
                            type="date"
                            value={housemate.birthDate}
                            onChange={(e) => {
                              const home = { ...formData.home };
                              if (home.addtionalHomes) {
                                home.addtionalHomes[idx].housemates[
                                  hIdx
                                ].birthDate = e.target.value;
                                setFormData({ ...formData, home });
                              }
                            }}
                          />
                          <select
                            value={housemate.gender}
                            onChange={(e) => {
                              const home = { ...formData.home };
                              if (home.addtionalHomes) {
                                home.addtionalHomes[idx].housemates[
                                  hIdx
                                ].gender = e.target.value as "ذكر" | "أنثى";
                                setFormData({ ...formData, home });
                              }
                            }}
                          >
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                          </select>
                          <input
                            value={housemate.kinship}
                            placeholder="صلة القرابة"
                            onChange={(e) => {
                              const home = { ...formData.home };
                              if (home.addtionalHomes) {
                                home.addtionalHomes[idx].housemates[
                                  hIdx
                                ].kinship = e.target.value;
                                setFormData({ ...formData, home });
                              }
                            }}
                          />
                          <button
                            className={styles.deleteBtn}
                            type="button"
                            title="حذف المرافق"
                            onClick={() => {
                              const home = { ...formData.home };
                              if (home.addtionalHomes) {
                                home.addtionalHomes[idx].housemates.splice(
                                  hIdx,
                                  1
                                );
                                setFormData({ ...formData, home });
                              }
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
        </div>
      );
    }
  };

  return (
    <div className="lg:!mt-10  container mx-auto  lg:px-5" style={{ display: 'flex', direction: 'rtl', flexDirection: isMobile ? 'column' : 'row', alignItems: 'stretch', width: '100%', gap: '3rem' }}>
      {/* Progress Stepper */}
      <div className="flex flex-col items-center justify-start h-fit sticky top-[120px]" style={{ 
        width: isMobile ? '100%' : '350px', 
        minWidth: isMobile ? 'auto' : '350px', 
        padding: isMobile ? '1rem 0' : '2rem 0',
        display: isMobile ? 'none' : 'flex'
      }}>
        <a href="#" className="logo mb-12"><img alt="شعار الجمعية" src="img/logo.png" style={{ width: '180px' }}/></a>
        <div className={styles.progressSteps} style={{ height: '100%', justifyContent: 'flex-start', gap: '1.5rem' }}>
          {steps.map((label, idx) => (
            <React.Fragment key={label}>
              <div className={styles.progressStep} style={{ transform: 'scale(1.1)' }}>
                <div
                  className={
                    styles.progressCircle +
                    (step > idx + 1
                      ? ' ' + styles.completed
                      : step === idx + 1
                      ? ' ' + styles.active
                      : '')
                  }
                  style={{ width: '45px', height: '45px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {step > idx + 1 ? (
                    <span>&#10003;</span>
                  ) : (
                    React.cloneElement(stepIcons[idx], { style: { transform: 'scale(1.3)' } })
                  )}
                </div>
                <span className={styles.stepLabel} style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={
                    styles.stepConnector +
                    (step > idx + 1 ? ' ' + styles.completed : '')
                  }
                  style={{ height: '50px' }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Form Wrapper */}
      <div className={styles.wrapper} style={{ flex: 1 }}>
        {/* Steps with animation */}
        <div
          ref={formContainerRef}
          className={
            styles.animatedStep +
            " " +
            (animDir === "right" ? styles.slideInRight : styles.slideInLeft)
          }
          style={
            fixedHeight
              ? {
                  height: fixedHeight,
                  transition: "height 0.3s cubic-bezier(.4,2,.6,1)",
                }
              : {}
          }
        >
          {renderStep()}
        </div>
        {/* Navigation Buttons */}
        <div className={styles.buttonRow}>
          {step > 1 && (
            <button className={styles.navBtn} onClick={handleBack}>
              الرجوع
            </button>
          )}
          {step < 3 && (
            <button className={styles.navBtn} onClick={handleNext}>
              التالي
            </button>
          )}
          {step === 3 && (
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              type="submit"
            >
              تسجيل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignFamily;
