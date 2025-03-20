import React from "react";

const ResumePreview = ({ formData, photoPreview, setShowPreview }) => {
  // Helper function to check if a skill category has any non-empty values
  const hasSkills = (category) => {
    return formData.technicalSkills[category].some(
      (skill) => skill.trim() !== ""
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white max-w-4xl w-full mx-auto p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold uppercase">
              {formData.personalInfo.fullName || "YOUR NAME"}
            </h1>
            <p className="text-sm mt-1">
              {formData.personalInfo.address || "Your Address"}
            </p>
            <p className="text-sm">
              {formData.personalInfo.phone || "Your Phone"}
            </p>
            <p className="text-sm">
              {formData.personalInfo.email || "Your Email"}
            </p>
            <p className="text-sm">
              {formData.personalInfo.github || "Your GitHub"}
            </p>
          </div>
          <div className="w-32 h-40 bg-gray-200 flex items-center justify-center">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm text-center">Photo</span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-2">Objectives</h2>
          <p className="text-sm">
            {formData.objective || "Your career objectives will appear here."}
          </p>
        </section>

        <div className="border-t border-gray-300 my-4"></div>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-2">Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{edu.school || "School Name"}</h3>
                  <p className="text-sm">
                    {edu.degree || "Degree"} – {edu.major || "Major"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{edu.location || "Location"}</p>
                  <p className="text-sm">{edu.period || "Period"}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="border-t border-gray-300 my-4"></div>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-2">Work Experience</h2>
          {formData.workExperience.map((work, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{work.company || "Company Name"}</h3>
                <p className="text-sm">{work.period || "Period"}</p>
              </div>
              <p className="font-semibold mb-1">{work.title || "Position"}</p>
              <ul className="list-disc pl-5">
                {work.responsibilities.map((resp, rIndex) => (
                  <li key={rIndex} className="text-sm">
                    {resp || "Responsibility"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="border-t border-gray-300 my-4"></div>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-2">Skills</h2>

          {/* Programming Languages */}
          {hasSkills("programmingLanguage") && (
            <div className="mb-3">
              <h3 className="font-semibold">Programming Languages:</h3>
              <p className="text-sm">
                {formData.technicalSkills.programmingLanguage
                  .filter((skill) => skill.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Web Technologies */}
          {hasSkills("webTechnologies") && (
            <div className="mb-3">
              <h3 className="font-semibold">Web Technologies:</h3>
              <p className="text-sm">
                {formData.technicalSkills.webTechnologies
                  .filter((tech) => tech.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Developer Tools */}
          {hasSkills("developerTools") && (
            <div className="mb-3">
              <h3 className="font-semibold">Developer Tools:</h3>
              <p className="text-sm">
                {formData.technicalSkills.developerTools
                  .filter((tool) => tool.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Languages */}
          {hasSkills("languages") && (
            <div className="mb-3">
              <h3 className="font-semibold">Languages:</h3>
              <p className="text-sm">
                {formData.technicalSkills.languages
                  .filter((lang) => lang.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Soft Skills */}
          {hasSkills("softSkills") && (
            <div className="mb-3">
              <h3 className="font-semibold">Soft Skills:</h3>
              <p className="text-sm">
                {formData.technicalSkills.softSkills
                  .filter((skill) => skill.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Industry Knowledge */}
          {hasSkills("industryKnowledge") && (
            <div className="mb-3">
              <h3 className="font-semibold">Industry Knowledge:</h3>
              <p className="text-sm">
                {formData.technicalSkills.industryKnowledge
                  .filter((knowledge) => knowledge.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Tools & Software */}
          {hasSkills("tools") && (
            <div className="mb-3">
              <h3 className="font-semibold">Tools & Software:</h3>
              <p className="text-sm">
                {formData.technicalSkills.tools
                  .filter((tool) => tool.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}

          {/* Certifications */}
          {hasSkills("certifications") && (
            <div className="mb-3">
              <h3 className="font-semibold">Certifications:</h3>
              <p className="text-sm">
                {formData.technicalSkills.certifications
                  .filter((cert) => cert.trim() !== "")
                  .join(", ")}
              </p>
            </div>
          )}
        </section>

        <div className="border-t border-gray-300 my-4"></div>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-2">References</h2>
          {formData.references.map((ref, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{ref.name || "Reference Name"}</h3>
              <p className="text-sm">{ref.title || "Title"}</p>
              <p className="text-sm">{ref.institution || "Institution"}</p>
              <p className="text-sm">Email: {ref.email || "Email"}</p>
              <p className="text-sm">Phone: {ref.phone || "Phone"}</p>
              <p className="text-sm">{ref.address || "Address"}</p>
            </div>
          ))}
        </section>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowPreview(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
