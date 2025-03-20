import React, { useState } from "react";
import ResumePreview from "../components/Home/ResumePreview";

const Home = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
      github: "",
      photo: null,
    },
    objective: "",
    education: [
      {
        school: "",
        degree: "",
        major: "",
        location: "",
        period: "",
      },
    ],
    workExperience: [
      {
        title: "",
        company: "",
        period: "",
        responsibilities: [""],
      },
    ],
    certifications: [""],
    technicalSkills: {
      programmingLanguage: [""],
      webTechnologies: [""],
      developerTools: [""],
      languages: [""],
      softSkills: [""],
      industryKnowledge: [""],
      tools: [""],
      certifications: [""],
      videoEditing: false,
      graphicDesign: false,
    },
    references: [
      {
        name: "",
        title: "",
        email: "",
        phone: "",
        institution: "",
        address: "",
      },
    ],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleAddItem = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], prev[section][0]],
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            photo: file,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value,
      };
      return {
        ...prev,
        education: newEducation,
      };
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.workExperience];
      newWorkExperience[index] = {
        ...newWorkExperience[index],
        [field]: value,
      };
      return {
        ...prev,
        workExperience: newWorkExperience,
      };
    });
  };

  const handleResponsibilityChange = (workIndex, respIndex, value) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.workExperience];
      newWorkExperience[workIndex].responsibilities[respIndex] = value;
      return {
        ...prev,
        workExperience: newWorkExperience,
      };
    });
  };

  const handleSkillChange = (category, index, value) => {
    setFormData((prev) => {
      const newSkills = { ...prev.technicalSkills };
      newSkills[category][index] = value;
      return {
        ...prev,
        technicalSkills: newSkills,
      };
    });
  };

  const handleAddSkill = (category) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: [...prev.technicalSkills[category], ""],
      },
    }));
  };

  const handleRemoveSkill = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      technicalSkills: {
        ...prev.technicalSkills,
        [category]: prev.technicalSkills[category].filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleReferenceChange = (index, field, value) => {
    setFormData((prev) => {
      const newReferences = [...prev.references];
      newReferences[index] = {
        ...newReferences[index],
        [field]: value,
      };
      return {
        ...prev,
        references: newReferences,
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {showPreview && (
        <ResumePreview
          formData={formData}
          photoPreview={photoPreview}
          setShowPreview={setShowPreview}
        />
      )}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-8 flex justify-between items-start border-b pb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="FULL NAME"
              className="text-3xl font-bold w-full mb-4"
              value={formData.personalInfo.fullName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    fullName: e.target.value,
                  },
                }))
              }
            />
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Address"
                className="w-full"
                value={formData.personalInfo.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      address: e.target.value,
                    },
                  }))
                }
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full"
                value={formData.personalInfo.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      phone: e.target.value,
                    },
                  }))
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full"
                value={formData.personalInfo.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      email: e.target.value,
                    },
                  }))
                }
              />
              <input
                type="url"
                placeholder="GitHub URL"
                className="w-full"
                value={formData.personalInfo.github}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      github: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
          <div className="w-32 h-40 border-2 border-dashed flex items-center justify-center relative overflow-hidden">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="photo-upload"
              onChange={handlePhotoUpload}
            />
            {photoPreview ? (
              <>
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover absolute inset-0"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer text-center text-white bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  Change Photo
                </label>
              </>
            ) : (
              <label
                htmlFor="photo-upload"
                className="cursor-pointer text-center text-gray-500"
              >
                Upload Photo
              </label>
            )}
          </div>
        </div>

        {/* Objectives Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">OBJECTIVES</h2>
          <textarea
            className="w-full p-2 border rounded min-h-[100px]"
            placeholder="Enter your career objective..."
            value={formData.objective}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                objective: e.target.value,
              }))
            }
          />
        </section>

        {/* Education Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">EDUCATION</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="School Name"
                  className="w-full p-2 border rounded"
                  value={edu.school}
                  onChange={(e) =>
                    handleEducationChange(index, "school", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-2 border rounded"
                  value={edu.location}
                  onChange={(e) =>
                    handleEducationChange(index, "location", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full p-2 border rounded"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Period"
                  className="w-full p-2 border rounded"
                  value={edu.period}
                  onChange={(e) =>
                    handleEducationChange(index, "period", e.target.value)
                  }
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveItem("education", index)}
                  className="mt-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => handleAddItem("education")}
            className="text-blue-500"
          >
            + Add Education
          </button>
        </section>

        {/* Work Experience Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">WORK EXPERIENCE</h2>
          {formData.workExperience.map((work, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company/Organization"
                  className="w-full p-2 border rounded"
                  value={work.company}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "company", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Period"
                  className="w-full p-2 border rounded"
                  value={work.period}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "period", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="w-full p-2 border rounded col-span-2"
                  value={work.title}
                  onChange={(e) =>
                    handleWorkExperienceChange(index, "title", e.target.value)
                  }
                />
              </div>
              <div className="mt-2">
                <h4 className="font-semibold">Responsibilities:</h4>
                {work.responsibilities.map((resp, rIndex) => (
                  <input
                    key={rIndex}
                    type="text"
                    placeholder="Add responsibility"
                    className="w-full p-2 border rounded mt-2"
                    value={resp}
                    onChange={(e) =>
                      handleResponsibilityChange(index, rIndex, e.target.value)
                    }
                  />
                ))}
                <button
                  className="mt-2 text-blue-500"
                  onClick={() => {
                    const newExp = [...formData.workExperience];
                    newExp[index].responsibilities.push("");
                    setFormData((prev) => ({
                      ...prev,
                      workExperience: newExp,
                    }));
                  }}
                >
                  + Add Responsibility
                </button>
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveItem("workExperience", index)}
                  className="mt-2 text-red-500"
                >
                  Remove Experience
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => handleAddItem("workExperience")}
            className="text-blue-500"
          >
            + Add Work Experience
          </button>
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">SKILLS</h2>

          {/* Technical Skills Group */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Technical Skills</h3>

            {/* Programming Languages */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Programming Languages</h4>
              {formData.technicalSkills.programmingLanguage.map(
                (skill, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add programming language"
                      className="w-full p-2 border rounded"
                      value={skill}
                      onChange={(e) =>
                        handleSkillChange(
                          "programmingLanguage",
                          index,
                          e.target.value
                        )
                      }
                    />
                    {index > 0 && (
                      <button
                        onClick={() =>
                          handleRemoveSkill("programmingLanguage", index)
                        }
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )
              )}
              <button
                onClick={() => handleAddSkill("programmingLanguage")}
                className="text-blue-500"
              >
                + Add Programming Language
              </button>
            </div>

            {/* Web Technologies */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Web Technologies</h4>
              {formData.technicalSkills.webTechnologies.map((tech, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add web technology"
                    className="w-full p-2 border rounded"
                    value={tech}
                    onChange={(e) =>
                      handleSkillChange(
                        "webTechnologies",
                        index,
                        e.target.value
                      )
                    }
                  />
                  {index > 0 && (
                    <button
                      onClick={() =>
                        handleRemoveSkill("webTechnologies", index)
                      }
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => handleAddSkill("webTechnologies")}
                className="text-blue-500"
              >
                + Add Web Technology
              </button>
            </div>

            {/* Developer Tools */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Developer Tools</h4>
              {formData.technicalSkills.developerTools.map((tool, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add developer tool"
                    className="w-full p-2 border rounded"
                    value={tool}
                    onChange={(e) =>
                      handleSkillChange("developerTools", index, e.target.value)
                    }
                  />
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveSkill("developerTools", index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => handleAddSkill("developerTools")}
                className="text-blue-500"
              >
                + Add Developer Tool
              </button>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Languages</h3>
            {formData.technicalSkills.languages.map((lang, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add language and proficiency (e.g., English - Native)"
                  className="w-full p-2 border rounded"
                  value={lang}
                  onChange={(e) =>
                    handleSkillChange("languages", index, e.target.value)
                  }
                />
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveSkill("languages", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddSkill("languages")}
              className="text-blue-500"
            >
              + Add Language
            </button>
          </div>

          {/* Soft Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Soft Skills</h3>
            {formData.technicalSkills.softSkills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add soft skill (e.g., Leadership, Communication)"
                  className="w-full p-2 border rounded"
                  value={skill}
                  onChange={(e) =>
                    handleSkillChange("softSkills", index, e.target.value)
                  }
                />
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveSkill("softSkills", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddSkill("softSkills")}
              className="text-blue-500"
            >
              + Add Soft Skill
            </button>
          </div>

          {/* Industry Knowledge */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Industry Knowledge</h3>
            {formData.technicalSkills.industryKnowledge.map(
              (knowledge, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add industry-specific knowledge"
                    className="w-full p-2 border rounded"
                    value={knowledge}
                    onChange={(e) =>
                      handleSkillChange(
                        "industryKnowledge",
                        index,
                        e.target.value
                      )
                    }
                  />
                  {index > 0 && (
                    <button
                      onClick={() =>
                        handleRemoveSkill("industryKnowledge", index)
                      }
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              )
            )}
            <button
              onClick={() => handleAddSkill("industryKnowledge")}
              className="text-blue-500"
            >
              + Add Industry Knowledge
            </button>
          </div>

          {/* Tools & Software */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Tools & Software</h3>
            {formData.technicalSkills.tools.map((tool, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add tool or software proficiency"
                  className="w-full p-2 border rounded"
                  value={tool}
                  onChange={(e) =>
                    handleSkillChange("tools", index, e.target.value)
                  }
                />
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveSkill("tools", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddSkill("tools")}
              className="text-blue-500"
            >
              + Add Tool/Software
            </button>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Certifications</h3>
            {formData.technicalSkills.certifications.map((cert, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add certification"
                  className="w-full p-2 border rounded"
                  value={cert}
                  onChange={(e) =>
                    handleSkillChange("certifications", index, e.target.value)
                  }
                />
                {index > 0 && (
                  <button
                    onClick={() => handleRemoveSkill("certifications", index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => handleAddSkill("certifications")}
              className="text-blue-500"
            >
              + Add Certification
            </button>
          </div>
        </section>

        {/* References Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-3">REFERENCES</h2>
          {formData.references.map((ref, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  value={ref.name}
                  onChange={(e) =>
                    handleReferenceChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                  value={ref.title}
                  onChange={(e) =>
                    handleReferenceChange(index, "title", e.target.value)
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={ref.email}
                  onChange={(e) =>
                    handleReferenceChange(index, "email", e.target.value)
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                  value={ref.phone}
                  onChange={(e) =>
                    handleReferenceChange(index, "phone", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Institution"
                  className="w-full p-2 border rounded"
                  value={ref.institution}
                  onChange={(e) =>
                    handleReferenceChange(index, "institution", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                  value={ref.address}
                  onChange={(e) =>
                    handleReferenceChange(index, "address", e.target.value)
                  }
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveItem("references", index)}
                  className="mt-2 text-red-500"
                >
                  Remove Reference
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => handleAddItem("references")}
            className="text-blue-500"
          >
            + Add Reference
          </button>
        </section>

        {/* Preview & Export Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowPreview(true)}
          >
            Preview Resume
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={() => console.log("Export")}
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
