import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    title: "SadakSathi",
    dashboard: "Dashboard",
    analytics: "Analytics",
    reports: "Reports",
    allDistricts: "All Districts",
    severity: "Severity",
    status: "Status",
    search: "Search by ID or District...",
    totalReports: "Total Reports",
    resolvedReports: "Resolved Reports",
    activeClusters: "Active Clusters",
    criticalAlerts: "Critical Alerts",
    latestReports: "Latest Reports",
    noReports: "No reports found matching filters.",
    loading: "Loading...",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    pending: "Pending",
    inProgress: "In Progress",
    resolved: "Resolved",
    critical: "Critical",
    high: "High",
    medium: "Medium",
    low: "Low",
    reportId: "Report ID",
    location: "Location",
    date: "Date Reported",
    clusterId: "Cluster ID"
  },
  ne: {
    title: "सडकसाथी",
    dashboard: "ड्यासबोर्ड",
    analytics: "तथ्याङ्क",
    reports: "रिपोर्टहरू",
    allDistricts: "सबै जिल्लाहरू",
    severity: "गम्भीरता",
    status: "अवस्था",
    search: "ID वा जिल्ला खोज्नुहोस्...",
    totalReports: "कुल रिपोर्टहरू",
    resolvedReports: "समाधान भएका रिपोर्टहरू",
    activeClusters: "सक्रिय क्लस्टरहरू",
    criticalAlerts: "गम्भीर अलर्टहरू",
    latestReports: "भर्खरका रिपोर्टहरू",
    noReports: "फिल्टरसँग मेल खाने कुनै रिपोर्ट फेला परेन।",
    loading: "लोड हुँदैछ...",
    language: "भाषा",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    pending: "बाँकी",
    inProgress: "कार्य प्रगतिमा",
    resolved: "समाधान भयो",
    critical: "अति गम्भीर",
    high: "उच्च",
    medium: "मध्यम",
    low: "न्यून",
    reportId: "रिपोर्ट ID",
    location: "स्थान",
    date: "रिपोर्ट गरिएको मिति",
    clusterId: "क्लस्टर ID"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
