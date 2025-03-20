import React, { useRef } from "react";
import { usePDF } from "react-to-pdf";

const ResumePreview = ({ formData, photoPreview, onClose }) => {
  const targetRef = useRef(null);
  const { toPDF, targetRef: pdfRef } = usePDF({
    filename: `${formData.personalInfo.fullName || "Resume"}.pdf`,
    page: {
      format: "a4",
      orientation: "portrait",
      margin: 0,
    },
    method: "save",
  });

  const handleDownloadPDF = async () => {
    try {
      await toPDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div ref={pdfRef} style={{ backgroundColor: "white" }}>
          <style>
            {`
              @page {
                margin: 0;
                size: A4;
              }
              
              .resume-content {
                width: 210mm;
                min-height: 297mm;
                padding: 15mm;
                margin: 0 auto;
                font-family: 'Helvetica', 'Arial', sans-serif;
                line-height: 1.6;
                color: #2d3748;
                box-sizing: border-box;
                background-color: white;
                position: relative;
              }

              .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 6mm;
                border-bottom: 2px solid #000000;
                padding-bottom: 6mm;
              }

              .personal-info h1 {
                font-size: 24pt;
                font-weight: 700;
                margin-bottom: 3mm;
                color: #1a202c;
                letter-spacing: 0.5px;
              }

              .personal-info p {
                font-size: 10pt;
                margin-bottom: 1.5mm;
                color: #4a5568;
                line-height: 1.4;
              }

              .section-title {
                font-size: 14pt;
                font-weight: 700;
                color: #2d3748;
                margin-bottom: 4mm;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 2mm;
              }

              .section {
                margin-bottom: 6mm;
                page-break-inside: avoid;
              }

              .education-item {
                margin-bottom: 4mm;
              }

              .education-item h3 {
                font-size: 11pt;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 1mm;
              }

              .education-item p {
                font-size: 10pt;
                margin-bottom: 1mm;
                color: #4a5568;
              }

              .experience-item {
                margin-bottom: 5mm;
                page-break-inside: avoid;
              }

              .experience-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 2mm;
              }

              .experience-title {
                font-weight: 600;
                font-size: 11pt;
                color: #2d3748;
              }

              .experience-period {
                font-size: 10pt;
                color: #718096;
              }

              .responsibilities {
                list-style-type: disc;
                margin-left: 5mm;
                margin-top: 2mm;
              }

              .responsibilities li {
                font-size: 10pt;
                margin-bottom: 1mm;
                color: #4a5568;
                line-height: 1.4;
              }

              .photo-container {
                width: 35mm;
                height: 45mm;
                overflow: hidden;
                border: 1px solid #e2e8f0;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }

              .photo-container img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }

              .skills-section {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 5mm;
                margin-top: 3mm;
              }

              .skill-item {
                margin-bottom: 3mm;
              }

              .skill-title {
                font-weight: 600;
                font-size: 10pt;
                margin-bottom: 1mm;
                color: #2d3748;
              }

              .skill-list {
                font-size: 10pt;
                color: #4a5568;
                line-height: 1.4;
              }

              .reference-item {
                margin-bottom: 4mm;
                padding: 3mm;
                background: #f7fafc;
                border-radius: 2mm;
              }

              .reference-item h3 {
                font-size: 11pt;
                font-weight: 600;
                margin-bottom: 1mm;
                color: #2d3748;
              }

              .reference-item p {
                font-size: 10pt;
                margin-bottom: 1mm;
                color: #4a5568;
                line-height: 1.4;
              }

              .location-text {
                font-style: italic;
                text-align: right;
                font-size: 10pt;
                color: #718096;
              }

              @media print {
                .resume-content {
                  width: 210mm;
                  min-height: 297mm;
                  padding: 15mm;
                  margin: 0;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            `}
          </style>

          <div className="resume-content">
            <div className="header">
              <div className="personal-info">
                <h1>{formData.personalInfo.fullName}</h1>
                <p>{formData.personalInfo.address}</p>
                <p>{formData.personalInfo.phone}</p>
                <p>{formData.personalInfo.email}</p>
                <p>{formData.personalInfo.github}</p>
              </div>
              {photoPreview && (
                <div className="photo-container">
                  <img src={photoPreview} alt="Profile" />
                </div>
              )}
            </div>

            <div className="section">
              <h2 className="section-title">Objectives</h2>
              <p style={{ fontSize: "12px" }}>{formData.objective}</p>
            </div>

            <div className="section">
              <h2 className="section-title">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <h3>{edu.school}</h3>
                      <p>
                        {edu.degree} - {edu.major}
                      </p>
                    </div>
                    <p className="location-text">
                      {edu.location}
                      <br />
                      {edu.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="section">
              <h2 className="section-title">Work Experience</h2>
              {formData.workExperience.map((work, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <span className="experience-title">{work.company}</span>
                    <span className="experience-period">{work.period}</span>
                  </div>
                  <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {work.title}
                  </p>
                  <ul className="responsibilities">
                    {work.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="section">
              <h2 className="section-title">Technical Skills</h2>
              <div className="skills-section">
                {Object.entries(formData.technicalSkills).map(
                  ([key, value]) => {
                    if (
                      Array.isArray(value) &&
                      value.some((item) => item.trim() !== "")
                    ) {
                      return (
                        <div key={key} className="skill-item">
                          <div className="skill-title">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </div>
                          <div className="skill-list">
                            {value
                              .filter((item) => item.trim() !== "")
                              .join(", ")}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }
                )}
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">References</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {formData.references.map((ref, index) => (
                  <div key={index} className="reference-item">
                    <h3>{ref.name}</h3>
                    <p>{ref.title}</p>
                    <p>{ref.institution}</p>
                    <p>Email: {ref.email}</p>
                    <p>Phone: {ref.phone}</p>
                    <p>{ref.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
